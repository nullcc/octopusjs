var BaseCollector = require('../../../base/collector');
var util = require('util');

function Collector(){
    BaseCollector.call(this);
    this.on('rooms', this.onRooms);
}
util.inherits(Collector, BaseCollector);

Collector.prototype.onRooms = function(rooms){
    util.log('collector on rooms');
    util.log(rooms.length);
};

module.exports = Collector;