'use strict';

import mongoose from 'mongoose';
import {db as dbConf} from './config/config.json';
import {init as dbInit} from './db/db.js';

var db = mongoose.connection;
dbInit(dbConf);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongodb connect ok');

});

