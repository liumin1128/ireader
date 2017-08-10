import React from 'react';
import styles from './Content.less';

export default ({ content, style }) => (<div className={styles.content} style={style}>
  { content && content.split('\n').map(i => <p>{i}</p>) }
</div>);
