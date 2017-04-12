### 设置代理

```
"proxy": {
    "/api": {
        "target": "http://api.zhuishushenqi.com/",
        "changeOrigin": true,
        "pathRewrite": { "^/api" : "" }
    },
    "/chapter": {
        "target": "http://chapter2.zhuishushenqi.com/",
        "changeOrigin": true,
        "pathRewrite": { "^/api" : "" }
    }
}
```

### 查询书籍列表：`book/fuzzy-search` GET

params

```
{
    query: String, // 书名
    start: Number, // 页码
    limit: Number  // 页长
}
```

example

```
book/fuzzy-search?query=凡人修仙传&start=0&limit=10
```

result

```
{
    "books": [{
        "_id": "508662b8d7a545903b000027",
        "hasCp": true,
        "title": "凡人修仙传",
        "cat": "仙侠",
        "author": "忘语",
        "site": "zhuishuvip",
        "cover": "/agent/http://image.cmfu.com/books/107580/107580.jpg",
        "shortIntro": "一个普通山村小子，偶然下进入到当地江湖小门派，成了一名记名弟子。他以这样身份，如何在门派中立足,如何以平庸的资质进入到修仙者的行列，从而笑傲三界之中！",
        "lastChapter": "第十一卷 真仙降临 第两千四百四十六章 飞升仙界(大结局）",
        "retentionRatio": 60.12,
        "latelyFollower": 16628,
        "wordCount": 7647986
    }, {
        "_id": "54ff033f350e013b105be1fb",
        "hasCp": false,
        "title": "凡人修仙传后记",
        "cat": "玄幻",
        "author": "孤单wjw",
        "site": "w17k",
        "cover": "/agent/http://img.17k.com/images/bookcover/default_cover1.jpg",
        "shortIntro": "本书是忘大《凡人修仙传》的延续，主要讲述了韩立在处处是危机、步步是险境的仙界从一个小仙人经过重重磨难，处处谨小慎微，在各方势力的夹缝中成长的过程，最终成为了仙界...",
        "lastChapter": "第七章 仙灵丹和仙籍",
        "retentionRatio": 0,
        "latelyFollower": 239,
        "wordCount": 10353
    }],
    "ok": true
}
```

### 查询书籍详情：`book/ID` GET

params 无

example

```
/book/508662b8d7a545903b000027
```

result

```
{
    "_id": "508662b8d7a545903b000027",
    "author": "忘语",
    "cover": "/agent/http://image.cmfu.com/books/107580/107580.jpg",
    "creater": "iPhone 4",
    "longIntro": "一个普通山村小子，偶然下进入到当地江湖小门派，成了一名记名弟子。他以这样身份，如何在门派中立足,如何以平庸的资质进入到修仙者的行列，从而笑傲三界之中！",
    "title": "凡人修仙传",
    "cat": "幻想修仙",
    "majorCate": "仙侠",
    "minorCate": "幻想修仙",
    "_le": false,
    "allowMonthly": false,
    "allowVoucher": true,
    "allowBeanVoucher": false,
    "hasCp": true,
    "postCount": 2243,
    "latelyFollower": 16628,
    "followerCount": 38497,
    "wordCount": 7647986,
    "serializeWordCount": 0,
    "retentionRatio": "60.12",
    "updated": "2017-02-16T06:02:34.819Z",
    "isSerial": false,
    "chaptersCount": 2451,
    "lastChapter": "第十一卷 真仙降临 第两千四百四十六章 飞升仙界(大结局）",
    "gender": ["male"],
    "tags": ["热血", "法宝", "架空", "扮猪吃虎", "奇遇", "凡人", "修炼", "修仙", "仙侠"],
    "donate": false,
    "copyright": "阅文集团正版授权"
}


```

### 查询书源

params 
```
{
    view: summary, // 概要
    book: 508662b8d7a545903b000027, // id
    start: 0, // 页码
    limit: 10 // 页长
}
```

example

```
api.zhuishushenqi.com/toc?view=summary&book=508662b8d7a545903b000027

```
result

