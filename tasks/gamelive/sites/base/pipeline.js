var async = require('async');
var BasePipeline = require('../../../base/pipeline');
var util = require('util');
var Models = require('../../models');

function Pipeline(){
    BasePipeline.call(this);
    this.on('save', this.onSave);
}
util.inherits(Pipeline, BasePipeline);

Pipeline.prototype.onSave = function(rooms){
    var self = this;
    this.save(rooms, function(err, total){
        self.scheduler.emit('saved', total);
    });
};

Pipeline.prototype.save = function(rooms, cb){
    var saveRoomFuncs = rooms.map(function(room){
        return function(callback){
            var con = {iSiteId: room.iSiteId, roomId: room.roomId};
            saveRoom(con, room, function(err){
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
        saveRoomFuncs,
        function(err, results) {
            if (err){
                return cb(err);
            }
            return cb(null, rooms.length);
        })

};

function saveRoom(con, room, callback){
    Models.LiveRoom.update(con, room, {upsert:true})
        .exec(function(err){
            if (err){
                return callback(err);
            }
            return callback(null);
        })
}

module.exports = Pipeline;