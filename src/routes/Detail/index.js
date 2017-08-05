import React, { Component } from 'react';
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.search = (val) => {
      this.props.history.push(`/search?keyword=${val}`);
      this.props.dispatch({
        type: 'reader/search',
        query: {
          query: val,
        },
      });
    };
    this.goToDetail = (id) => {
      this.props.history.push(`/book?id=${id}`);
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'reader/getDetail',
      query: this.props.match.params,
    });
  }
  render() {
    // const { } = this.props;
    return (<div>
      书籍想
    </div>);
  }
}

function mapStateToProps(state) {
  const { searchList: list } = state.reader;
  return {
    list,
  };
}

export default connect(mapStateToProps)(Search);
