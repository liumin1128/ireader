function store(state = {}, action) {
  switch (action.type) {
    case 'store/save':
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          ...action.payload,
        },
      };
    case 'store/clear':
      return {};
    default:
      return {
        ...state,
      };
  }
}

export default store;
