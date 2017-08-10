import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from './Head';
import Content from './Content';
import Loading from './Loading';

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
    const { chapter = {}, detail = {}, logs = [], history } = this.props;
    return (<div style={{ background: '#FAF9DE', color: 'rgba(0, 0,0, 0.7)' }}>
      {
        chapter.title ? <div>
          <Head title={chapter.title} bookName={detail.title} history={history} />
          <Content content={chapter.body} />
          <div style={{
            padding: 20,
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 10,
            borderTop: '1px dashed rgba(0, 0,0, 0.1)',
          }}
          >
            <a onClick={this.prev}>设置</a>
            <a onClick={this.goToChapters}>章节列表</a>
            <a onClick={this.prev}>上一章</a>
            <a onClick={this.next}>下一章</a>
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
  };
}

export default connect(mapStateToProps)(Search);
