/**
 * 龙珠平台数据解析
 */

var Meta = require('../../config/meta').meta;

function dataHandler(room){
    return {
        iSiteId: Meta.getSite('longzhu').iSiteId,
        roomId: room.channel.id,
        gameId: room.game[0].id,
        iGameId: Meta.getGameByGameId('longzhu', room.game[0].id).iGameId,
        gameName: room.game[0].name,
        gameEName: Meta.getGameENameByIGameId(Meta.getGameByGameId('longzhu', room.game[0].id).iGameId),
        title: room.channel.status,
        pic: room.preview,
        online: parseInt(room.viewers) || 0,
        url: room.channel.url,
        user: {
            uid: room.channel.domain,
            nickname: room.channel.name,
            gender: null,
            avatar: room.channel.avatar
        },
        updated_at: new Date()
    };
}

module.exports = {
    dataHandler: dataHandler
};