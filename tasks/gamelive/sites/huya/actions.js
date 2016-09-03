var request = require('request');

var getLiveRooms = function(gameId){
    var pageno = 1;
    var size = 100;
    var url = "http://www.huya.com/index.php?m=Game&do=ajaxGameLiveByPage&gid=" + gameId + "&page=" + pageno;
    var options = {
        url: url,
        method: 'GET',
        timeout: 8000
    };
    return new Promise(function(resolve, reject){
        request(options, function (err, response, body) {
            if (err) {
                return reject(err);
            }

            try {
                var res = JSON.parse(body);
                var data = res.data.list;
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