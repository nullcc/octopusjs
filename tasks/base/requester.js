var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Requester(){
    EventEmitter.call(this);
}
util.inherits(Requester, EventEmitter);

module.exports = Requester;

