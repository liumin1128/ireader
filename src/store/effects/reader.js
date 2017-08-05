import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as readerServices from '../../services/reader.js';

function* getSource({ query }) {
  try {
    const data = yield call(readerServices.getSource, query);
    yield put({ type: 'reader/save', payload: { source: data } });
    yield getChapterList();
  } catch (error) {
    console.log(error);
  }
}

function* getChapterList() {
  try {
    const { reader: { source, currentSource } } = yield select();
    const { _id: id } = source[currentSource || 0];
    const { chapters } = yield call(readerServices.getChapterList, { id });
    yield put({ type: 'reader/save', payload: { chapters } });
    yield getChapter();
  } catch (error) {
    console.log(error);
  }
}

function* getChapter() {
  try {
    const { reader: { chapters, currentChapter } } = yield select();
    const { link } = chapters[currentChapter || 0];
    const { chapter } = yield call(readerServices.getChapter, { link });
    if (chapter) {
      yield put({ type: 'reader/save', payload: { chapter } });
    } else {
      yield getNextSource();
    }
  } catch (error) {
    console.log(error);
  }
}

function* goToChapter({ payload }) {
  try {
    const { reader: { chapters } } = yield select();
    const nextChapter = payload.nextChapter;
    if (nextChapter > chapters.length) {
      console.log('没有下一章啦');
      return;
    }
    if (nextChapter < 0) {
      console.log('没有上一章啦');
      return;
    }
    console.log(`正在尝试切换到章节: ${nextChapter}`);
    console.log(`正在尝试切换到章节: ${chapters[nextChapter].title}`);
    yield put({ type: 'reader/save', payload: { currentChapter: nextChapter } });
    yield getChapter();
  } catch (error) {
    console.log(error);
  }
}

function* getNextSource() {
  try {
    const { reader: { source, currentSource } } = yield select();
    const nextSource = currentSource + 1;
    if (nextSource > source.length) {
      console.log('没有可用书源');
      return;
    }
    console.log(`正在尝试切换到书源: ${source[nextSource].name}`);
    yield put({ type: 'reader/save', payload: { currentSource: nextSource } });
    yield getChapterList();
  } catch (error) {
    console.log(error);
  }
}

function* search({ query }) {
  try {
    const data = yield call(readerServices.search, query);
    yield put({ type: 'reader/save', payload: { searchList: data.books || [] } });
  } catch (error) {
    console.log(error);
  }
}

function* getDetail({ query }) {
  try {
    const data = yield call(readerServices.getDetail, query);
    yield put({ type: 'reader/save', payload: { detail: data } });
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest('reader/getSource', getSource),
  takeLatest('reader/getChapterList', getChapterList),
  takeLatest('reader/getChapter', getChapter),
  takeLatest('reader/goToChapter', goToChapter),
  takeLatest('reader/search', search),
  takeLatest('reader/getDetail', getDetail),
];
