import * as bookShelfService from '../services/bookShelf.js';

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
