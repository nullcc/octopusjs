'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteSchema = new Schema({
    iSiteId: {type: String}, // 网站id
    name: {type: String},    // 网站名称
    ename: {type: String},   // 网站拼音
    url: {type: String},     // 网站首页
    polyfill: {type: String} // 网站直播间手机版页面js调整代码
}, {autoIndex: false});

mongoose.model('Site', SiteSchema);
