import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from './Head';
import Content from './Content';
import Loading from './Loading';
import Setting from './Setting';

import styles from './index.less';

class Search extends Component {
  constructor(props) {
    super(props);
    this.readNow = (id) => {
      this.props.dispatch({
        type: 'reader/getSource',
        query: { id },
      });
    };
    this.next = () => {
      this.goToChapter(this.props.currentChapter + 1);
    };
    this.prev = () => {
      this.goToChapter(this.props.currentChapter - 1);
    };
    this.goToChapter = (nextChapter) => {
      this.props.dispatch({
        type: 'reader/goToChapter',
        payload: { nextChapter },
      });
    };
    this.goToChapters = () => {
      this.props.history.push('/cps');
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'reader/getSource',
      query: this.props.match.params,
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const {
      chapter = {},
      detail = {},
      logs = [],
      color = {},
      style,
      mode,
      history,
      dispatch,
    } = this.props;
    return (<div className={styles.reader} style={color}>
      {
        chapter.title ? <div>
          <Head title={chapter.title} bookName={detail.title} history={history} color={color} />
          <Content style={style} content={chapter.body} />

          <div style={{
            padding: 20,
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 10,
            borderTop: '1px dashed rgba(0, 0,0, 0.1)',
          }}
          >
            <Setting
              mode={mode}
              style={style}
              dispatch={dispatch}
            >
              <span>设置</span>
            </Setting>
            <span onClick={this.goToChapters}>章节列表</span>
            <span onClick={this.prev}>上一章</span>
            <span onClick={this.next}>下一章</span>
          </div>

        </div> : <Loading logs={logs} />

      }

    </div>);
  }
}

function mapStateToProps(state) {
  const { chapter, currentChapter = 0, detail } = state.reader;
  const { logs } = state.common;
  return {
    logs,
    chapter,
    detail,
    currentChapter,
    ...state.setting,
  };
}

export default connect(mapStateToProps)(Search);
