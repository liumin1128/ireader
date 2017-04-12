import * as bookReaderService from '../services/bookReader.js';
import swal from 'sweetalert';

export default {
  namespace: 'bookReader',
  state: {
    chapter: {},
    chapterList: [],
    bookSource: [],
    current: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getSource({ query }, { call, put }) {
      const { data } = yield call(bookReaderService.getSource, { query });
      if (data) {
        yield put({ type: 'save', payload: { bookSource: data } });
        yield put({
          type: 'getChapterList', query: { id: data[1]._id },
        });
      }
    },
    *getChapterList({ query }, { call, put, select }) {
      const { bookReader } = yield select();
      const current = bookReader.current || 0;
      const { data } = yield call(bookReaderService.getChapterList, { query });
      if (data) {
        yield put({ type: 'save', payload: { chapterList: data } });
        yield put({
          type: 'getChapter', query: { link: data.chapters[current].link },
        });
      }
    },
    *getChapter({ query }, { call, put }) {
      const { data } = yield call(bookReaderService.getChapter, { query });
      if (data.ok) {
        yield put({ type: 'save', payload: { chapter: data.chapter } });
      }
    },
    *changeChapter({ payload }, { call, put, select }) {
      const { bookReader } = yield select();
      const list = bookReader.chapterList.chapters;
      let current = bookReader.current;
      switch (payload.type) {
        case 'next':
          if (current === list.length) {
            swal('已经是最后一章了!');
            return;
          } else {
            current += 1;
          }
          break;
        case 'prev':
          if (current === 0) {
            swal('已经是第一章了！');
            return;
          } else {
            current -= 1;
          }
          break;
        case 'goto':
          if (current === payload.obj) {
            return;
          } else if (payload.obj > list.length || payload.obj < 0) {
            swal('喂喂，你想去哪啊，没有这章啦！');
          } else {
            current = payload.obj;
          }
          break;
        default:
          break;

      }
      window.document.body.scrollTop = 0;
      yield put({
        type: 'save',
        payload: { current },
      });
      yield put({
        type: 'getChapter', query: { link: list[current].link },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/reader') {
          dispatch({ type: 'getSource', query });
        }
      });
    },
  },
};
