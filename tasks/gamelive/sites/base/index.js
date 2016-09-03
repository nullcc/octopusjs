var Requester = require('./requester');
var Collector = require('./collector');
var Pipeline = require('./pipeline');
var Scheduler = require('./scheduler');

function run(siteName, cb){
    var requester = new Requester();
    var collector = new Collector();
    var pipeline = new Pipeline();
    var scheduler = new Scheduler(siteName, requester, collector, pipeline, cb);
    scheduler.start();
}

module.exports = {
    run: run
};
