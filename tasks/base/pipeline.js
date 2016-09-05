/**
 * pipeline基础对象
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Pipeline(){
    EventEmitter.call(this);
}
util.inherits(Pipeline, EventEmitter);

module.exports = Pipeline;

