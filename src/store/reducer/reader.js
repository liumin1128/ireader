const initState = {
  currentSource: 1, // 默认书源为0，这里直接跳过
  currentChapter: 0,
  source: [],
  chapters: [],
  chapter: {},
  searchList: [],
  detail: {},
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
