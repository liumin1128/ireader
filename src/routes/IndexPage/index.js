import React from 'react';
import { connect } from 'react-redux';

import BookList from './BookList';
import Current from './Current';

import styles from './index.less';

import recommend from '../../utils/recommond.js';

const Index = ({ store, current, history, dispatch }) => (<div>
  <Current {...(current._id ? current : recommend[0])} history={history} />
  <BookList list={store} history={history} dispatch={dispatch} />
  <p className={styles.tip}>
    {
      store.length === 0 ? '书架空空如也，点右上角找书哦~' : '点击右上角按钮添加书籍'
    }
    {
      store.length >= 6 && ', 长按可删除书籍~'
    }
  </p>
</div>);

function mapStateToProps(state) {
  const { detail } = state.reader;
  const list = state.store;
  const store = Object.keys(list).map((id) => {
    // 找出书架上所有书籍的详细信息
    return list[id] ? list[id].detail : {};
  }).filter((i) => {
    // 过滤掉异常数据和当前阅读
    return i._id && i._id !== detail._id;
  });
  return {
    store,
    // 如果是一本书都没有，推荐《三体》
    current: detail._id ? detail : recommend,
  };
}

export default connect(mapStateToProps)(Index);
