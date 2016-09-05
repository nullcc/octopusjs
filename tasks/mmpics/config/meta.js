var Data = require('./data.json');

var meta = (function(data){

    var tags = data.tags;

    /**
     * 获取标签列表
     */
    function getTags(){
        return tags;
    }

    /**
     * 根据标签name获取标签cname
     */
    function getCTagByTag(tagName, tags){
        for (var i = 0; i < tags.length; i++){
            if (tagName === tags[i].name){
                return tags[i].cname;
            }
        }
        return '';
    }

    return {
        getTags: getTags,
        getCTagByTag: getCTagByTag

    };

})(Data);

module.exports = {
    meta: meta
};