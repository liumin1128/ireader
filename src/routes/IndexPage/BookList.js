import React from 'react';
import styles from './BookList.less';

import GaussianBlur from '../../components/GaussianBlur';

export default ({ list = [], history }) => {
  function goToDetail(id) {
    history.push(`/reader/${id}`);
  }
  return (
    <GaussianBlur src={list[0] && (list[0].cover || list[1].cover)}>
      <div className={styles.books}>
        {
          list.map(({ title, _id, cover }) => (
            <div className={styles.book} onClick={goToDetail.bind(this, _id)}>
              <img src={cover} alt="" />
              <p>{title}</p>
            </div>))
        }
      </div>
      {list.length === 2 && <div className={styles.books} />}
    </GaussianBlur>);
};
