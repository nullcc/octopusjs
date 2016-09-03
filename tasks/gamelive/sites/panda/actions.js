var request = require('request');

var getLiveRooms = function(ename){
    var pageno = 1;
    var size = 100;
    var url = "http://api.m.panda.tv/ajax_get_live_list_by_cate?cate="+ ename + "&pageno=" + pageno + "&pagenum=" + size;
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