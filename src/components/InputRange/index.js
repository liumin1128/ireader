import React from 'react';
import styles from './index.less';

export default ({ option }) => (<div className={styles.range}>
  <input {...option} type="range" />
</div>);
