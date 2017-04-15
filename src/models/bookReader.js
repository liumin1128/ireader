import swal from 'sweetalert';
import * as bookReaderService from '../services/bookReader.js';
import * as bookShelfService from '../services/bookShelf.js';

import { formatChapter } from '../utils/format.js';
import { defaultTheme } from '../utils/constant.js';

export default {
  namespace: 'bookReader',
  state: {
    theme: defaultTheme,
    chapter: {},
    chapterList: [],
    bookSource: [],
    book: {},
    status: 'loading',
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *initReader({}, { call, put }) {
      const theme = yield call(bookReaderService.getTheme);
      console.log(theme);
      yield put({ type: 'save', payload: { theme } });
    },
    *getSource({ query }, { call, put }) {
      yield put({ type: 'save', payload: { status: 'loading' } });
      console.log('源参数');
      console.log(query);
      console.log('从书架获取书籍信息');
      const book = yield call(bookShelfService.getBookById, { query });
      console.log(book);
      const { data: bookSource } = yield call(bookReaderService.getSource, { query });
      console.log('书源');
      console.log(bookSource);
      if (bookSource) {
        yield put({ type: 'save', payload: { bookSource, book } });
        yield put({
          type: 'getChapterList', query: { id: bookSource[0]._id },
        });
      } else {
        console.log('获取源失败，正在重试！');
        window.location.reload();
        // yield put({ type: 'getSource', query });
      }
    },
    *getChapterList({ query }, { call, put, select }) {
      const { bookReader } = yield select();
      const current = bookReader.book.current || 0;
      const { data } = yield call(bookReaderService.getChapterList, { query });
      console.log('章节列表');
      console.log(data);
      if (data) {
        yield put({ type: 'save', payload: { chapterList: data } });
        yield put({
          type: 'getChapter', query: { link: data.chapters[current].link },
        });
      } else {
        console.log('未获取到章节列表，正在重试！');
        window.location.reload();
        // yield put({ type: 'getChapterList', query });
      }
    },
    *getChapter({ query }, { call, put }) {
      const { data } = yield call(bookReaderService.getChapter, { query });
      console.log('章节');
      console.log(data);
      if (data) {
        yield put({ type: 'save', payload: { chapter: formatChapter(data.chapter), status: 'success' } });
      } else {
        swal('啊哦，本书已下架，换源再试试吧');
      }
    },
    *changeChapter({ payload }, { call, put, select }) {
      yield put({ type: 'save', payload: { status: 'loading' } });
      const { bookReader } = yield select();
      const list = bookReader.chapterList.chapters;
      const book = bookReader.book;
      let current = book.current || 0;
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
      book.current = current;
      yield call(bookShelfService.save, { payload: { ...book } });
      yield put({
        type: 'save',
        payload: { book },
      });
      yield put({
        type: 'getChapter', query: { link: list[current].link },
      });
    },
    *setTheme({ payload }, { call, put, select }) {
      console.log(payload);
      const { bookReader } = yield select();
      const theme = { ...bookReader.theme, ...payload };
      console.log(theme);
      yield put({ type: 'save', payload: { theme } });
      yield call(bookReaderService.setTheme, { theme });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/reader') {
          dispatch({ type: 'initReader' });
          dispatch({ type: 'getSource', query });
        }
      });
    },
  },
};
