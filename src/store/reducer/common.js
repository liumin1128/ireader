const initState = {
  logs: ['日志开启'],   // 日志
  currentBookId: '',
};

function common(state = initState, action) {
  switch (action.type) {
    case 'common/save':
      return {
        ...state,
        ...action.payload,
      };
    case 'common/pushLog':
      return {
        ...state,
        ...state.logs.push(action.payload.log),
      };
    default:
      return {
        ...state,
      };
  }
}

export default common;
