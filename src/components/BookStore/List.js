import React from 'react';
import { routerRedux } from 'dva/router';

import styles from './List.less';

function List({ dispatch, list }) {
  function gotoUrl(id) {
    dispatch(routerRedux.push({
      pathname: '/book',
      query: { id },
    }));
  }
  return (
    <div className={styles.list}>
      {list.map(i => <div
        onClick={gotoUrl.bind(this, i._id)}
        className={styles.item} key={i._id}
      >
        <img className={styles.cover} src={i.cover} alt="" />
        <div>
          <h3>{i.title}</h3>
          <p className={styles.info}>
            <span>{i.cat}</span> | <span>{i.author}</span>
          </p>
          <p>{i.shortIntro}</p>
          <p className="foot">
            <span>{i.latelyFollower}在追</span>
            {i.latelyFollower > 1000 ? <span> | {i.retentionRatio}% 读者存留</span> : null}
          </p>
        </div>
      </div>)}
    </div>
  );
}

export default List;
