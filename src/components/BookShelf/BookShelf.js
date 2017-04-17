import React from 'react';
import { routerRedux } from 'dva/router';
import swal from 'sweetalert';
import Hammer from 'react-hammerjs';
import styles from './BookShelf.less';

function BookShelf({ dispatch, list }) {
  function gotoUrl(id) {
    dispatch(routerRedux.push({
      pathname: '/reader',
      query: { id },
    }));
  }
  function del(id, title) {
    swal({
      title: '从书架移除？',
      text: `删除《${title}》，将会丢失存缓和阅读记录，你确定要这么做吗？`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: '朕不想看了！',
      cancelButtonText: '留着吧',
      closeOnConfirm: false,
    },
    () => {
      dispatch({
        type: 'bookShelf/del',
        payload: { id },
      });
      swal('已删除!', `《${title}》已从您的书架移除~`, 'success');
    });
  }
  return (
    <div className={styles.normal}>
      {
        list && list.map(i =>
          <Hammer
            onClick={gotoUrl.bind(this, i.id)}
            onPress={del.bind(this, i.id, i.title)}
            key={i.id}
          >
            <div className={styles.item}>
              <img className={styles.cover} src={i.cover} alt="" />
              <span className={styles.title}>{i.title}</span>
            </div>
          </Hammer>)
      }
    </div>
  );
}

export default BookShelf;
