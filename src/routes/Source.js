import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import LeftIcon from 'material-ui/svg-icons/hardware/keyboard-backspace';
import timeago from 'timeago.js';
import styles from './Source.less';

const timeagoInstance = timeago();

function Source({ dispatch, bookSource }) {
  function changeSource(index) {
    dispatch({
      type: 'bookReader/changeSource',
      payload: { index },
    });
  }
  function back() {
    dispatch(routerRedux.push({
      pathname: '/',
    }));
  }
  return (
    <div className={styles.normal}>
      <AppBar
        title="切换书源"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        iconElementLeft={<IconButton><LeftIcon /></IconButton>}
        onLeftIconButtonTouchTap={back}
      />
      <List>
        {
          bookSource.map((i, index) =>
            <ListItem
              key={i._id}
              primaryText={i.name}
              onClick={changeSource.bind(this, index)}
              secondaryText={`${timeagoInstance.format(i.updated, 'zh_CN')}: ${i.lastChapter}`}
            />,
          )
        }

      </List>

    </div>
  );
}

function mapStateToProps(state) {
  const { bookSource } = state.bookReader;
  return {
    bookSource,
  };
}

export default connect(mapStateToProps)(Source);
