var BaseCollector = require('../../../base/collector');
var util = require('util');
var Handler = require('./handler');

function Collector(){
    BaseCollector.call(this);
    this.on('tags', this.onTags);
    this.on('albums', this.onAlbums);
    //this.on('album', this.onAlbum);
}
util.inherits(Collector, BaseCollector);

Collector.prototype.onTags = function(tagData, tags){
    var tagObjs = tags.map(function(tag, index){
        return Handler.parseTagInfo(tagData[index].name, tag);
    });
    this.scheduler.emit('tagsProcessed', tagObjs);
};

Collector.prototype.onAlbums = function(tags, albums){
    //var albumObjs = [];
    //albums.forEach(function(album, index){
    //    return Handler.parseAlbumInfo(tags[index].name, album);
    //});
    this.scheduler.emit('albumsProcessed', albums);
};

module.exports = Collector;