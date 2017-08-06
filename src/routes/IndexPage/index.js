import React from 'react';
import { connect } from 'react-redux';

import './index.less';
import BookList from './BookList';
import Current from './Current';

// import styles from './Index.less';

const Index = ({ store, current, history }) => (<div>
  <Current {...current} history={history} />
  <BookList list={store} history={history} />
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
