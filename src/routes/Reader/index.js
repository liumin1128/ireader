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
  }
  componentWillMount() {
    // this.props.dispatch({
    //   type: 'reader/getchapter',
    //   query: this.props.match.params,
    // });
  }
  render() {
    const { chapter = {}, logs = [] } = this.props;
    return (<div>
      {
        chapter.title ? <div>
          <Head history={history} />
          <Content content={chapter.body} />
          <a onClick={this.prev}>上一章</a>
          <a onClick={this.next}>下一章</a>
        </div> : <Loading logs={logs} />
      }

    </div>);
  }
}

function mapStateToProps(state, history) {
  const id = history.match.params.id;
  const { [id]: current = {} } = state.reader;
  const { chapter, currentChapter = 0 } = current;
  const { logs } = state.common;
  return {
    logs,
    chapter,
    currentChapter,
  };
}

export default connect(mapStateToProps)(Search);
