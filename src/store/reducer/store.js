function store(state = {}, action) {
  switch (action.type) {
    case 'store/save': {
      let temp = {};
      if (action.key) {
        temp = {
          [action.key]: {
            ...state[action.key],
            ...action.payload,
          },
        };
      }
      return {
        ...state,
        ...temp,
      };
    }
    case 'store/clear':
      return {};
    default:
      return {
        ...state,
      };
  }
}

export default store;
