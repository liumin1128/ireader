import * as bookReaderService from '../services/bookReader.js';

export default {
  namespace: 'bookReader',
  state: {
    chapter: {},
    chapterList: [],
    bookSource: [],
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
    *getChapterList({ query }, { call, put }) {
      const { data } = yield call(bookReaderService.getChapterList, { query });
      if (data) {
        yield put({ type: 'save', payload: { chapterList: data } });
        yield put({
          type: 'getChapter', query: { link: data.chapters[0].link },
        });
      }
    },
    *getChapter({ query }, { call, put }) {
      const { data } = yield call(bookReaderService.getChapter, { query });
      if (data.ok) {
        yield put({ type: 'save', payload: { chapter: data.chapter } });
      }
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
