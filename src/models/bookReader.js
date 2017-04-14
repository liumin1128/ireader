import swal from 'sweetalert';
import * as bookReaderService from '../services/bookReader.js';
import { formatChapter } from '../utils/format.js';

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
      console.log(query);
      const { data } = yield call(bookReaderService.getSource, { query });
      console.log('书源');
      console.log(data);
      if (data) {
        yield put({ type: 'save', payload: { bookSource: data } });
        yield put({
          type: 'getChapterList', query: { id: data[0]._id },
        });
      }
    },
    *getChapterList({ query }, { call, put, select }) {
      const { bookReader } = yield select();
      const current = bookReader.current || 0;
      const { data } = yield call(bookReaderService.getChapterList, { query });
      console.log('章节列表');
      console.log(data);
      if (data) {
        yield put({ type: 'save', payload: { chapterList: data } });
        yield put({
          type: 'getChapter', query: { link: data.chapters[current].link },
        });
      }
    },
    *getChapter({ query }, { call, put }) {
      const { data } = yield call(bookReaderService.getChapter, { query });
      console.log('章节');
      console.log(data);
      if (data) {
        yield put({ type: 'save', payload: { chapter: formatChapter(data.chapter) } });
      } else {
        swal('啊哦，本书已下架，换源再试试吧');
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
