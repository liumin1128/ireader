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
    const { dispatch, chapter, chapterList, book, loading, status, theme } = this.props;
    return (
      <div>
        <Layout className={styles.normal} dispatch={dispatch} chapterList={chapterList} book={book} status={status} theme={theme}>
          <ReaderComponent dispatch={dispatch} chapter={chapter} status={status} loading={loading} theme={theme} />
        </Layout>
        <div className={`${styles.foot} ${status === 'loading' && styles.loading}`}>
          <RaisedButton label="上一章" onClick={this.prev} />
          <RaisedButton label="下一章" onClick={this.next} />
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { chapter, chapterList, book, status, theme } = state.bookReader;
  return {
    loading: state.loading.models.bookReader,
    chapter,
    chapterList,
    book,
    status,
    theme,
  };
}

export default connect(mapStateToProps)(Reader);
