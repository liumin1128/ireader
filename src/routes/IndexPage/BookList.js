import React from 'react';

import styles from './BookList.less';

import Touch from '../../components/Touch';

export default ({ list = [], history }) => {
  function goToDetail(id) {
    history.push(`/reader/${id}`);
  }
  function press() {
    console.log('press');
  }
  return (
    <div className={styles.books}>
      {
        list.map(({ title, _id, cover }) => (
          <div className={styles.book}>
            <Touch
              onTap={goToDetail.bind(this, _id)}
              onPress={press}
            >
              <img src={cover} alt="" />
              <p>{title}</p>
            </Touch>
          </div>
        ))
      }
      {list.length === 2 && <div className={styles.book} />}
    </div>
  );
};
