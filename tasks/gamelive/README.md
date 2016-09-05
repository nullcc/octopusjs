# 游戏直播数据抓取概述(非常重要)


## 一. 平台支持情况

目前支持6个平台:

1. 斗鱼
2. 虎牙
3. 龙珠
4. 熊猫
5. 全民
6. 战旗


## 二. 各直播平台API收集

1. 斗鱼(有openApi)

    获取游戏元信息

        http://open.douyucdn.cn/api/RoomApi/game

    获取直播间列表信息

        http://open.douyucdn.cn/api/RoomApi/live/{游戏id/游戏ename}


2. 战旗

    获取游戏元信息
        
        在战旗平台没有找到直接的API获取游戏原信息,但是可以随便找个直播间,查看网页源码,里面有:
        
        <select>
                <option value="126">旗妙梦工厂</option>
                <option value="65">百变娱乐</option>
                <option value="6">英雄联盟</option>
                <option value="10">DOTA2</option>
                <option value="9">炉石传说</option>
                <option value="82">守望先锋</option>
                <option value="49">单机游戏</option>
                <option value="13">三国杀</option>
                <option value="73">怀旧回忆</option>
                <option value="67">射击游戏</option>
                <option value="22">地下城与勇士</option>
                <option value="28">手机游戏</option>
                <option value="70">格斗游戏</option>
                <option value="8">魔兽世界</option>
                <option value="21">风暴英雄</option>
                <option value="37">忍者村大战2</option>
                <option value="35">传奇</option>
                <option value="105">三国杀移动版</option>
                <option value="63">网游综合</option>
                <option value="33">300英雄</option>
                <option value="106">无人深空</option>
                <option value="108">黎明杀机</option>
                <option value="80">梦三国2</option>
                <option value="76">棋牌竞技</option>
                <option value="23">剑灵</option>
                <option value="68">暗黑破坏神Ⅲ</option>
                <option value="18">魔兽争霸3</option>
                <option value="2">最终幻想14</option>
                <option value="32">剑网3</option>
                <option value="79">坦克世界</option>
                <option value="5">星际争霸2</option>
                <option value="14">DOTA</option>
                <option value="115">王者荣耀</option>
                <option value="116">皇室战争</option>
                <option value="127">球球大作战</option>
                <option value="104">桌游天地</option>
                <option value="128">第十域：英雄起源</option>
                <option value="72">我的世界</option>
                <option value="132">Lyingman</option>
                <option value="98">无尽战区</option>
                <option value="122">生存游戏</option>
                <option value="109">马里奥</option>
                <option value="120">穿越火线</option>
                <option value="118">逆战</option>
                <option value="102">九阳神功</option>
                <option value="11">NBA2K ONLINE</option>
                <option value="25">神之浩劫</option>
                <option value="29">体育竞技</option>
                <option value="36">FIFA Online</option>
                <option value="45">游戏放映室</option>
                <option value="60">三国杀英雄传</option>
                <option value="74">天涯明月刀</option>
                <option value="81">战舰世界</option>
                <option value="84">自由篮球</option>
                <option value="96">他们说</option>
                <option value="97">敢达OL</option>
                <option value="100">怪物猎人online</option>
                <option value="113">冒险岛2</option>
                <option value="119">反恐精英：全球攻势</option>
                <option value="130">乐视体育</option>
              </select>

    获取直播间列表信息

        http://www.zhanqi.tv/api/static/game.lives/{游戏类别id}/{每页多少条}-{第几页,页数从0开始计算}.json

        例子:

            http://www.zhanqi.tv/api/static/game.lives/6/10-1.json

3. 虎牙

    获取游戏元信息

        http://phone.huya.com/api/game

    获取直播间列表信息

        http://www.huya.com/index.php?m=Game&do=ajaxGameLiveByPage&gid={游戏gid}&page={页数}

        例子:

            http://www.huya.com/index.php?m=Game&do=ajaxGameLiveByPage&gid=1&page=1

4. 龙珠

    获取游戏元信息

        http://api.plu.cn/tga/nav/games

    获取直播间列表信息

        http://api.plu.cn/tga/streams?max-results={一次获取的数量}&start-index={开始偏移量}&sort-by=top&filter=0&game={游戏id}

        例子:

            http://api.plu.cn/tga/streams?max-results=100&start-index=0&sort-by=top&filter=0&game=4

5. 熊猫

    获取游戏元信息

        http://api.m.panda.tv/ajax_get_all_subcate

    获取直播间列表信息

        http://api.m.panda.tv/ajax_get_live_list_by_cate?cate={游戏ename}&pageno={页数}&pagenum=100

        例子:

            http://api.m.panda.tv/ajax_get_live_list_by_cate?cate=lol&pageno=1&pagenum=100

6. 全民直播

    全民直播是通过游戏ename来获取直播间列表,ename可以通过点击相应游戏以后查看url获得,比如英雄联盟的url为:
    
        http://www.quanmin.tv/game/lol
        
    则其ename就是lol.

    获取直播间列表信息

        http://www.quanmin.tv/json/categories/{游戏ename}/list.json (第一页)
        http://www.quanmin.tv/json/categories/{游戏ename}/list_{页数}.json (第二页,页数从1开始)

        例子:
            http://www.quanmin.tv/json/categories/lol/list.json
            http://www.quanmin.tv/json/categories/lol/list_1.json
            
## 三. 设置数据库索引

在mongodb shell中执行:
    
    db.sites.ensureIndex({"iSiteId":1},{"unique":true})
    
    db.games.ensureIndex({"iGameId":1},{"unique":true})
    
    db.liverooms.ensureIndex({"iGameId":1})
    
    db.liverooms.ensureIndex({"iSiteId":1, "roomId":1})
    
    db.liverooms.ensureIndex({"title":1})
    
    db.liverooms.ensureIndex({"user.nickname":1})
    
    db.liverooms.ensureIndex({"updated_at":1})
    
    db.liverooms.ensureIndex({"iSiteId":1, "roomId":1, "updated_at":1})

## 四. 初始化数据

**在真正初始化数据之前,请先把gamelive/config/config.json的db字段配置成合适的值.**

1. 部署时,cd到octopusjs根目录下,执行以下命令来初始化各个直播平台和游戏的元数据:
    
    npm run-script gamelive_init
    
2. 手动获取直播内容数据(在之后会说明如何配置计划任务定时获取):

    npm run-script gamelive_getdata
    

## 五. 元数据配置

所有平台的元数据都放在./config/data.json中,如果对这些元数据有修改,需要再次重复(三)中的第1步来刷新一次元数据到db.目前已经完全配置正确,一般不需要修改.


## 六. 设置计划任务

执行:

    crontab -e

加入(具体间隔时间,脚本路径和日志路径请根据需要更改):

    */5 * * * * node /path/to/octopusjs/tasks/gamelive/main.js >> /path/to/octopusjs/tasks/gamelive/logs/getdata.log 2>&1

这样就设置了每隔5分钟执行一次/path/to/octopusjs/tasks/gamelive/main.js脚本,这个脚本会去抓取最新的直播间数据.

注意可能需要开启crontab:

    /sbin/service crond start

