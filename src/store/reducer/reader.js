// const initState = {
//   currentSource: 1,   // 当前源下标：默认为1，跳过优质书源
//   currentChapter: 0,  // 当前章节下标
//   source: [],         // 源列表
//   chapters: [],       // 章节列表
//   chapter: {},        // 当前章节
//   searchList: [],     // 搜索结果列表
//   detail: {},         // 书籍详情
// };

function reader(state = {}, action) {
  switch (action.type) {
    case 'reader/save':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.payload,
        },
      };
    case 'reader/clear':
      return {};
    default:
      return {
        ...state,
      };
  }
}

export default reader;
