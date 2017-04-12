import React, { Component } from 'react';
import { connect } from 'dva';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './Reader.less';
import ReaderComponent from '../components/BookReader/Reader';
import Layout from '../components/BookReader/Layout';

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
    const { dispatch, chapter, chapterList, current, loading } = this.props;
    return (
      <Layout className={styles.normal} dispatch={dispatch} chapterList={chapterList} current={current}>
        {
          loading ? 'loading' : <ReaderComponent dispatch={dispatch} chapter={chapter} loading={loading} />
        }
        <div className={styles.foot}>
          <RaisedButton label="上一章" onClick={this.prev} />
          <RaisedButton label="下一章" onClick={this.next} />
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { chapter, chapterList, current } = state.bookReader;
  return {
    loading: state.loading.models.bookReader,
    chapter,
    chapterList,
    current,
  };
}

export default connect(mapStateToProps)(Reader);
