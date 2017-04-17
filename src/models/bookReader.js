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
    book: {
      currentChapter: 0,
      currentSource: 0,
    },
    status: 'loading',
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *initReader({}, { call, put }) {
      // 初始化阅读器,检查是否存在自定义主题
      const theme = yield call(bookReaderService.getTheme);
      if (theme) {
        yield put({ type: 'save', payload: { theme } });
      }
    },
    *getSource({ query }, { call, put }) {
      yield put({ type: 'save', payload: { status: 'loading' } });
      // 从本地书架获取书籍信息
      const book = yield call(bookShelfService.getBookById, { query });
      // 如果书籍不在书架中,则需要先加入书架再阅读
      if (!book) { yield put({ type: 'bookShelf/putAndRead', payload: query }); return; }

      // 初始化书源，书源编号
      let bookSource;
      let currentSource = 0;

      // 已在书架中，但没有书源，从服务器获取书源
      if (!book.bookSource || book.bookSource.length === 0) {
        const { data } = yield call(bookReaderService.getSource, { query });
        bookSource = data;
        // 更新书籍信息
        book.bookSource = data;
        book.currentSource = currentSource;
        // 将更新后的书籍信息存好
        yield call(bookShelfService.save, { payload: { ...book } });
      } else {
        // 本地有数据，直接加载
        bookSource = book.bookSource;
        // 如果用户选择了某个源
        if (book.currentSource) { currentSource = book.currentSource; }
      }

      if (bookSource) {
        // 将书源，以及书籍信息保存到redux中
        yield put({ type: 'save', payload: { bookSource, book } });
        yield put({ type: 'getChapterList', query: { id: bookSource[currentSource]._id } });
      } else {
        // 获取超时，刷新页面重试
        swal({
          title: '获取源失败',
          text: '换源服务器不稳定，偶尔会出现这种情况，刷新页面重试？还是要再换个源？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '再试一次！',
          cancelButtonText: '换源',
          closeOnConfirm: false,
        },
        () => {
          window.location.reload();
        });
      }
    },
    *getChapterList({ query }, { call, put, select }) {
      const { bookReader } = yield select();
      const book = bookReader.book;
      const currentChapter = book.currentChapter || 0;
      let chapterList;

      /**
       * 这里判断是否存在本地章节列表
       * 检查本地章节列表是否与书籍匹配
       * 检查用户是否已经快要阅读到最新章节
       * 如果以上条件全部满足，则加载本地章节列表，否则更新
       */

      if (!book.chapterList || book.chapterList._id !== query.id || book.chapterList.chapters.length - book.currentChapter < 10) {
        // 本地没有最新的章节列表，从服务端加载
        const { data } = yield call(bookReaderService.getChapterList, { query });
        chapterList = data;
        // 更新章节列表到本地书架
        book.chapterList = data;
        yield call(bookShelfService.save, { payload: { ...book } });
      } else {
        // 本地有章节列表，直接读取
        chapterList = book.chapterList;
      }

      if (chapterList) {
        yield put({ type: 'save', payload: { chapterList } });
        yield put({
          type: 'getChapter', query: { link: chapterList.chapters[currentChapter].link },
        });
      } else {
        swal({
          title: '获取章节列表失败',
          text: '换源服务器不稳定，偶尔会出现这种情况，刷新页面重试？还是要再换个源？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '再试一次！',
          cancelButtonText: '换源',
          closeOnConfirm: false,
        },
        () => {
          window.location.reload();
        });
      }
    },
    *getChapter({ query }, { call, put }) {
      const { data } = yield call(bookReaderService.getChapter, { query });
      if (data) {
        yield put({ type: 'save', payload: { chapter: formatChapter(data.chapter), status: 'success' } });
      } else {
        swal({
          title: '获取章节失败',
          text: '换源服务器不稳定，偶尔会出现这种情况，刷新页面重试？还是要再换个源？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '换源！',
          cancelButtonText: '刷新',
          // closeOnConfirm: false,
        },
        (isConfirm) => {
          if (isConfirm) {
            window.history.forward();
          } else {
            window.location.reload();
          }
        });
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
      yield put({ type: 'save', payload: { status: 'loading' } });
      const { bookReader } = yield select();
      // 获取当前书籍信息
      // 获取当前源信息
      const book = bookReader.book;
      const list = bookReader.bookSource;

      // 初始化源编号
      let currentSource = book.currentSource || 0;
      currentSource = parseInt(payload.index, 0);

      // 换源可能导致页面刷新，将滚动条置顶
      window.document.body.scrollTop = 0;

      // 保存源编号
      book.currentSource = currentSource;

      // 保存书籍信息到本地
      yield call(bookShelfService.save, { payload: { ...book } });

      // 保存书籍信息到redux
      yield put({
        type: 'save',
        payload: { book },
      });

      // 切换源，并重新获取章节列表
      yield put({
        type: 'getChapterList', query: { id: list[currentSource]._id },
      });

      // 将跳转回阅读页
      window.history.back();
    },
    *setTheme({ payload }, { call, put, select }) {
      const { bookReader } = yield select();
      const theme = { ...bookReader.theme, ...payload };
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
