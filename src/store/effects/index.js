import { all } from 'redux-saga/effects';
import reader from './reader.js';
import search from './search.js';

function * rootSaga() {
  yield all([
    ...reader,
    ...search,
  ]);
}

export default rootSaga;
