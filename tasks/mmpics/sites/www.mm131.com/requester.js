var BaseRequester = require('../../../base/requester');
var util = require('util');
var actions = require('./actions');

function Requester(){
    BaseRequester.call(this);
}
util.inherits(Requester, BaseRequester);

Requester.prototype.getTagInfo = function(tag){
    return new Promise(function(resolve, reject){
        actions.getTagInfo(tag)
            .then(function(data){
                return resolve(data);
            })
    });
};

Requester.prototype.getAlbums = function(tag){
    return new Promise(function(resolve, reject){
        actions.getAlbums(tag)
            .then(function(data){
                return resolve(data);
            })
    });
};

Requester.prototype.getAlbumPicsNum = function(tag){
    return new Promise(function(resolve, reject){
        actions.getAlbumPicsNum(tag)
            .then(function(data){
                return resolve(data);
            })
    });
};

module.exports = Requester;