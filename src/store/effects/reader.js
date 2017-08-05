import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as readerServices from '../../services/reader.js';

function* getSource({ query }) {
  try {
    const { id } = query;
    yield put({ type: 'common/pushLog', payload: { log: { msg: '正在获取书源', status: 'loading' } } });
    const data = yield call(readerServices.getSource, id);
    yield put({ type: 'common/pushLog', payload: { log: { msg: '获取书源成功', status: 'success' } } });
    yield put({ type: 'reader/save', payload: { source: data }, id });
    yield put({ type: 'common/save', payload: { currentBookId: id } });
    yield getChapterList({ id });
  } catch (error) {
    console.log(error);
  }
}

function* getChapterList({ id }) {
  try {
    const { reader: { [id]: { source, currentSource } } } = yield select();
    console.log(source, currentSource);
    const { _id } = source[currentSource || 1];
    yield put({ type: 'common/pushLog', payload: { log: { msg: '正在获取章节列表', status: 'loading' } } });
    const { chapters } = yield call(readerServices.getChapterList, _id);
    yield put({ type: 'common/pushLog', payload: { log: { msg: '获取章节列表成功', status: 'success' } } });
    yield put({ type: 'reader/save', payload: { chapters }, id });
    yield getChapter({ id });
  } catch (error) {
    console.log(error);
  }
}

function* getChapter({ id }) {
  try {
    const { reader: { [id]: { chapters, currentChapter } } } = yield select();
    const { link } = chapters[currentChapter || 0];
    yield put({ type: 'common/pushLog', payload: { log: { msg: '正在获取章节内容', status: 'loading' } } });
    const { chapter } = yield call(readerServices.getChapter, link);
    if (chapter) {
      yield put({ type: 'common/pushLog', payload: { log: { msg: '获取章节列内容成功', status: 'success' } } });
      yield put({ type: 'reader/save', payload: { chapter }, id });
      yield put({ type: 'common/save', payload: { currentBookId: id } });
      window.scrollTo(0, 0);
    } else {
      yield put({ type: 'common/pushLog', payload: { log: { msg: '获取章节列内容失败', status: 'error' } } });
      yield getNextSource();
    }
  } catch (error) {
    console.log(error);
  }
}

function* goToChapter({ payload }) {
  try {
    const { common: { currentBookId: id } } = yield select();
    const { reader: { [id]: current = {} } } = yield select();
    const { chapters } = current;
    const nextChapter = payload.nextChapter;
    if (nextChapter > chapters.length) {
      console.log('没有下一章啦');
      return;
    }
    if (nextChapter < 0) {
      console.log('没有上一章啦');
      return;
    }
    console.log(`正在尝试切换到章节: ${chapters[nextChapter].title}`);
    yield put({ type: 'reader/save', payload: { currentChapter: nextChapter }, id });
    yield getChapter({ id });
  } catch (error) {
    console.log(error);
  }
}

function* getNextSource() {
  try {
    const { common: { currentBookId: id } } = yield select();
    const { reader: { [id]: current = {} } } = yield select();
    const { source, currentSource } = current;
    const nextSource = (currentSource || 1) + 1;
    if (nextSource > source.length) {
      console.log('没有可用书源');
      return;
    }
    yield put({ type: 'common/pushLog', payload: { log: { msg: `正在切换到新的书源: ${source[nextSource].name}`, status: 'loading' } } });
    console.log(`正在尝试切换到书源: ${source[nextSource].name}`);
    yield put({ type: 'reader/save', payload: { currentSource: nextSource }, id });
    yield getChapterList({ id });
  } catch (error) {
    console.log(error);
  }
}

function* getDetail({ query }) {
  try {
    const { id } = query;
    const data = yield call(readerServices.getDetail, id);
    yield put({ type: 'reader/save', payload: { detail: data }, id });
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest('reader/getSource', getSource),
  takeLatest('reader/getChapterList', getChapterList),
  takeLatest('reader/getChapter', getChapter),
  takeLatest('reader/goToChapter', goToChapter),
  takeLatest('reader/getDetail', getDetail),
];
