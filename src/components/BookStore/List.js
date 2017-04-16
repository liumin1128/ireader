import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { routerRedux } from 'dva/router';
import { goToUrl } from '../../utils/common.js';

import styles from './List.less';

function List({ dispatch, list }) {
  function gotoUrl(pathname, id) {
    dispatch(routerRedux.push({
      pathname,
      query: { id },
    }));
  }
  function read(id) {
    dispatch({
      type: 'bookShelf/putAndRead',
      payload: { id },
    });
  }
  return (
    <div className={styles.list}>
      {list.map(i =>

        <Card key={i._id} style={{ margin: '16px 0', position: 'relative', borderRadius: 0, minHeight: 121 }}>
          <img className={styles.cover} src={i.cover} alt={i.title} onClick={gotoUrl.bind(this, '/book', i._id)} />
          <CardHeader
            title={i.title}
            subtitle={`${i.cat} | ${i.author}`}
            style={{ marginLeft: 88, paddingRight: 0 }}
            showExpandableButton
            actAsExpander
          />
          <p className={styles.foot}>
            <span>{i.latelyFollower}在追</span>
            {i.latelyFollower > 1000 ? <span> | {i.retentionRatio}% 读者存留</span> : null}
          </p>
          <CardText expandable style={{ color: '#515151', transition: '1s', marginTop: 16, paddingBottom: 0 }}>
            {i.shortIntro}
            <CardActions style={{ paddingRight: 0, display: 'flex', justifyContent: 'flex-end' }}>
              <RaisedButton label="查看详情" onClick={gotoUrl.bind(this, '/book', i._id)} primary />
              <RaisedButton label="立即阅读" onClick={read.bind(this, i._id)} secondary style={{ marginRight: 0, marginLeft: 8 }} />
            </CardActions>
          </CardText>
        </Card>,
      )}
    </div>
  );
}

export default List;
