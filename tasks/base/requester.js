var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Requester(collector){
    this.collector = collector;
    EventEmitter.call(this);
}
util.inherits(Requester, EventEmitter);

Requester.prototype.fire = function(){
    var self = this;
    this.id = setInterval(function(){
        self.collector.emit('item');
    }, 1000);
};

module.exports = Requester;

