var async = require('async');
var Models = require('../models');
var sitesData = require('../../config/data.json').sites;
var mongoose = require('mongoose');
var db = mongoose.connection;
require('../lib/database');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    initSites();
});

function initSites(){
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
            console.log('init sites data completed');
            process.exit(0);
        });
}