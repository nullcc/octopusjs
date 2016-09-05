var async = require('async');
var dbConf = require('./config/config.json').db;
var dbInit = require('../../db/db').init;
var SitesData = require('./sites.json');

dbInit(dbConf, function(){
    getData();
});

function getData(){
    var sites = [];

    for (var siteName in SitesData) {
        if (SitesData[siteName].enable) {
            sites.push(siteName);
        }
    }

    var funcs = sites.map(function(site){
        return function(callback){
            require('./sites/' + site + '/index').run(function(err, total){
                if (err){
                    return callback(err);
                }
                return callback(null, total);
            });
        }
    });
    async.parallel(
        funcs,
        function(err, results) {
            if (err){
                console.log(err);
            }
            else {
                var total = 0;
                results.forEach(function(result){
                    if (result){
                        total += result;
                    }
                });

                console.log('all done.');
            }
            process.exit(0);
        });
}