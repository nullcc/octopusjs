var util = require('util');
var Requester = require('./requester');
var Collector = require('./collector');

var collector = new Collector();
var requester = new Requester(collector);

collector.on('item', function(data){
    util.log('get item');
});


