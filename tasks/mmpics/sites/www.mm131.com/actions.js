var async = require('async');
var charset = require('superagent-charset');
var request = require('superagent');
charset(request);
var Handler = require('./handler');
var Promise = require('bluebird');

var getTagInfo = function(tag){
    var url = 'http://www.mm131.com/' + tag;
    return new Promise(function(resolve, reject){
        request
            .get(url)
            .charset('gb2312')
            .end(function(err, res){
                if (err) {
                    return reject(err);
                }
                return resolve(res.text);
            });
    });
};

var getAlbums = function(tag){
    var url = 'http://www.mm131.com/' + tag.name;
    var urls = [url];
    for (var i = 2; i <= tag.page; i++){
        var pageUrl = ['http://www.mm131.com/', tag.name, '/list_', tag.cate, '_', i, '.html'].join('');
        urls.push(pageUrl);
    }

    var funcs = urls.map(function(url){
        return function(callback){
            request
                .get(url)
                .charset('gb2312')
                .end(function(err, res){
                    if (err) {
                        return callback(err);
                    }
                    var albums = Handler.parseAlbumInfo(tag.name, res.text);
                    return callback(null, albums);
                });
        }
    });

    return new Promise(function(resolve, reject){
        async.parallel(
            funcs,
            function(err, results) {
                if (err) {
                    return reject(err);
                } else {
                    var albums = [];
                    results.forEach(function(result){
                        albums = albums.concat(result);
                    });
                    return resolve(albums);
                }
            });
    });
};

var getAlbumPicsNum = function(album){
    var url = album.url;
    return new Promise(function(resolve, reject){
        request
            .get(url)
            .charset('gb2312')
            .end(function(err, res){
                if (err) {
                    return reject(err);
                }
                var albumPicsNum = Handler.parseAlbumPicsNum(res.text);
                return resolve(albumPicsNum);
            });
    });
};

var getAlbumPics = function(tag, cb){
    var url = 'http://www.mm131.com/' + tag.name;
    var urls = [url];
    for (var i = 2; i <= tag.page; i++){
        var pageUrl = ['http://www.mm131.com/', tag.name, '/list_', tag.cate, '_', i, '.html'].join('');
        urls.push(pageUrl);
    }

    var funcs = urls.map(function(url){
        return function(callback){
            request
                .get(url)
                .charset('gb2312')
                .end(function(err, res){
                    if (err) {
                        return callback(err);
                    }
                    var albums = Handler.parseAlbumInfo(tag.name, res.text);
                    return callback(null, albums);
                });
        }
    });
    return new Promise(function(resolve, reject){
        async.parallel(
            funcs,
            function(err, results) {
                if (err) {
                    return reject(err);
                } else {
                    var albums = [];
                    results.forEach(function(result){
                        albums = albums.concat(result);
                    });
                    return resolve(albums);
                }
            });
    });
};

module.exports = {
    getTagInfo: getTagInfo,
    getAlbums: getAlbums,
    getAlbumPicsNum: getAlbumPicsNum,
    getAlbumPics: getAlbumPics
};