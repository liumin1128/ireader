import React from 'react';
import styles from './BookShelf.less';

function BookShelf({ list }) {
  return (
    <div className={styles.normal}>
      {
        list && list.map(i => <div className={styles.item} key={i.id}>
          <img className={styles.cover} src={i.cover} alt="" />
        </div>)
      }
    </div>
  );
}

export default BookShelf;
