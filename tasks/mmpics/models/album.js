'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 图片专辑集合
 */
var AlbumSchema = new Schema({
    site: {type: String},      // 所属网站url
    name: {type: String},      // 专辑名称
    tag: {type: String},       // 专辑标签
    id:  {type: String},       // 网站专辑id
    picNum: {type: Number},    // 专辑图片数量
    pics: [{type: String}],    // 专辑图片url列表
    cover: {type: String},     // 专辑封面图
    url: {type: String},       // 源网站专辑url
    created_at: {type: Date}   // 创建时间
}, {autoIndex: false});

mongoose.model('Album', AlbumSchema);
