import React from 'react';
import { routerRedux } from 'dva/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import styles from './Detail.less';
import { getRandomColor } from '../../utils/common.js';
import Back from '../../components/Layout/Back';
import Loading from '../../components/Layout/Loading';

function Detail({ dispatch, detail, loading }) {
  function gotoUrl(id) {
    dispatch(routerRedux.push({
      pathname: '/reader',
      query: { id },
    }));
  }
  function putBookShelf() {
    dispatch({
      type: 'bookShelf/put',
      payload: {
        id: detail._id,
        cover: detail.cover,
        title: detail.title,
      },
    });
  }
  return (
    <div>
      <AppBar
        // title={`${loading ? '' : detail.title}`}
        style={!loading ? { background: 'none' } : { fontSize: 16 }}
        titleStyle={{ textAlign: 'center' }}
        zDepth={0}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        iconElementLeft={<Back />}
      />
      <div style={{ display: loading ? 'none' : 'block', marginBottom: 100 }}>
        <div className={styles.header}>
          <div className={styles.bg} style={{ backgroundImage: `url(${detail.cover})` }} />

          <div className={styles.box}>
            <img className={styles.cover} src={detail.cover} alt="" />
            <h1 className={styles.title}>{detail.title}</h1>
            <p>
              <span className={styles.author}>{detail.author} </span>
              <span className={styles.cat}> {detail.cat}</span>
            </p>
            <p>
              <span>{detail.isSerial ? '连载中' : '已完结'} </span>
              <span className={styles.wordCount}>
                {detail.wordCount > 10000 ? `${parseInt(detail.wordCount / 10000, 0)}万` : detail.wordCount}字
              </span>
            </p>
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.num}>{detail.latelyFollower} 位小伙伴正在一起追这本书</p>

          <p className={styles.longIntro}>{detail.longIntro}</p>

          <div className={styles.tags}>
            {
                detail.tags && detail.tags.map(i =>
                  <span style={{ background: getRandomColor() }} key={i}>
                    {i}
                  </span>)
              }
          </div>

        </div>
        <div className={styles.chapter}>
          最新 {detail.lastChapter}
          <div className={styles.right}>
            <IconButton tooltip="SVG Icon">
              <ActionHome />
            </IconButton>
          </div>
        </div>
        <div className={styles.foot}>
          <RaisedButton onClick={putBookShelf} style={{ width: '45%', borderRadius: 0 }} label="追更" />
          <RaisedButton onClick={gotoUrl.bind(this, detail._id)} style={{ width: '45%', borderRadius: 0 }} label="开始阅读" primary />
        </div>
      </div>
      <Loading loading={loading} />
    </div>
  );
}

export default Detail;
