var async = require('async');
var BasePipeline = require('../../../base/pipeline');
var util = require('util');
var Models = require('../../models');

function Pipeline(){
    BasePipeline.call(this);
    this.on('save', this.onSave);
}
util.inherits(Pipeline, BasePipeline);

Pipeline.prototype.onSave = function(albums){
    var self = this;
    this.save(albums, function(err, total){
        self.scheduler.emit('savedAlbums', total);
    });
};

Pipeline.prototype.save = function(albums, cb){
    var funcs = albums.map(function(album){
        return function(callback){
            var con = {site: album.site, id: album.id}; // 更新条件为site+id
            album.created_at = new Date();
            saveAlbum(con, album, function(err){
                if (err){
                    callback(err);
                }
                else {
                    callback(null);
                }
            });
        }
    });
    async.parallel(
        funcs,
        function(err, results) {
            if (err) {
                return cb(err);
            } else {
               return cb(null, albums.length);
            }
        });

};

function saveAlbum(con, album, callback){
    Models.Album.update(con, album, {upsert:true})
        .exec(function(err){
            if (err){
                callback(err);
            }
            else {
                callback(null)
            }
        })
}

module.exports = Pipeline;