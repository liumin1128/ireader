const initState = {
  list: [],   // 日志
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
