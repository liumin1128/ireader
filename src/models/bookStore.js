import * as bookStoreService from '../services/bookStore.js';

export default {
  namespace: 'bookStore',
  state: {
    list: [],
  },
  reducers: {
    save(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: {
    effects: {
      *fetch({ query }, { call, put }) {
        console.log(query);
        const { data } = yield call(bookStoreService.fetch, { page });
        yield put({ type: 'save', payload: { data } });
      },
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/bookstore') {
          dispatch({ type: 'fetch', query });
        }
      });
    },
  },
};
