import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './Detail.less';

function Detail({ dispatch, detail }) {
  function gotoUrl(id) {
    dispatch(routerRedux.push({
      pathname: '/reader',
      query: { id },
    }));
  }
  return (
    <div className={styles.normal}>
      <img src={detail.cover} alt="" />
      <p>
        <span className={styles.author}>{detail.author}</span>
      </p>
      <p className={styles.info}>
        <span className={styles.cat}>{detail.cat}</span>
        <span className={styles.author}>{detail.author}</span>
        <span className={styles.wordCount}>
          {detail.wordCount > 10000 ? `${parseInt(detail.wordCount / 10000, 0)}万` : detail.wordCount}字
        </span>
      </p>
      <p>{detail.longIntro}</p>
      <div className={styles.tags}>
        {
          detail.tags && detail.tags.map(i => <span key={i}>
            {i}
          </span>)
        }
      </div>
      <div>
        追更
      </div>
      <div onClick={gotoUrl.bind(this, detail._id)}>
        开始阅读
      </div>
    </div>
  );
}

export default Detail;
