import React from 'react';
import styles from './Loading.less';

function Loading({ theme }) {
  return (
    <div className={styles.normal} style={{ background: theme.background || '#fff' }}>
      <span>加载中...</span>
    </div>
  );
}

export default Loading;
