import { call, put, takeLatest } from 'redux-saga/effects';
import * as readerServices from '../../services/reader.js';

function* search({ query }) {
  try {
    const data = yield call(readerServices.search, query.query);
    yield put({ type: 'search/save', payload: { list: data.books || [] } });
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest('reader/search', search),
];
