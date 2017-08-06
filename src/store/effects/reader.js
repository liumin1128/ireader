import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/constants';
import * as readerServices from '../../services/reader.js';

function* getSource({ query }) {
  try {
    const { id } = query;
    const { reader: { id: currentId } } = yield select();
    if (currentId) {
      if (id !== currentId) {
        const { reader, store: { [id]: book } } = yield select();
        console.log(`将本书放回书架，存入：${currentId}`);
        yield put({ type: 'store/put', payload: { ...reader }, key: currentId });
        yield put({ type: 'reader/clear' });
        if (book) {
          console.log('从书架取回书籍');
          yield put({ type: 'reader/save', payload: { ...book } });
          return;
        }
      } else {
        return;
      }
    }
    yield put({ type: 'common/pushLog', payload: { log: { msg: '正在获取书源', status: 'loading' } } });
    const data = yield call(readerServices.getSource, id);
    yield put({ type: 'common/pushLog', payload: { log: { msg: '获取书源成功', status: 'success' } } });
    const { search: { detail } } = yield select();
    yield put({ type: 'reader/save', payload: { source: data, id, detail } });
    yield getChapterList();
  } catch (error) {
    console.log(error);
  }
}

function* getChapterList() {
  try {
    const { reader: { source, currentSource } } = yield select();
    const { _id } = source[currentSource || 1];
    yield put({ type: 'common/pushLog', payload: { log: { msg: '正在获取章节列表', status: 'loading' } } });
    const { chapters } = yield call(readerServices.getChapterList, _id);
    yield put({ type: 'common/pushLog', payload: { log: { msg: '获取章节列表成功', status: 'success' } } });
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
    yield put({ type: 'common/pushLog', payload: { log: { msg: '正在获取章节内容', status: 'loading' } } });
    const { chapter } = yield call(readerServices.getChapter, link);
    if (chapter) {
      yield put({ type: 'common/pushLog', payload: { log: { msg: '获取章节列内容成功', status: 'success' } } });
      yield put({ type: 'reader/save', payload: { chapter } });
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
    const nextSource = (currentSource || 1) + 1;
    if (nextSource > source.length) {
      console.log('没有可用书源');
      return;
    }
    yield put({ type: 'common/pushLog', payload: { log: { msg: `正在切换到新的书源: ${source[nextSource].name}`, status: 'loading' } } });
    console.log(`正在尝试切换到书源: ${source[nextSource].name}`);
    yield put({ type: 'reader/save', payload: { currentSource: nextSource } });
    yield getChapterList();
  } catch (error) {
    console.log(error);
  }
}

function* reStore({ payload }) {
  try {
    const { reader, store } = payload;
    yield put({ type: 'reader/save', payload: { ...reader } });
    console.log(store);
    yield put({ type: 'store/save', payload: { ...store } });
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest(REHYDRATE, reStore),
  takeLatest('reader/getSource', getSource),
  takeLatest('reader/getChapterList', getChapterList),
  takeLatest('reader/getChapter', getChapter),
  takeLatest('reader/goToChapter', goToChapter),
];
