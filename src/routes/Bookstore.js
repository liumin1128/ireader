import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import styles from './Bookstore.less';
import List from '../components/BookStore/List';
import Back from '../components/Layout/Back.js';
import Loading from '../components/Layout/Loading.js';

class Bookstore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }
  search = () => {
    const query = this.queryInput.input.value;
    if (query) {
      this.props.dispatch(routerRedux.push({
        pathname: '/bookstore',
        query: {
          query,
        },
      }));
    }
  }
  render() {
    const { list, dispatch, loading } = this.props;
    return (
      <div className={styles.normal}>
        <AppBar
          title="搜索"
          titleStyle={{ textAlign: 'center' }}
          iconElementLeft={<Back />}
          iconElementRight={<IconButton />}
        />
        <div className={styles.search}>
          <TextField
            ref={(c) => { this.queryInput = c; }}
            style={{ width: '100%', height: 60 }}
            hintText="按书名，作者来搜索"
          />
          <IconButton onTouchTap={this.search}>
            <SearchIcon color="rgb(0, 188, 212)" />
          </IconButton>
        </div>
        <Loading loading={loading} />

        <List list={list} dispatch={dispatch} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list } = state.bookStore;
  return {
    loading: state.loading.models.bookStore,
    list,
  };
}

export default connect(mapStateToProps)(Bookstore);
