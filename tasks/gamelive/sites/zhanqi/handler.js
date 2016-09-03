/**
 * 战旗平台数据解析
 */

var Meta = require('../../config/meta').meta;

function dataHandler(room){
    return {
        iSiteId: Meta.getSite('zhanqi').iSiteId,
        roomId: room.id,
        gameId: room.gameId,
        iGameId: Meta.getGameByGameId('zhanqi', room.gameId).iGameId,
        gameName: room.gameName,
        gameEName: Meta.getGameENameByIGameId(Meta.getGameByGameId('zhanqi', room.gameId).iGameId),
        title: room.title,
        pic: room.spic,
        online: parseInt(room.online) || 0,
        url: 'http://m.zhanqi.tv/' + room.code,
        user: {
            uid: room.uid,
            nickname: room.nickname,
            gender: room.gender,
            avatar: room.avatar+'-medium'
        },
        updated_at: new Date()
    };
}

module.exports = {
    dataHandler: dataHandler
};