
function store(state = {}, action) {
  switch (action.type) {
    case 'store/put': {
      if (action.key) {
        return {
          ...state,
          [action.key]: {
            ...state[action.key],
            ...action.payload,
          },
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case 'store/save':
      return {
        ...state,
        ...action.payload,
      };
    case 'store/delete':
      return {
        ...state,
        [action.key]: undefined,
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
