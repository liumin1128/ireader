import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import styles from './IndexPage.less';

function IndexPage({ dispatch }) {
  function gotoUrl() {
    dispatch(routerRedux.push({
      pathname: '/bookstore',
    }));
  }
  return (
    <div className={styles.title}>
      <AppBar
        title="iReader"
        iconElementRight={
          <IconButton>
            <ActionSearch onClick={gotoUrl} />
          </IconButton>
        }
        titleStyle={{ textAlign: 'center' }}
      />
      index
    </div>
  );
}

function mapStateToProps(state) {
  const { list } = state.bookStore;
  return {
    loading: state.loading.models.bookStore,
    list,
  };
}

export default connect(mapStateToProps)(IndexPage);

