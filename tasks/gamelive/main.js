var async = require('async');
var dbConf = require('./config/config.json').db;
var dbInit = require('../../db/db').init;

dbInit(dbConf, function(){
    getData();
});

function getData(){
    var siteNames = ['douyu', 'longzhu', 'panda', 'zhanqi', 'huya', 'quanmin'];
    var funcs = siteNames.map(function(siteName){
        return function(callback){
            require('./sites/base/index').run(siteName, function(total){
                callback(null, total);
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
                console.log('all done. [total: ' + total + ']');
            }
            process.exit(0);
        });
}