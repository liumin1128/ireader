import React from 'react';
import styles from './index.less';
import Plus from './plus.svg';

export default () => (<div className={styles.button}>
  <img className={styles.icon} src={Plus} alt="" />
</div>);
