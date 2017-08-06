import React from 'react';
import { connect } from 'react-redux';

import './style.css';
// import './Index.less';

// import styles from './Index.less';

const Index = ({ store, current }) => (<div>
  当前阅读：
  <p>{current.title}</p>
  书架存放：
  {
    store && store.map(({ title }) =>
      <p>{title}</p>,
    )
  }
</div>);

function mapStateToProps(state) {
  const store = Object.keys(state.store).map((id) => {
    return state.store[id].detail || {};
  });
  const { detail: current } = state.reader;
  return {
    store,
    current,
  };
}

export default connect(mapStateToProps)(Index);
