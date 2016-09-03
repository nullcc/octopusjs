var BaseCollector = require('../../../base/collector');
var util = require('util');

function Collector(){
    BaseCollector.call(this);
    this.on('rooms', this.onRooms);
}
util.inherits(Collector, BaseCollector);

Collector.prototype.onRooms = function(rooms){
    var dataHandler = require('../'+this.scheduler.siteName+'/handler').dataHandler;
    var roomObjs = rooms.map(function(room){
        return dataHandler(room);
    });

    this.scheduler.emit('processed', roomObjs);
};

module.exports = Collector;