```
[
  {
    "_id": "56f8dbc4176d03ac1984484d",
    "source": "zhuishuvip",
    "name": "优质书源",
    "link": "http://vip.zhuishushenqi.com/toc/56f8dbc4176d03ac1984484d",
    "lastChapter": "第十一卷 真仙降临 第两千四百四十六章 飞升仙界(大结局）",
    "isCharge": false,
    "chaptersCount": 2451,
    "updated": "2017-02-16T06:02:34.819Z",
    "starting": true,
    "host": "vip.zhuishushenqi.com"
  },
  {
    "_id": "58a60bdc808aaa192e318fe9",
    "lastChapter": "更新重要通告",
    "link": "http://www.hunhun520.com/book/fanrenxiuxianchuan/",
    "source": "hunhun",
    "name": "混混小说网",
    "isCharge": false,
    "chaptersCount": 2464,
    "updated": "2017-02-20T14:59:34.821Z",
    "starting": false,
    "host": "hunhun520.com"
  }
]
```

### 查询章节列表（先获取书源id）

params 
```
{
    view: chapters,
}
```

example

```
api.zhuishushenqi.com/toc/508662b8d7a545903b000027?view=chapters

```
result

```
{
    [{
        "title": "第十一卷 真仙降临 第两千四百四十五章 飞升之劫",
        "link": "http://vip.zhuishushenqi.com/chapter/56f8df26176d03ac1984afc1?cv=1487224944100",
        "id": "56f8df26176d03ac1984afc1",
        "currency": 15,
        "unreadble": false,
        "isVip": true
    }, {
        "title": "第十一卷 真仙降临 第两千四百四十六章 飞升仙界(大结局）",
        "link": "http://vip.zhuishushenqi.com/chapter/56f8df27176d03ac1984afcf?cv=1487224944103",
        "id": "56f8df27176d03ac1984afcf",
        "currency": 15,
        "unreadble": false,
        "isVip": true
    }],
    "updated": "2017-02-16T06:02:34.819Z",
    "host": "vip.zhuishushenqi.com"
}
```

### 查询章节内容（先获取书源章节link）

/chapter/章节link(从章节列表中获得)?k=2124b73d7e2e1945&t=1468223717

params 
```
{
    k: 2124b73d7e2e1945
    t: 1468223717
}
```

example

```
chapter2.zhuishushenqi.com/chapter/http%3a%2f%2fbook.my716.com%2fgetBooks.aspx%3fmethod%3dcontent%26bookId%3d1127281%26chapterFile%3dU_1212539_201701211420571844_4093_2.txt?k=2124b73d7e2e1945&t=1468223717

```
result

