/**
 * 全民直播平台数据解析
 */

var Meta = require('../../config/meta').meta;

function dataHandler(room){
    return {
        iSiteId: Meta.getSite('quanmin').iSiteId,
        roomId: room.uid,  // 没有roomId,用uid替代
        gameId: room.category_id,
        iGameId: Meta.getGameByEName('quanmin', room.category_slug).iGameId,
        gameName: room.category_name,
        gameEName: room.category_slug,
        title: room.title,
        pic: room.thumb,
        online: parseInt(room.view) || 0,
        url: Meta.getSite('quanmin').url.replace('www.quanmin.tv', 'm.quanmin.tv') + '/v/' + room.uid,
        user: {
            uid: room.uid,
            nickname: room.nick,
            gender: 0,
            avatar: room.avatar
        },
        updated_at: new Date()
    };
}

module.exports = {
    dataHandler: dataHandler
};