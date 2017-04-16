import React from 'react';
import { connect } from 'dva';
import styles from './Book.css';
import Detail from '../components/BookDetail/Detail';

function Book({ detail, dispatch, loading }) {
  return (
    <div className={styles.normal}>
      <Detail detail={detail} dispatch={dispatch} loading={loading} />
    </div>
  );
}

function mapStateToProps(state) {
  const { detail } = state.bookDetail;
  return {
    loading: state.loading.models.bookDetail,
    detail,
  };
}

export default connect(mapStateToProps)(Book);
