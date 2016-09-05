var async = require('async');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var Data = require('./data.json');
var Models = require('../../models');

module.exports = Scheduler;

function Scheduler(requester, collector, pipeline, cb){
    EventEmitter.call(this);
    this.requester = requester;
    this.collector = collector;
    this.pipeline = pipeline;
    this.cb = cb;

    this.requester.scheduler = this;
    this.collector.scheduler = this;
    this.pipeline.scheduler = this;

    this.on('tagsProcessed', this.onTagsProcessed);
    this.on('albumsProcessed', this.onAlbumsProcessed);
    this.on('savedAlbums', this.onSavedAlbums);
}
util.inherits(Scheduler, EventEmitter);

Scheduler.prototype.start = function() {
    var tagData = Data.tags;
    this.getTagInfo(tagData);
};

Scheduler.prototype.getTagInfo = function(tagData){
    var self = this;
    var funcs = tagData.map(function(tag){
        return function(callback) {
            self.requester.getTagInfo(tag.name)
                .then(function (data) {
                    callback(null, data);
                }, function (err) {
                    callback(err);
                })
        }
    });
    async.parallel(
        funcs,
        function(err, results) {
            var tags = [];
            results.forEach(function (result) {
                tags = tags.concat(result);
            });
            self.collector.emit('tags', tagData, tags);
        });
};

Scheduler.prototype.getAlbums = function(tags){
    var self = this;
    var funcs = tags.map(function(tag){
        return function(callback){
            self.requester.getAlbums(tag)
                .then(function(data){
                    callback(null, data);
                }, function(err){
                    callback(err);
                })
        }
    });
    async.parallel(
        funcs,
        function(err, results) {
            var albums = [];
            results.forEach(function(result){
                albums = albums.concat(result);
            });
            self.collector.emit('albums', tags, albums);
        });
};

Scheduler.prototype.onTagsProcessed = function(tags) {
    this.getAlbums(tags);
};

Scheduler.prototype.onAlbumsProcessed = function(albums) {
    this.pipeline.emit('saveAlbums', albums);
};

Scheduler.prototype.onSavedAlbums = function(total) {
    console.log('saved ' + total + ' albums');
    this.getAlbumPics();
};

Scheduler.prototype.getAlbumPics = function(){
    var MAX_ALBUMS = 100;
    var albums = [];
    var con = {site: Data.site, picNum: 0};
    var stream = Models.Album.find(con).stream();
    var self = this;

    stream.on('data', function (doc) {
        albums.push(doc);
        if (albums.length === MAX_ALBUMS){
            stream.pause();
            self.handle(albums, function(_albums){
                updateAlbum(_albums, function(){
                    albums = [];
                    stream.resume();
                });
            });
        }
    }).on('error', function (err) {
        console.error(err);
        return self.cb(err);
    }).on('close', function () {
        self.handle(albums, function(_albums){
            updateAlbum(_albums, function(){
                albums = [];
                stream.resume();
                return self.cb();
            });
        });
    });
};

Scheduler.prototype.handle =  function(albums, cb){
    this.getAlbumsPicsNum(albums)
        .then(function(albumsPicsNum){
            var _albums = [];
            albums.forEach(function(album, index){
                var newAlbum = {
                    site: album.site,
                    name: album.name,
                    tag: album.tag,
                    id: album.id,
                    picNum: albumsPicsNum[index] || 0,
                    url: album.url
                };
                newAlbum.pics = genPicUrls(newAlbum);
                newAlbum.cover = newAlbum.pics[0];
                _albums.push(newAlbum);
            });
            cb(_albums);
        });
};

Scheduler.prototype.getAlbumsPicsNum = function(albums){
    var self = this;
    var funcs = albums.map(function(album){
        return function(callback){
            self.requester.getAlbumPicsNum(album)
                .then(function(data){
                    callback(null, data);
                },function(err){
                    callback(err);
                })
        }
    });
    return new Promise(function(resolve, reject){
        async.parallel(
            funcs,
            function(err, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results)
                }
            });
    });
};

function updateAlbum(albums, cb){
    var funcs = albums.map(function(album){
        return function(callback){
            var con = {site: album.site, id: album.id}; // 更新条件为site+i
            Models.Album.update(con, album, {upsert:true})
                .exec(function(err){
                    if (err){
                        callback(err);
                    }
                    else {
                        callback(null);
                    }
                })
        }
    });

    async.parallel(
        funcs,
        function(err, results) {
            if (err) {
                cb(err);
            } else {
                cb(null);
            }
        });
}

function genPicUrls(album){
    var picUrls = [];
    for (var i = 1; i <= album.picNum; i++){
        var picUrl = Data.imgBasePath + '/' + album.id + '/' + i + '.jpg';
        picUrls.push(picUrl);
    }
    return picUrls;
}