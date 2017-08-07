import React from 'react';
import styles from './Current.less';
import SearchIcon from './search.svg';

export default ({ _id, cover, title, lastChapter, author, history }) => {
  function goToDetail() {
    history.push(`/reader/${_id}`);
  }
  function search() {
    history.push('/search');
  }
  return (<div
    className={styles.book}
  >
    <div className={styles.wrap}>
      <h1 className={styles.title}>
        iReader
        <div className={styles.search} onClick={search}>
          <img className={styles.icon} src={SearchIcon} alt="" />
          搜书
        </div>
      </h1>


      <img className={styles.bg} src={cover} alt="" />
      <div onClick={goToDetail}>
        <img className={styles.cover} src={cover} alt="" />
        <div className={styles.info}>
          <h5>{title}</h5>
          <p>{author}</p>
          <p className={styles.laset}>最新章节：{lastChapter}</p>
        </div>
      </div>
    </div>
  </div>);
};
