import React from 'react';
import { connect } from 'dva';
import styles from './Book.css';

function Book({ detail }) {
  return (
    <div className={styles.normal}>
      {detail && detail.title}
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
