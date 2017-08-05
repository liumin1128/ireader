import { combineReducers } from 'redux';

import common from './common.js';
import reader from './reader.js';
import search from './search.js';

const reducer = combineReducers({
  common,
  reader,
  search,
});

export default reducer;
