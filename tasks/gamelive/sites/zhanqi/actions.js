var request = require('request');

var getLiveRooms = function(cate){
    var size = 100;
    var page = 1;
    var url = 'http://www.zhanqi.tv/api/static/game.lives/' + cate + '/' + size + '-' + page + '.json';
    var options = {
        url: url,
        method: 'GET',
        timeout: 100000
    };
    return new Promise(function(resolve, reject){
        request(options, function (err, response, body) {
            if (err) {
                return reject(err);
            }

            try {
                var res = JSON.parse(body);
                var data = res.data.rooms;
                if (data) {
                    return resolve(data);
                }
                return reject(new Error("Invalid Json"));
            }
            catch (e){
                return reject(new Error("Invalid Json"));
            }
        });
    });
};

module.exports = {
    getLiveRooms: getLiveRooms
};