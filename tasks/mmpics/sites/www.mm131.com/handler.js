var htmlparser = require("htmlparser");
var _ = require('underscore');
var Data = require('./data.json');
var Meta = require('../../config/meta').meta;

function parseTagInfo(tagName, data){
    var tagInfo = {};
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
        if (error){
            return {};
        }
        else{
            var content = dom[2].children[3].children[7].children[1].children;
            var pages = content[content.length-2].children;
            var lastPageHref = _.last(pages).attribs.href;
            var regex = /list_(.+?)_(.+?)\.html/;
            var info = regex.exec(lastPageHref);
            var cate = info[1];
            var page = info[2];
            tagInfo = {
                name: tagName,
                cate: cate,
                page: page
            };
            return tagInfo;
        }
    });

    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(data);
    return tagInfo;
}

function parseAlbumInfo(tagName, data){
    var albums = [];
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
        if (error){
            return [];
        }
        else{
            var picDoms = dom[2].children[3].children[7].children[1].children;
            picDoms.forEach(function(picDom, index){
                if (picDom.raw === 'dd'){
                    var name = dom[2].children[3].children[7].children[1].children[index].children[0].children[0].attribs.alt;
                    var url = dom[2].children[3].children[7].children[1].children[index].children[0].attribs.href;
                    var regex = /(\d+?)\.html/;
                    var info = regex.exec(url);
                    var albumId = null;
                    if (info){
                        albumId = info[1];
                    }
                    albums.push({
                        site: Data.site,
                        name: name,
                        tag: Meta.getCTagByTag(tagName, Data.tags),
                        id: albumId,
                        picNum: 0,
                        pics: [],
                        cover: null,
                        url: url
                    });
                }
            });

            return albums;
        }
    });

    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(data);
    return albums;
}

function parseAlbumPicsNum(data){
    var regex = /共(\d+?)页/;
    var info = regex.exec(data);
    if (info){
        return parseInt(info[1]);
    }
    return null;
}

module.exports = {
    parseTagInfo: parseTagInfo,
    parseAlbumInfo: parseAlbumInfo,
    parseAlbumPicsNum: parseAlbumPicsNum
};