var BaseCollector = require('../../../base/collector');
var util = require('util');

function Collector(){
    BaseCollector.call(this);
}
util.inherits(Collector, BaseCollector);

Collector.prototype.onAlbums = function(albums){
    //var dataHandler = require('../'+this.scheduler.siteName+'/handler').dataHandler;
    //var roomObjs = rooms.map(function(room){
    //    return dataHandler(room);
    //});

    //this.scheduler.emit('albumsProcessed', roomObjs);
};

module.exports = Collector;

