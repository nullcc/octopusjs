'use strict';

import mongoose from 'mongoose';
import {db as dbConf} from './config/config.json';
import {init as dbInit} from './db/db.js';

dbInit(dbConf, function(){
    console.log('start!');
});