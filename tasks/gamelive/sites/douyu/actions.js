var request = require('request');

var getLiveRooms = function(cate){
    var url = 'http://open.douyucdn.cn/api/RoomApi/live/' + cate + '?offset=0&limit=100';
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
                var data = res.data;
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