var Requester = require('./requester');
var Collector = require('./collector');
var Pipeline = require('./pipeline');
var scheduler = require('./scheduler');
var SiteData = require('../../config/data.json').sites['douyu'];

var requester = new Requester();
var collector = new Collector();
var pipeline = new Pipeline();

scheduler(SiteData.ename, null, requester, collector, pipeline);