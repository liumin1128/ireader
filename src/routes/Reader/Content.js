import React from 'react';
import styles from './Content.less';

export default ({ content }) => (<div className={styles.content}>
  { content && content.split('\n').map(i => <p>{i}</p>) }
</div>);
