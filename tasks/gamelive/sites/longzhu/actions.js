var request = require('request');

var getLiveRooms = function(gameId){
    var pageno = 1;
    var size = 100;
    var url = "http://api.plu.cn/tga/streams?max-results=" + size + "&start-index=0&sort-by=top&filter=0&game=" + gameId;
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
                var data = res.data.items;
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