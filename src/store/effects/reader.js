import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as readerServices from '../../services/reader.js';

function* getSource() {
  try {
    const data = yield call(readerServices.getSource, { id: '508662b8d7a545903b000027' });
    yield put({ type: 'reader/save', payload: { source: data } });
    yield getChapterList();
  } catch (error) {
    console.log(error);
  }
}

function* getChapterList() {
  try {
    const { reader } = yield select();
    const source = reader.currentSource || reader.source[2];
    const { chapters } = yield call(readerServices.getChapterList, { id: source._id });
    yield put({ type: 'reader/save', payload: { chapters } });
    yield getChapter();
  } catch (error) {
    console.log(error);
  }
}

function* getChapter() {
  try {
    const { reader } = yield select();
    const { link } = reader.currentChapters || reader.chapters[0];
    const chapter = yield call(readerServices.getChapter, { link });
    yield put({ type: 'reader/save', payload: { chapter } });
  } catch (error) {
    console.log(error);
  }
}

function* search({ query }) {
  try {
    const data = yield call(readerServices.search, query);
    yield put({ type: 'reader/save', payload: { searchList: data.books } });
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest('reader/getSource', getSource),
  takeLatest('reader/getChapterList', getChapterList),
  takeLatest('reader/getChapter', getChapter),
  takeLatest('reader/search', search),
];
