import React, { Component } from 'react';
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.readNow = (id) => {
      this.props.history.push(`/reader/${id}`);
      this.props.dispatch({
        type: 'reader/getSource',
        query: { id },
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
    const { chapter } = this.props;
    return (<div>
      { chapter.title }
      <p>{ chapter.body }</p>
    </div>);
  }
}

function mapStateToProps(state) {
  const { chapter } = state.reader;
  return {
    chapter,
  };
}

export default connect(mapStateToProps)(Search);
