import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Bookstore.less';
import List from '../components/BookStore/List';

class Bookstore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }
  search = () => {
    const query = this.queryInput.input.value;
    console.log(query);
    if (query) {
      this.props.dispatch(routerRedux.push({
        pathname: '/bookstore',
        query: {
          query,
        },
      }));
    }
  }
  back = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/',
    }));
  }
  render() {
    const { list, dispatch } = this.props;
    return (
      <div className={styles.normal}>
        <AppBar
          title="搜索"
          titleStyle={{ textAlign: 'center' }}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={<IconButton />}
          onLeftIconButtonTouchTap={this.back}
        />
        <div className={styles.search}>
          <TextField
            ref={(c) => { this.queryInput = c; }}
            style={{ width: '100%', height: 60 }}
            hintText="按书名，作者来搜索"
          />
          <RaisedButton label="搜索" primary onTouchTap={this.search} />
        </div>
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
