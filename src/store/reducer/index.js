import { combineReducers } from 'redux';

import setting from './setting.js';
import common from './common.js';
import reader from './reader.js';
import search from './search.js';
import store from './store.js';

const reducer = combineReducers({
  setting,
  common,
  reader,
  search,
  store,
});

export default reducer;
