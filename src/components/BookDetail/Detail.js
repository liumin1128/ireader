import React from 'react';
import { routerRedux } from 'dva/router';
import AppBar from 'material-ui/AppBar';
import { Card, CardHeader } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import styles from './Detail.less';
import { getRandomColor } from '../../utils/common.js';

function Detail({ dispatch, detail }) {
  function gotoUrl(id) {
    dispatch(routerRedux.push({
      pathname: '/reader',
      query: { id },
    }));
  }
  function back() {
    dispatch(routerRedux.push({
      pathname: '/',
    }));
  }
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.bg} style={{ backgroundImage: `url(${detail.cover})` }} />
        <AppBar
          title="Title"
          style={{ background: 'none' }}
          zDepth={0}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={back}
        />
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
        <RaisedButton style={{ width: '45%', borderRadius: 0 }} label="追更" />
        <RaisedButton onClick={gotoUrl.bind(this, detail._id)} style={{ width: '45%', borderRadius: 0 }} label="开始阅读" primary />
      </div>
    </div>
  );
}

export default Detail;