```
{
  "ok": true,
  "chapter": {
    "title": ".",
    "body": "第二章\n灵溪宗，位于东林洲内，属于通天河的下游支脉所在，立足通天河南北两岸，至今已有万年历史，震慑四方。\n八座云雾缭绕的惊天山峰，横在通天河上，其中北岸有四座山峰，南岸三座，至于中间的通天河上，赫然有一座最为磅礴的山峰。\n此山从中段开始就白雪皑皑，竟看不清尽头，只能看到下半部的山体被掏空，使得金色的河水奔腾而过，如同一座山桥。\n此刻，灵溪宗南岸外，一道长虹疾驰而来，其内中年修士李青候带着白小纯，没入第三峰下的杂役区域，隐隐还可听到长虹内白小纯的惨叫传出。\n白小纯觉得自己要被吓死了，一路飞行，他看到了无数大山，好几次都觉得自己要抓不住对方的大腿。\n眼下面前一花，当清晰时，已到了一处阁楼外，落在了地上后，他双腿颤抖，看着四周与村子里完全不同的世界。\n前方的阁楼旁，竖着一块大石，上面写着龙飞凤舞的三个大字。\n杂役处。\n大石旁坐着一个麻脸女子，眼看李青候到来，立刻起身拜见。\n“将此子送火灶房去。”李青候留下一句话，没有理会白小纯，转身化作长虹远去。\n麻脸女子听到火灶房三字后一怔，目光扫了白小纯一眼，给了白小纯一个宗门杂役的布袋，面无表情的交代一番，便带着白小纯走出阁楼，一路庭院林立，阁楼无数，青石铺路，还有花草清香，如同仙境，看的白小纯心驰荡漾，心底的紧张与忐忑也少了几分。\n“好地方啊，这里可比村子里好多了啊。”白小纯目中露出期待，随着走去，越是向前，四周的美景就越发的美奂绝伦，甚至他还看到一些样子秀美的女子时而路过，让白小纯对于这里，一下子就喜欢的不得了。\n片刻后，白小纯更高兴了，尤其是前方尽头，他看到了一处七层的阁楼，通体晶莹剔透，甚至天空还有仙鹤飞过。\n“师姐，我们到了吧？”白小纯顿时激动的问道。\n“恩，就在那。”麻脸女子依旧面无表情，淡淡开口，一指旁侧的小路。\n白小纯顺着对方所指，满怀期待的看去时，整个人僵住，揉了揉眼睛仔细去看，只见那条小路上，地面多处碎裂，四周更是破破烂烂，几件草房似随时可以坍塌，甚至还有一些怪味从那里飘出……\n白小纯欲哭无泪，抱着最后一丝希望，问了麻脸女子一句。\n“师姐，你指错了吧……”\n“没有。”麻脸女子淡淡开口，当先走上这条小路，白小纯听后，觉得一切美好瞬间坍塌，苦着脸跟了过去。\n没走多远，他就看到这条破破烂烂的小路尽头，有几口大黑锅窜来窜去，仔细一看，那每一口大黑锅下面，都有一个大胖子，脑满肠肥，似乎一挤都可以流油，不是一般的胖，尤其是里面一个最胖的家伙，跟个肉山似的，白小纯都担心能不能爆了。\n那几个胖子的四周，有几百口大锅，这些胖子正在添水放米。\n察觉有人到来，尤其是看到了麻脸女子，那肉山立刻一脸惊喜，拎着大勺，横着就跑了过来，地面都颤了，一身肥膘抖动出无数波澜，白小纯目瞪口呆，下意识的要在身边找斧头。\n“今早小生听到喜鹊在叫，原来是姐姐你来了，莫非姐姐你已回心转意，觉得我有几分才气，趁着今天良辰，要与小生结成道侣。”肉山目中露出色眯眯的光芒，激动的边跑边喊。\n“我送此子加入你们火灶房，人已带到，告辞！”麻脸女子在看到肉山后，面色极为难看，还有几分恼怒，赶紧后退。\n白小纯倒吸口气，那麻脸女子一路上他就留意了，那相貌简直就是鬼斧神工，眼前这大胖子什么口味，居然这样也能一脸色相。\n还没等白小纯想完，那肉山就呼的一声，出现在了他的面前，直接就将阳光遮盖，把白小纯笼罩在了阴影下。\n白小纯抬头看着面前这庞大无比，身上的肉还在颤动的胖子，努力咽了口唾沫，这么胖的人，他还是头一次看到。\n肉山满脸幽怨的将目光从远处麻脸女子离去的方向收回，扫了眼白小纯。\n“嗬呦，居然来新人了，能把原本安排好的许宝财挤下去，不简单啊。”\n“师兄，在下……在下白小纯……”白小纯觉得对方魁梧的身体，让自己压力太大，下意识的退后几步。\n“白小纯？恩……皮肤白，小巧玲珑，模样还很清纯，不错不错，你的名字起的很符合我的口味嘛。”肉山眼睛一亮，拍下了白小纯的肩膀，一下子差点把白小纯直接拍倒。\n“不知师兄大名是？”白小纯倒吸口气，翻了个白眼，鄙夷的看了眼肉山，心底琢磨着也拿对方的名字玩一玩。\n“我叫张大胖，那个是黄二胖，还有黑三胖……”肉山嘿嘿一笑。\n白小纯听到这几个名字，大感人如其名，立刻没了玩一玩的想法。\n“至于你，以后就叫白九……小师弟，你太瘦了！这样出去会丢我们火灶坊的脸啊，不过也没关系，放心好了，最多一年，你也会胖的，以后你就叫白九胖。”张大胖一拍胸口，肥肉乱颤。\n听到白九胖这三个字，白小纯脸都挤出苦水了。\n“既然你已经是九师弟了，那就不是外人了，咱们火灶房向来有背锅的传统，看到我背后这这口锅了吧，它是锅中之王，铁精打造，刻着地火阵法，用这口锅煮出的灵米，味道超出寻常的锅太多太多。你也要去选一口，以后背在身上，那才威风。”张大胖拍了下背后的大黑锅，吹嘘的开口。\n“师兄，背锅的事，我能不能算了……”白小纯瞄了眼张大胖背后的锅，顿时有种火灶房的人，都是背锅的感觉，脑海里想了一下自己背一口大黑锅的样子，连忙说道。\n“那怎么行，背锅是我们火灶房的传统，你以后在宗门内，别人只要看到你背着锅，知道你是火灶房的人，就不敢欺负你，咱们火灶房可是很有来头的！”张大胖向白小纯眨了眨眼，不由分说，拎着白小纯就来到草屋后面，那里密密麻麻叠放着数千口大锅，其中绝大多数都落下厚厚一层灰，显然很久都没人过来。\n“九师弟，你选一口，我们去煮饭了，不然饭糊了，那些外门弟子又要嚷嚷了。”张大胖喊了一声，转身与其他几个胖子，又开始在那上百个锅旁窜来窜去。\n白小纯唉声叹气，看着那一口口锅，正琢磨选哪一个时，忽然看到了在角落里，放着一口被压在下面的锅。\n这口锅有些特别，不是圆的，而是椭圆形，看起来不像是锅，反倒像是一个龟壳，隐隐可见似乎还有一些黯淡的纹路。\n“咦？”白小纯眼睛一亮，快步走了过去，蹲下身子仔细看了看后，将其搬了出来，仔细看后，目中露出满意。\n他自幼就喜欢乌龟，因为乌龟代表长寿，而他之所以来修仙，就是为了长生，如今一看此锅像龟壳，在他认为，这是很吉利的，是好兆头。\n将这口锅搬出去后，张大胖远远的看到，拿着大勺就跑了过来。\n“九师弟你怎么选这口啊，这锅放在那里不知多少年了，没人用过，因为像龟壳，所以也从来没人选背着它在身上，这个……九师弟你确定？”张大胖拍了拍自己的肚子，好心的劝说。\n“确定，我就要这口锅了。”白小纯越看这口锅越喜欢，坚定道。\n张大胖又劝说一番，眼看白小纯执意如此，便古怪的看了看他，不再多说，为白小纯安排了在这火灶房居住的草屋后，就又忙碌去了。\n此刻天色已到黄昏，白小纯在草屋内，将那口龟形的锅仔细的看了看，发现这口锅的背面，有几十条纹路，只是黯淡，若不细看，很难发现。\n他顿时认为这口锅不凡，将其小心的放在了灶上，这才打量居住的屋舍，这房屋很简单，一张小床，一处桌椅，墙上挂着一面日常所需的铜镜，在他环顾房间时，身后那口平淡无奇的锅上，有一道紫光，一闪而逝！\n对于白小纯来说，这一天发生了很多事情，如今虽然来到了梦寐以求的仙人世界，可他心里终究是有些茫然。\n片刻后，他深吸口气，目中露出期望。\n“我要长生！”白小纯坐在一旁取出杂役处麻脸女子给予的口袋。\n里面有一枚丹药，一把木剑，一根燃香，再就是杂役的衣服与令牌，最后则是一本竹书，书上有几个小字。\n“紫气驭鼎功，凝气篇。”\n黄昏时分，火灶房内张大胖等人忙碌时，屋舍内的白小纯正看着竹书，眼中露出期待，他来到这里是为了长生，而长生的大门，此刻就在他的手中，深呼吸几次后，白小纯打开竹书看了起来。\n片刻后，白小纯眼中露出兴奋之芒，这竹书上有三幅图，按照上面的说法，修行分为凝气与筑基两个境界，而这紫气驭鼎功分为十层，分别对应凝气的十层。\n且每修到一层，就可以驭驾外物为己用，当到了第三层后，可以驾驭重量为小半个鼎的物体，到了第六层，则是大半个鼎，而到了第九层，则是一整尊鼎，至于最终的大圆满，则是可以驾驭重量为两尊鼎的物体。\n只不过这竹书上的功法，只有前三层，余下的没有记录，且若要修炼，还需按照特定的呼吸以及动作，才可以修行这紫气驭鼎功。\n白小纯打起精神，调整呼吸，闭目摆出竹书上第一幅图的动作，只坚持了三个呼吸，就全身酸痛的惨叫一声，无法坚持下去，且那种呼吸方式，也让他觉得气不够用。\n“太难了，上面说这修炼这第一幅图，可以感受到体内有一丝气在隐隐游走，可我这里除了难受，什么都没有感觉到。”白小纯有些苦恼，可为了长生，咬牙再次尝试，就这样磕磕绊绊，直至到了傍晚，他始终没有感受到体内的气。\n他不知道，即便是资质绝佳之人，若没有外力，单纯去修行这紫气驭鼎功的第一层，也需要至少一个月的时间，而他这里才几个时辰，根本就不可能有气感。\n此刻全身酸痛，白小纯伸了个懒腰，正要去洗把脸，突然的，从门外传来阵阵吵闹之声，白小纯把头伸出窗外，立刻看到一个面黄肌瘦的青年，一脸铁青的站在火灶房院子的大门外。\n“是谁顶替了我许宝财的名额，给我滚出来！”\n=========\n正式更新啦！新书如小树苗一样鲜嫩，急需呵护啊，求推荐票，求收藏！！！推荐，推荐，推荐，收藏，收藏，收藏，重要的事，三遍三遍！！！"
  }
}
```


