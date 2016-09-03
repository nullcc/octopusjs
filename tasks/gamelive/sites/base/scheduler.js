var async = require('async');
var Meta = require('../../config/meta').meta;
var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports = Scheduler;

function Scheduler(siteName, requester, collector, pipeline, cb){
    EventEmitter.call(this);
    this.siteName = siteName;
    this.requester = requester;
    this.collector = collector;
    this.pipeline = pipeline;
    this.cb = cb;
    this.siteData = Meta.getSite(siteName);

    this.requester.scheduler = this;
    this.collector.scheduler = this;
    this.pipeline.scheduler = this;

    this.on('processed', this.onProcessed);
    this.on('saved', this.onSaved);
}
util.inherits(Scheduler, EventEmitter);

Scheduler.prototype.start = function() {
    var games = this.siteData.games;
    this.getRooms(games);
};

Scheduler.prototype.getRooms = function(games){
    var self = this;
    var getRoomsByGameFuncs = games.map(function (game) {
        return function (callback) {
            self.getRoomsByGame(game, function (err, count) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, count);
                }
            });
        }
    });
    async.parallel(
        getRoomsByGameFuncs,
        function (err, results) {
            var rooms = [];
            results.forEach(function (result) {
                rooms = rooms.concat(result);
            });
            self.collector.emit('rooms', rooms);
        });
};

Scheduler.prototype.getRoomsByGame = function(game, cb){
    var gameId = '';
    if (this.siteData.ename === 'panda' || this.siteData.ename === 'quanmin'){
        gameId = game.ename;
    }
    else {
        gameId = game.gameId;
    }
    this.requester.getLiveRooms(gameId)
        .then(function(res){
            cb(null, res);
        })
};

Scheduler.prototype.onProcessed = function(rooms) {
    this.pipeline.emit('save', rooms);
};

Scheduler.prototype.onSaved = function(total) {
    console.log(this.siteName + ' saved '+ total + ' items');
    this.cb(total);
};