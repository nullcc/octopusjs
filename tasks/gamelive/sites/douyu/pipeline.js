var BasePipeline = require('../../../base/pipeline');
var util = require('util');

function Pipeline(){
    BasePipeline.call(this);
    this.on('save', this.onSave);
}
util.inherits(Pipeline, BasePipeline);

Pipeline.prototype.onSave = function(rooms){
    util.log('pipeline on rooms');
    util.log('on save');
};

module.exports = Pipeline;