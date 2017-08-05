import React from 'react';
import styles from './Loading.less';

export default ({ logs }) => (<div className={styles.loading}>
  <p>正在初始化...</p>
  {logs.map(i => (<p>
    {i.msg}
  </p>))}
</div>);
