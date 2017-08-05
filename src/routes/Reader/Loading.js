import React from 'react';
import styles from './Loading.less';

export default ({ logs }) => (<div className={styles.loading}>
  {logs.map(i => (<p>
    {i.msg}
  </p>))}
</div>);
