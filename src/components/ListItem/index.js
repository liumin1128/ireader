import React from 'react';
import styles from './index.less';

import GaussianBlur from '../GaussianBlur';

export default ({ _id, cover, title, lastChapter, author, history }) => {
  function goToDetail() {
    history.push(`/reader/${_id}`);
  }
  return (<GaussianBlur src={cover}><div
    className={styles.book}
    onClick={goToDetail}
  >
    <div >
      <img className={styles.cover} src={cover} alt="" />
      <div className={styles.info}>
        <h5>{title}</h5>
        <p>{author}</p>
        <p className={styles.laset}>最新章节：{lastChapter}</p>
      </div>
    </div>
  </div></GaussianBlur>);
};
