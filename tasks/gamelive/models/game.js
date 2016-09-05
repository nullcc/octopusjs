'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    name: {type: String},    // 游戏中文名
    ename: {type: String},   // 游戏英文名
    iGameId: {type: String}  // 本平台游戏Id
}, {autoIndex: false});

mongoose.model('Game', GameSchema);
