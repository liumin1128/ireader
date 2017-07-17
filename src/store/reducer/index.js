import { combineReducers } from 'redux';

import common from './common.js';
import reader from './reader.js';

const reducer = combineReducers({
  common,
  reader,
});

export default reducer;
