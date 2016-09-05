/**
 * 基础流程框架(实验版本)
 */

var co = require('co');
var Promise = require('bluebird');

module.exports = {
    run: run
};

function makeIterator(array) {
    var nextIndex = 0;
    return {
        next: function () {
            return nextIndex < array.length ?
            {value: array[nextIndex++], done: false} :
            {done: true};
        }
    }
}

function run(funcs, cb){
    var funcIter = makeIterator(funcs);
    co(function *(){
        var res = null;
        while(true){
            var value = funcIter.next();
            if (value.done){
                break;
            }
            var func = value.value;
            res = yield func(res);
        }
        if (cb){
            cb();
        }
    });
}

var funcs = [sayHello, sayWorld];

run(funcs);

function sayHello(){
    return new Promise(function(resolve, reject){
        resolve("hello ");
    });
}

function sayWorld(){
    return new Promise(function(resolve, reject){
        resolve("world");
    });
}