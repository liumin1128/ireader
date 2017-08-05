import React, { Component } from 'react';
import { connect } from 'react-redux';

import Head from './Head';
import Content from './Content';

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
  }
  componentWillMount() {
    // this.props.dispatch({
    //   type: 'reader/getchapter',
    //   query: this.props.match.params,
    // });
  }
  render() {
    const { chapter = {} } = this.props;
    return (<div>
      <Head />
      { chapter.title || '未获取到章节' }
      <Content content={chapter.body} />
      <a onClick={this.prev}>上一章</a>
      <a onClick={this.next}>下一章</a>
    </div>);
  }
}

function mapStateToProps(state) {
  const { chapter, currentChapter } = state.reader;
  return {
    chapter,
    currentChapter,
  };
}

export default connect(mapStateToProps)(Search);
