/**
 * 斗鱼平台数据解析
 */

var Meta = require('../../config/meta').meta;

function dataHandler(room){
    return {
        iSiteId: Meta.getSite('douyu').iSiteId,
        roomId: room.room_id,
        gameId: room.cate_id,
        iGameId: Meta.getGameByGameId('douyu', room.cate_id).iGameId,
        gameName: room.game_name,
        gameEName: Meta.getGameENameByIGameId(Meta.getGameByGameId('douyu', room.cate_id).iGameId),
        title: room.room_name,
        pic: room.room_src,
        online: parseInt(room.online) || 0,
        url: room.url.replace('http://www.douyu.com', 'https://m.douyu.com'),
        user: {
            uid: room.owner_uid,
            nickname: room.nickname,
            gender: 0,
            avatar: room.avatar
        },
        updated_at: new Date()
    };
}

module.exports = {
    dataHandler: dataHandler
};