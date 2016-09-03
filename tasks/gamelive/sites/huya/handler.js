/**
 * 虎牙平台数据解析
 */

var Meta = require('../../config/meta').meta;

function dataHandler(room){
    return {
        iSiteId: Meta.getSite('huya').iSiteId,
        roomId: room.privateHost,
        gameId: room.gid,
        iGameId: Meta.getGameByGameId('huya', room.gid).iGameId,
        gameName: room.gameFullName,
        gameEName: Meta.getGameENameByIGameId(Meta.getGameByGameId('huya', room.gid).iGameId),
        title: room.roomName,
        pic: room.screenshot,
        online: parseInt(room.totalCount) || 0,
        url: Meta.getSite('huya').url + '/' + room.privateHost,
        user: {
            uid: room.privateHost,
            nickname: room.nick,
            gender: 0,
            avatar: room.avatar180
        },
        updated_at: new Date()
    };
}

module.exports = {
    dataHandler: dataHandler
};