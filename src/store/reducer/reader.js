const initState = {
  currentSource: 1,   // 当前源下标：默认为1，跳过优质书源
  currentChapter: 0,  // 当前章节下标
  source: [],         // 源列表
  chapters: [],       // 章节列表
  chapter: {},        // 当前章节
  detail: {},         // 书籍详情
};

function reader(state = initState, action) {
  switch (action.type) {
    case 'reader/save':
      return {
        ...state,
        ...action.payload,
      };
    case 'reader/clear':
      return initState;
    default:
      return {
        ...state,
      };
  }
}

export default reader;
