'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 所有直播间集合
 */
var LiveRoomSchema = new Schema({
    iSiteId: {type: String},      // 自定义的网站id
    roomId: {type: String},       // 直播间Id
    gameId: {type: String},       // 游戏Id(不同平台不同)
    iGameId: {type: String},      // 我们自己的游戏Id(只要是同一个游戏都相同)
    gameName: {type: String},     // 游戏名称
    gameEName: {type: String},    // 游戏ename
    title: {type: String},        // 直播间标题
    pic: {type: String},          // 直播间封面图
    online: {type: Number},       // 在线人数
    url: {type: String},          // 直播间url
    user: {                       // 主播信息
        uid: {type: String},        // 主播uid
        nickname: {type: String},   // 主播昵称
        gender: {type: Number},     // 主播性别
        avatar: {type: String}      // 主播头像
    },
    updated_at: {type: Date, default: Date.now}  // 更新时间
}, {autoIndex: false});

mongoose.model('LiveRoom', LiveRoomSchema);