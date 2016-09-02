var Data = require('./data.json');

var meta = (function(data){
    var timeInterval = data.config.timeInterval;
    var sites = data.sites;
    var allGames = data.games;

    var emptySiteObj = {
        iSiteId: "",
        name: "",
        ename: "",
        url: "",
        games: [],
        polyfill: null
    };

    var emptyGameObj = {
        name: "",
        ename: "",
        iGameId: "",
        gameId: ""
    };

    /**
     * 根据网站名获取网站元信息
     * @param siteName
     */
    function getSite(siteName){
        if(!siteName){
            return emptySiteObj;
        }
        return sites[siteName] || emptySiteObj;
    }

    /**
     * 根据网站名和gameId获取游戏元信息
     * @param siteName 网站名
     * @param gameId   游戏gameId
     */
    function getGameByGameId(siteName, gameId){
        if (!siteName || !gameId){
            return emptyGameObj;
        }
        gameId = gameId.toString();
        var site = sites[siteName];
        if (!site){
            return emptyGameObj;
        }
        var games = site.games;
        for (var i = 0; i < games.length; i++){
            var game = games[i];
            if (gameId === game.gameId){
                return game;
            }
        }
        return emptyGameObj;
    }

    /**
     * 根据网站名和游戏ename获取游戏元信息
     * @param siteName 平台名
     * @param ename    游戏ename
     */
    function getGameByEName(siteName, ename){
        if (!siteName || !ename){
            return emptyGameObj;
        }
        var site = sites[siteName];
        if (!site){
            return emptyGameObj;
        }
        var games = site.games;
        for (var i = 0; i < games.length; i++){
            var game = games[i];
            if (ename.toLowerCase() === game.ename.toLowerCase()){
                return game;
            }
        }
        return emptyGameObj;
    }

    /**
     * 根据iGameId获取游戏ename
     * @param iGameId 游戏iGameId
     */
    function getGameENameByIGameId(iGameId){
        if (!iGameId){
            return '';
        }
        for (var i = 0; i < allGames.length; i++){
            var game = allGames[i];
            if (iGameId === game.iGameId){
                return game.ename;
            }
        }
        return '';
    }

    function getIGameNameByIGameId(iGameId){
        if (!iGameId){
            return '';
        }
        for (var i = 0; i < allGames.length; i++){
            var game = allGames[i];
            if (iGameId === game.iGameId){
                return game.name;
            }
        }
        return '';
    }

    function getTimeInterval(){
        return timeInterval;
    }

    return {
        getSite: getSite,
        getGameByGameId: getGameByGameId,
        getGameByEName: getGameByEName,
        getGameENameByIGameId: getGameENameByIGameId,
        getIGameNameByIGameId: getIGameNameByIGameId,
        getTimeInterval: getTimeInterval
    };

})(Data);

module.exports = {
    meta: meta
};