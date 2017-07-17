import React from 'react';
import { connect } from 'react-redux';

import './style.css';
// import './Index.less';

import styles from './Index.less';

const Index = () => (<div>
  <h1 className={styles.test}>I9ex1</h1>
</div>);

function mapStateToProps(state) {
  const { title } = state.common;
  console.log('title');
  console.log(title);
  return {
    title,
  };
}

export default connect(mapStateToProps)(Index);
