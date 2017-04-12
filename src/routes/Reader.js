import React from 'react';
import { connect } from 'dva';
import styles from './Reader.css';
import ReaderComponent from '../components/BookReader/Reader';

function Reader({ dispatch, chapter, loading }) {
  return (
    <div className={styles.normal}>
      <ReaderComponent dispatch={dispatch} chapter={chapter} loading={loading} />
    </div>
  );
}

function mapStateToProps(state) {
  const { chapter } = state.bookReader;
  return {
    loading: state.loading.models.bookReader,
    chapter,
  };
}

export default connect(mapStateToProps)(Reader);
