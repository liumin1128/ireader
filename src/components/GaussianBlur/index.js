import React from 'react';
import styles from './style.less';

export default ({ children, src }) => (<div className={styles.gaussian}>
  {children}
  <div style={{ backgroundImage: `url(${src})` }} className={styles.bg} />
</div>);
