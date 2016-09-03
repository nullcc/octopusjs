/**
 * 熊猫平台数据解析
 */

var Meta = require('../../config/meta').meta;

function dataHandler(room){
    return {
        iSiteId: Meta.getSite('panda').iSiteId,
        roomId: room.id,
        gameId: room.cate_id,
        iGameId: Meta.getGameByEName('panda', room.classification.ename).iGameId,
        gameName: room.classification.cname,
        gameEName: Meta.getGameENameByIGameId(Meta.getGameByEName('panda', room.classification.ename).iGameId),
        title: room.name,
        pic: room.pictures.img,
        online: parseInt(room.person_num) || 0,
        url: Meta.getSite('panda').url + '/' + room.id,
        user: {
            uid: room.userinfo.rid,
            nickname: room.userinfo.nickName,
            gender: 0,
            avatar: room.userinfo.avatar
        },
        updated_at: new Date()
    };
}

module.exports = {
    dataHandler: dataHandler
};