[api来源](https://github.com/qq573011406/KindleHelper/blob/master/libZhuishu/api/doc/apidoc.txt)


追书神器API:

1.搜索图书
Host:api.zhuishushenqi.com
Method:GET /book/fuzzy-search
Params:
	query:关键词
	start:结果开始位置
	limit:结果最大数量
response:
{
    "books": [
        {
            "_id": "508751bef98e8f7446000024",
            "hasCp": true,
            "title": "神墓",
            "cat": "玄幻",
            "author": "辰东",
            "site": "qidian",
            "cover": "/agent/http://image.cmfu.com/books/63856/63856.jpg",
            "shortIntro": "一个死去万载岁月的平凡青年从远古神墓中复活而出……",
            "lastChapter": "我的新书《完美世界》已上传，请兄弟姐妹来观看",
            "retentionRatio": 51.46,
            "latelyFollower": 601,
            "wordCount": 3124360
        },
        {
            "_id": "561231284d4192d70a503e27",
            "hasCp": false,
            "title": "他从神墓来",
            "cat": "同人",
            "author": "邱则",
            "site": "qidian",
            "cover": "/agent/http://image.cmfu.com/books/2889151/2889151.jpg",
            "shortIntro": "先穿越到神墓历经十世轮回千万载岁月，后与天道一战打破多元宇宙壁垒。穿梭到其他世界······",
            "lastChapter": "第二十六章",
            "retentionRatio": null,
            "latelyFollower": 12,
            "wordCount": 99397
        }
    ],
    "ok": true
}
--------------------------------------------------
2.书籍详情
Host:api.zhuishushenqi.com
Method:GET /book/书籍ID
response:
{
    "_id": "50bee5172033d09b2f00001b",
    "author": "莫默",
    "banned": 0,
    "cover": "/agent/http://image.cmfu.com/books/2494758/2494758.jpg",
    "creater": "iPhone 4S",
    "dramaPoint": null,
    "followerCount": 14385,
    "gradeCount": 0,
    "isSerial": true,
    "lastChapter": "请安装【追书神器】，本应用已停用",
    "latelyFollower": 165101,
    "longIntro": "您当前所使用的软件已改名为【追书神器】。\n请搜索“追书神器”下载安装最新版【追书神器】。\n无广告；不闪退；章节更新自动通知。",
    "postCount": 28547,
    "reviewCount": 618,
    "serializeWordCount": 5706,
    "tags": [
        "玄幻",
        "热血",
        "架空",
        "巅峰",
        "奇遇",
        "升级练功",
        "东方玄幻"
    ],
    "title": "武炼巅峰",
    "tocs": [
        "50bee5172033d09b2f00001c",
        "50c703274a0d32e637000064",
        "51776b30fb92a36054000146",
        "523070e69e75522764000129",
        "52bd2b9029eb81b82500008f",
        "52bd2b9029eb81b825000090",
        "52bd2b9029eb81b825000091",
        "532bf5f63949325379000021"
    ],
    "totalPoint": null,
    "type": "xhqh",
    "updated": "2016-07-11T00:49:34.749Z",
    "writingPoint": null,
    "site": "qidian",
    "hasNotice": false,
    "tagStuck": 0,
    "chaptersCount": 3079,
    "tocCount": 10,
    "tocUpdated": "2016-07-11T00:49:34.749Z",
    "retentionRatio": 73.69,
    "followerRank": 70,
    "retentionRatioRank": 82,
    "hasCmread": true,
    "thirdFlagsUpdated": "2014-09-01T05:56:51.009Z",
    "categories": [
        "东方玄幻",
        "玄幻"
    ],
    "wordCount": 9294707,
    "aliases": [
        "武练巅峰"
    ],
    "cat": "玄幻",
    "gender": [
        "male"
    ],
    "majorCate": "玄幻",
    "minorCate": "东方玄幻",
    "monthFollower": {
        "11": 6342
    },
    "totalFollower": 12734,
    "monthRetentionRatio": {
        "11": 66.67
    },
    "cpOnly": false,
    "hasCp": true
}
------------------------
3.书源
GET /toc?view=summary&book=573d65ab608bed412452ba69 HTTP/1.1
reponse:
[
    {
        "_id": "5679b5debb597f3a47b208f5",
        "lastChapter": "请假，暂停一天",
        "link": "http://api.easou.com/api/bookapp/chapter_list.m?gid=10645516&nid=1010645516&size=10000&cid=eef_easou_book&version=002&os=android&appverion=1011",
        "source": "aeasou",
        "name": "宜搜小说",
        "isCharge": false,
        "chaptersCount": 2063,
        "updated": "2016-07-11T18:14:05.380Z",
        "starting": false,
        "host": "api.easou.com"
    },
    {
        "_id": "532d0126394932537900222b",
        "lastChapter": "请假，暂停一天",
        "link": "http://read.shuhaha.com/Html/Book/34/34019/",
        "name": "书哈哈小说网",
        "source": "shuhaha",
        "isCharge": false,
        "chaptersCount": 2115,
        "updated": "2016-07-11T16:07:35.732Z",
        "starting": false,
        "host": "read.shuhaha.com"
    }
]
-------------------------
4.章节列表
Host:api.zhuishushenqi.com
Method:GET /toc/书源ID?view=chapters
response:
{"_id":"57398b120d9625ff2f6c2f34","name":"优质书源","link":"http://www.ybdu.com/xiaoshuo/402/402169/index.html","chapters":[{"title":"第1章　战神重生","link":"http://www.ybdu.com/xiaoshuo/402/402169/792.html","id":"57398b127fb8b8705ac36825","currency":10,"unreadble":false,"isVip":false},{"title":"第2章　滚下去","link":"http://www.ybdu.com/xiaoshuo/402/402169/545.html","id":"57398b127fb8b8705ac36826","currency":10,"unreadble":false,"isVip":false},{"title":"第3章　强硬逼婚","link":"http://www.ybdu.com/xiaoshuo/402/402169/376.html","id":"57398b127fb8b8705ac36827","currency":10,"unreadble":false,"isVip":false},{"title":"第4章　聂天的狂","link":"http://www.ybdu.com/xiaoshuo/402/402169/119.html","id":"57398b127fb8b8705ac36828","currency":10,"unreadble":false,"isVip":false},{"title":"第5章　凝聚人心","link":"http://www.ybdu.com/xiaoshuo/402/402169/394.html","id":"57398b127fb8b8705ac36829","currency":10,"unreadble":false,"isVip":false},{"title":"第6章　星辰原石","link":"http://www.ybdu.com/xiaoshuo/402/402169/95.html","id":"57398b127fb8b8705ac3682a","currency":10,"unreadble":false,"isVip":false},{"title":"第7章　星辰之力觉醒","link":"http://www.ybdu.com/xiaoshuo/402/402169/475.html","id":"57398b127fb8b8705ac3682b","currency":10,"unreadble":false,"isVip":false},{"title":"第8章　你叫我废物","link":"http://www.ybdu.com/xiaoshuo/402/402169/51.html","id":"57398b127fb8b8705ac3682c","currency":10,"unreadble":false,"isVip":false},{"title":"第9章　剑绝天斩","link":"http://www.ybdu.com/xiaoshuo/402/402169/680.html","id":"57398b127fb8b8705ac3682d","currency":10,"unreadble":false,"isVip":false},{"title":"第10章　墨如曦","link":"http://www.ybdu.com/xiaoshuo/402/402169/596.html","id":"57398b127fb8b8705ac3682e","currency":10,"unreadble":false,"isVip":false}],"updated":"2016-07-11T02:30:53.450Z"}
-------------------------

5.混合源章节列表
GET http://api.zhuishushenqi.com/mix-toc/书籍ID
{
    "ok": true,
    "mixToc": {
        "_id": "53a2c43ffda0a68d82ff3d19",
        "book": "50864deb9dacd30e3a00001d",
        "chaptersUpdated": "2016-07-05T12:09:09.720Z",
        "updated": "2016-07-08T12:51:21.385Z",
        "chapters": [
            {
                "title": "第一章 林动【新书开张，郑重的求收藏！】",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/129.html",
                "unreadble": false
            },
            {
                "title": "第二章 通背拳",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/140.html",
                "unreadble": false
            },
            {
                "title": "第三章 古怪的石池",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/146.html",
                "unreadble": false
            },
            {
                "title": "第四章 石池之秘",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/198.html",
                "unreadble": false
            },
            {
                "title": "第五章 神秘石符",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/517.html",
                "unreadble": false
            },
            {
                "title": "第六章 七响",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/633.html",
                "unreadble": false
            },
            {
                "title": "第七章 淬体第四重",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/139.html",
                "unreadble": false
            },
            {
                "title": "第八章 冲突",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/993.html",
                "unreadble": false
            },
            {
                "title": "第九章 林宏",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/410.html",
                "unreadble": false
            },
            {
                "title": "第十章 金玉枝",
                "link": "http://www.ybdu.com/xiaoshuo/402/402169/126.html",
                "unreadble": false
            }
        ]
    }
}


4.章节内容
Host:chapter2.zhuishushenqi.com
Method:GET /chapter/章节link(从章节列表中获得)?k=2124b73d7e2e1945&t=1468223717
response:
{
    "ok": true,
    "chapter": {
        "title": "第1章 他叫白小纯",
        "body": "\n\r\n\r\n\r请安装最新版追书 以便使用优质资源",
        "isVip": false,
        "cpContent": "　　帽按时大大说",
        "currency": 15,
        "id": "5750118aa37701c41f60646f"
    }
}


6.Autocomplate
GET /book/auto-complete?query=%E6%AD%A6%E5%8A%A8 HTTP/1.1
{"keywords":["武动乾坤","武动乾坤续集之大千世界","武动乾坤番外之冰灵族","武动乾坤续集","武动时空","武动韩娱","武动乾坤冰灵族","武动乾坤后续","武动龙珠","武动苍冥"],"ok":true}
