const initState = {
  list: [],   // 列表
  detail: {},   // 书籍详情
};

function search(state = initState, action) {
  switch (action.type) {
    case 'search/save':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default search;
