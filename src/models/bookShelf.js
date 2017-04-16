import { routerRedux } from 'dva/router';

import * as bookShelfService from '../services/bookShelf.js';
import * as bookDetailService from '../services/bookDetail.js';
import { formatBookDetail } from '../utils/format.js';

export default {
  namespace: 'bookShelf',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *put({ payload }, { call, put }) {
      const data = yield call(bookShelfService.save, { payload });
      yield put({ type: 'save', payload: { list: data } });
    },
    *get({ payload }, { call, put }) {
      let data = yield call(bookShelfService.get);
      if (!data) data = [];
      yield put({ type: 'save', payload: { list: data } });
    },
    *putAndRead({ payload }, { call, put }) {
      const { data } = yield call(bookDetailService.getDetail, { query: payload });
      if (!data) { window.location.reload(); }
      const detail = formatBookDetail(data);
      const newBook = {
        id: detail._id,
        cover: detail.cover,
        title: detail.title,
      };
      const list = yield call(bookShelfService.save, { payload: newBook });
      yield put({ type: 'save', payload: { list } });
      yield put(routerRedux.push({
        pathname: 'reader',
        query: { id: detail._id },
      }));
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'get' });
        }
      });
    },
  },
};
