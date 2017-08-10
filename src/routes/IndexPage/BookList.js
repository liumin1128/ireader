import React from 'react';
import swal from 'sweetalert2';

import Touch from '../../components/Touch';
import styles from './BookList.less';

export default ({ list = [], history, dispatch }) => {
  function goToDetail(id) {
    history.push(`/reader/${id}`);
  }
  function press(_id, title) {
    swal({
      title: '确认删除',
      type: 'question',
      text: `从书架移除《${title}》，并清除阅读进度吗？`,
      focusCancel: true,
      showCancelButton: true,
      confirmButtonText: '删除',
      confirmButtonColor: 'red',
      cancelButtonText: '朕点错了而已',
    }).then(() => {
      dispatch({
        type: 'store/delete',
        key: _id,
      });
      swal(
        '已删除！',
        `已从书架移除《${title}》`,
        'success',
      );
    });
  }
  return (
    <div className={styles.books}>
      {
        list.map(({ title, _id, cover }) => (
          <div className={styles.book}>
            <Touch
              onTap={goToDetail.bind(this, _id)}
              onPress={press.bind(this, _id, title)}
            >
              <div className={styles.cover} style={{ backgroundImage: `url(${cover})` }} />
              <p>{title}</p>
            </Touch>
          </div>
        ))
      }
      {(list.length % 3) === 2 && <div className={styles.book} />}
    </div>
  );
};
