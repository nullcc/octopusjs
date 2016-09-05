var async = require('async');
var Models = require('../models');
var gamesData = require('../config/data.json').games;
var sitesData = require('../config/data.json').sites;
var dbConf = require('../config/config.json').db;
var dbInit = require('../../../db/db').init;

dbInit(dbConf, function(){
    async.parallel(
        [initSites, initGames],
        function(err, results) {
            if (err){
                console.log(err);
                process.exit(1);
            }
            console.log('done.');
            process.exit(0);
        });
});

function initGames(cb){
    var games = [];
    for (var key in gamesData){
        var game = gamesData[key];
        var obj = {
            name: game.name,
            ename: game.ename,
            iGameId: game.iGameId
        };
        games.push(obj);
    }
    var funcs = games.map(function(site){
        return function(callback){
            var condition = {iGameId: site.iGameId};
            Models.Game.update(condition, site, {upsert:true})
                .exec(function(err){
                    if (err){
                        return callback(err);
                    }
                    return callback(null);
                })
        }
    });
    async.parallel(
        funcs,
        function(err, results) {
            if (err){
                return cb(err);
            }
            console.log('Gamelive init games data completed.');
            return cb(null);
        });
}

function initSites(cb){
    var sites = [];
    for (var key in sitesData){
        var site = sitesData[key];
        var obj = {
            name: site.name,
            ename: site.ename,
            url: site.url,
            iSiteId: site.iSiteId,
            polyfill: site.polyfill
        };
        sites.push(obj);
    }
    var funcs = sites.map(function(site){
        return function(callback){
            var condition = {iSiteId: site.iSiteId};
            Models.Site.update(condition, site, {upsert:true})
                .exec(function(err){
                    if (err){
                        return callback(err);
                    }
                    return callback(null);
                })
        }
    });
    async.parallel(
        funcs,
        function(err, results) {
            if (err){
                return cb(err);
            }
            console.log('Gamelive init sites data completed.');
            return cb(null);
        });
}