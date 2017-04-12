import * as bookDetailService from '../services/bookDetail.js';

export default {
  namespace: 'bookDetail',
  state: {
    detail: {},
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getDetail({ query }, { call, put }) {
      const { data } = yield call(bookDetailService.getDetail, { query });
      if (data) {
        yield put({ type: 'save', payload: { detail: data } });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/book') {
          dispatch({ type: 'getDetail', query });
        }
      });
    },
  },
};
