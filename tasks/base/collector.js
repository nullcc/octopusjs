var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Collector(){
    EventEmitter.call(this);
}
util.inherits(Collector, EventEmitter);

module.exports = Collector;