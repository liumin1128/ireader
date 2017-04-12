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

