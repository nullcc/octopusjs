var BaseRequester = require('../../../base/requester');
var util = require('util');
var request = require('request');

function Requester(){
    BaseRequester.call(this);
}
util.inherits(Requester, BaseRequester);

Requester.prototype.getLiveRooms = function(cate){
    var actions = require('../'+this.scheduler.siteName+'/actions');
    return new Promise(function(resolve, reject){
        actions.getLiveRooms(cate)
            .then(function(rooms){
                resolve(rooms);
            })
    });
};

module.exports = Requester;