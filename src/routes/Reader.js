import React, { Component } from 'react';
import { connect } from 'dva';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Reader.less';
import ReaderComponent from '../components/BookReader/Reader';

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }
  next = () => {
    this.props.dispatch({
      type: 'bookReader/changeChapter',
      payload: {
        type: 'next',
      },
    });
  }
  prev = () => {
    this.props.dispatch({
      type: 'bookReader/changeChapter',
      payload: {
        type: 'prev',
      },
    });
  }
  render() {
    const { dispatch, chapter, loading } = this.props;
    return (
      <div className={styles.normal}>
        <ReaderComponent dispatch={dispatch} chapter={chapter} loading={loading} />
        <div className={styles.foot}>
          <RaisedButton label="上一章" onClick={this.prev} />
          <RaisedButton label="下一章" onClick={this.next} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { chapter } = state.bookReader;
  return {
    loading: state.loading.models.bookReader,
    chapter,
  };
}

export default connect(mapStateToProps)(Reader);
