import React from 'react';
import styles from './Loading.less';

function Loading({ theme }) {
  return (
    <div className={styles.normal} style={{ background: theme.background || '#fff' }}>
      <span style={{ color: theme.color || 'rgba(0,0,0,0.7)' }}>加载中...</span>
    </div>
  );
}

export default Loading;
