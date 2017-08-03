const initState = {
  source: [],
  chapters: [],
  chapter: {},
  searchList: [],
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
