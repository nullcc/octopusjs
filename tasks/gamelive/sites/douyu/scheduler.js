var async = require('async');
var Meta = require('../../config/meta').meta;

module.exports = scheduler;

var _siteName;
var _dataHandler;
var _requester;
var _collector;
var _pipeline;
var _siteData;


function scheduler(siteName, dataHandler, requester, collector, pipeline){
    _siteName = siteName;
    _dataHandler = dataHandler;
    _requester = requester;
    _collector = collector;
    _pipeline = pipeline;
    _siteData = Meta.getSite(_siteName);

    var rooms = [];
    var total = 0;
    var games = _siteData.games;

    var getRoomsByGameFuncs = games.map(function(game){
        return function(callback){
            getRoomsByGame(game, function(err, count){
                if (err){
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
        function(err, results) {
            collector.emit('rooms', results);
        });
}

function getRoomsByGame(game, cb){
    var gameId = '';
    if (_siteName === 'panda' || _siteName === 'quanmin'){
        gameId = game.ename;
    }
    else {
        gameId = game.gameId;
    }
    _requester.getLiveRooms(gameId)
        .then(function(res){
            cb(null, res);
        })
}