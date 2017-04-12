import React from 'react';
import { connect } from 'dva';
import styles from './Bookstore.css';

function Bookstore() {
  return (
    <div className={styles.normal}>
      Route Component: Bookstore
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Bookstore);
