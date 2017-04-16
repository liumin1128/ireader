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
      console.log(data);
      if (data.ok) {
        yield put({ type: 'save', payload: { list: formatBookList(data.books) } });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/bookstore') {
          console.log(query.query);
          if (query.query) {
            console.log('检测到参数，正在搜索');
            dispatch({ type: 'getList', query });
          }
        }
      });
    },
  },
};
