import { all } from 'redux-saga/effects';
import reader from './reader.js';

function * rootSaga() {
  yield all([
    ...reader,
  ]);
}

export default rootSaga;
