import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/constants';
import * as readerServices from '../../services/reader.js';
// import { log } from '../../utils/common.js';

// console.log = log;

function* getSource({ query }) {
  try {
    const { id } = query;
    const { reader: { id: currentId, detail: { title } } } = yield select();
    if (currentId) {
      if (id !== currentId) {
        const { reader, store: { [id]: book } } = yield select();
        console.log(`将《${title}》放回书架`);
        yield put({ type: 'store/put', payload: { ...reader }, key: currentId });
        yield put({ type: 'reader/clear' });
        if (book && book.detail && book.source) {
          console.log(`从书架取回《${book.detail.title}》`);
          yield put({ type: 'reader/save', payload: { ...book } });
          return;
        }
      } else {
        return;
      }
    }
    let { search: { detail } } = yield select();
    if (!detail._id) {
      console.log('详情不存在，前往获取');
      detail = yield call(readerServices.getDetail, id);
    }
    const data = yield call(readerServices.getSource, id);
    console.log(`从网络获取《${detail.title}》`);
    yield put({ type: 'reader/save', payload: { source: data, id, detail } });
    console.log(`阅读：${detail.title}`);
    yield getChapterList();
  } catch (error) {
    console.log(error);
  }
}

function* getChapterList() {
  try {
    const { reader: { source, currentSource } } = yield select();
    if (currentSource >= source.length) {
      console.log('什么鬼？');
      yield put({ type: 'reader/save', payload: { currentSource: 0 } });
      yield getChapterList();
      return;
    }
    const { _id, name = '未知来源' } = source[currentSource];
    console.log(`书源: ${name}`);
    const { chapters } = yield call(readerServices.getChapterList, _id);
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
    const { chapter } = yield call(readerServices.getChapter, link);
    if (chapter) {
      console.log(`章节: ${chapter.title}`);
      yield put({ type: 'reader/save', payload: { chapter } });
      window.scrollTo(0, 0);
    } else {
      console.log('章节获取失败');
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
    yield put({ type: 'reader/save', payload: { currentChapter: nextChapter } });
    yield getChapter();
  } catch (error) {
    console.log(error);
  }
}

function* getNextSource() {
  try {
    const { reader: { source, currentSource } } = yield select();
    let nextSource = (currentSource || 1) + 1;
    console.log(nextSource);
    if (nextSource >= source.length) {
      console.log('没有可用书源,切换回优质书源');
      nextSource = 0;
    }
    console.log(`正在尝试切换到书源: ${source[nextSource] && source[nextSource].name}`);
    yield put({ type: 'reader/save', payload: { currentSource: nextSource } });
    yield getChapterList();
  } catch (error) {
    console.log(error);
  }
}

function* reStore({ payload }) {
  try {
    const { reader, store, setting } = payload;
    yield put({ type: 'reader/save', payload: { ...reader } });
    // console.log(store);
    yield put({ type: 'store/save', payload: { ...store } });
    yield put({ type: 'setting/save', payload: { ...setting } });
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
