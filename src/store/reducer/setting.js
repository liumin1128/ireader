const initState = {
  mode: 'day',  // day light
  color: {
    background: '#FAF9DE',
  },
  style: {
    fontSize: 20,
  },
};

function setting(state = initState, action) {
  switch (action.type) {
    case 'setting/save':
      return {
        ...state,
        ...action.payload,
      };
    case 'setting/clear':
      return initState;
    default:
      return {
        ...state,
      };
  }
}

export default setting;
