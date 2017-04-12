import React from 'react';
import { connect } from 'dva';
import styles from './Bookstore.css';

function Bookstore({ list, loading }) {
  return (
    <div className={styles.normal}>
      Route Component: Bookstore
    </div>
  );
}

function mapStateToProps(state) {
  const { list } = state.bookStore;
  return {
    loading: state.loading.models.bookStore,
    list,
  };
}

export default connect(mapStateToProps)(Bookstore);
