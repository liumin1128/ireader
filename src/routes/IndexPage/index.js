import React from 'react';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';

import './index.less';
import BookList from './BookList';
import Current from './Current';
// import styles from './Index.less';

const Index = ({ store, current, history }) => (<div>
  <Current {...current} history={history} />
  {chunk(store, 3).map(i => <BookList list={i} history={history} />)}
</div>);

function mapStateToProps(state) {
  const store = Object.keys(state.store).map((id) => {
    return state.store[id].detail || {};
  }).filter((i) => {
    return i._id;
  });
  const { detail: current } = state.reader;
  return {
    store,
    current,
  };
}

export default connect(mapStateToProps)(Index);
