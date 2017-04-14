import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './BookShelf.less';

function BookShelf({ dispatch, list }) {
  function gotoUrl(id) {
    dispatch(routerRedux.push({
      pathname: '/reader',
      query: { id },
    }));
  }
  return (
    <div className={styles.normal}>
      {
        list && list.map(i => <div onClick={gotoUrl.bind(this, i.id)} className={styles.item} key={i.id}>
          <img className={styles.cover} src={i.cover} alt="" />
          <span className={styles.title}>{i.title}</span>
        </div>)
      }
    </div>
  );
}

export default BookShelf;
