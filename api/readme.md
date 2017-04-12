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
api.zhuishushenqi.com/toc?view=summary&book=508662b8d7a545903b000027&limit=100

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
