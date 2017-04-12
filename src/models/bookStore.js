import * as bookStoreService from '../services/bookStore.js';
import { formatBookList } from '../utils/format.js';

export default {
  namespace: 'bookStore',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getList({ query }, { call, put }) {
      const { data } = yield call(bookStoreService.getList, { query });
      if (data.ok) {
        yield put({ type: 'save', payload: { list: formatBookList(data.books) } });
      }
    },
    *getDetail({ query }, { call, put }) {
      const { data } = yield call(bookStoreService.getDetail, { query });
      console.log(data);
      if (data) {
        yield put({ type: 'save', payload: { detail: data } });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/bookstore') {
          dispatch({ type: 'getList', query });
        }
        if (pathname === '/book') {
          dispatch({ type: 'getDetail', query });
        }
      });
    },
  },
};
