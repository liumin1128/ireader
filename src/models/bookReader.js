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
      console.log('获取书源');
      console.log(query);
      let bookSource;
      if (!book.bookSource || book.bookSource.length === 0) {
        console.log('本地无书源，从服务器加载');
        const { data } = yield call(bookReaderService.getSource, { query });
        bookSource = data;
        book.bookSource = data;
        console.log('新的书籍信息');
        console.log(book);
        console.log('将书籍信息存好');
        yield call(bookShelfService.save, { payload: { ...book } });
      } else {
        console.log('本地有数据，直接加载');
        bookSource = book.bookSource;
      }
      console.log('书源');
      console.log(bookSource);
      if (bookSource) {
        yield put({ type: 'save', payload: { bookSource, book } });
        console.log('确认当前使用的是几号书源');
        const currentSource = book.currentSource || 0;
        console.log(currentSource);
        yield put({ type: 'getChapterList', query: { id: bookSource[currentSource]._id } });
      } else {
        console.log('获取源失败，正在重试！');
        window.location.reload();
      }
    },
    *getChapterList({ query }, { call, put, select }) {
      console.log('章节列表参数');
      console.log(query);
      const { bookReader } = yield select();
      const currentChapter = bookReader.book.currentChapter || 0;
      const book = bookReader.book;
      let chapterList;
        // 这里判断一下是否存在本地章节列表，
        // 本地章节列表是否与书籍匹配，
        // 章节列表长度是否异常，
        //
      console.log('本地章节列表');
      console.log(book);
      console.log('查询参数');
      console.log(query.id);
      if (!book.chapterList || book.chapterList._id !== query.id || book.currentChapter === book.chapterList.chapters.length) {
        console.log('本地没有最新的章节列表，从服务端加载');
        const { data } = yield call(bookReaderService.getChapterList, { query });
        console.log(data);
        chapterList = data;
        book.chapterList = data;
        console.log('将书章节列表存好');
        yield call(bookShelfService.save, { payload: { ...book } });
      } else {
        console.log('本地有章节列表，直接读取');
        chapterList = book.chapterList;
      }
      console.log('章节列表');
      console.log(chapterList);
      if (chapterList) {
        yield put({ type: 'save', payload: { chapterList } });
        yield put({
          type: 'getChapter', query: { link: chapterList.chapters[currentChapter].link },
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
      let currentChapter = book.currentChapter || 0;
      switch (payload.type) {
        case 'next':
          if (currentChapter === list.length) {
            swal('已经是最后一章了!');
            return;
          } else {
            currentChapter += 1;
          }
          break;
        case 'prev':
          if (currentChapter === 0) {
            swal('已经是第一章了！');
            return;
          } else {
            currentChapter -= 1;
          }
          break;
        case 'goto':
          if (currentChapter === payload.obj) {
            return;
          } else if (payload.obj > list.length || payload.obj < 0) {
            swal('喂喂，你想去哪啊，没有这章啦！');
          } else {
            currentChapter = payload.obj;
          }
          break;
        default:
          break;

      }
      window.document.body.scrollTop = 0;
      book.currentChapter = currentChapter;
      yield call(bookShelfService.save, { payload: { ...book } });
      yield put({
        type: 'save',
        payload: { book },
      });
      yield put({
        type: 'getChapter', query: { link: list[currentChapter].link },
      });
    },
    *changeSource({ payload }, { call, put, select }) {
      console.log(payload);
      yield put({ type: 'save', payload: { status: 'loading' } });
      const { bookReader } = yield select();
      const book = bookReader.book;
      const list = bookReader.bookSource;
      let currentSource = book.currentSource || 0;
      currentSource = parseInt(payload.index, 0);
      window.document.body.scrollTop = 0;
      book.currentSource = currentSource;
      console.log(book);
      yield call(bookShelfService.save, { payload: { ...book } });
      yield put({
        type: 'save',
        payload: { book },
      });
      console.log(list);
      yield put({
        type: 'getChapterList', query: { id: list[currentSource]._id },
      });
      window.history.back();
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
