import React from 'react';
import { connect } from 'react-redux';

import './index.less';
import BookList from './BookList';
import Current from './Current';

import recommend from '../../utils/recommond.js';
// import styles from './Index.less';

const Index = ({ store, current, history }) => (<div>
  <Current {...(current._id ? current : recommend[0])} history={history} />
  <BookList list={store} history={history} />
</div>);

function mapStateToProps(state) {
  const { detail: current } = state.reader;
  const store = Object.keys(state.store).map((id) => {
    // 找出书架上所有书籍的详细信息
    return state.store[id].detail || {};
  }).filter((i) => {
    // 过滤掉异常数据和当前阅读
    return i._id && i._id !== current._id;
  });
  return {
    store,
    current,
  };
}

export default connect(mapStateToProps)(Index);
