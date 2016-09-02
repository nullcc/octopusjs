'use strict';

import mongoose from 'mongoose';

var init = function(dbConf, cb){
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongodb connection error:'));
    db.once('open', function() {
        console.log('Mongodb connection initialized');
        cb();
    });

    var connectString = 'mongodb://';
    for (var i = 0; i < dbConf.instance.length; i++) {
        connectString += dbConf.instance[i].host + ':' + dbConf.instance[i].port;
        if (i < dbConf.instance.length - 1) {
            connectString += ',';
        }
    }
    var option = {
        replset: {
            rs_name: dbConf.replset,
            readPreference: 'secondary'
        },
        server: {
            poolSize: 2
        }
    };

    var dbUrl = connectString + '/' + dbConf.name;
    mongoose.connect(dbUrl, option, null);
};

module.exports = {
    init: init
};