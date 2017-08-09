import React from 'react';
import styles from './BookList.less';

export default ({ list = [], history }) => {
  function goToDetail(id) {
    history.push(`/reader/${id}`);
  }
  return (
    <div className={styles.books}>
      {
          list.map(({ title, _id, cover }) => (
            <div className={styles.book} onClick={goToDetail.bind(this, _id)}>
              <img src={cover} alt="" />
              <p>{title}</p>
            </div>))
        }
      {list.length === 2 && <div className={styles.book} />}
    </div>
  );
};
