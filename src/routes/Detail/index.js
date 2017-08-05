import React, { Component } from 'react';
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.readNow = () => {
      this.props.dispatch({
        type: 'reader/getSource',
        query: this.props.match.params,
      });
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'reader/getDetail',
      query: this.props.match.params,
    });
  }
  render() {
    const { detail } = this.props;
    return (<div>
      <img src={detail.cover} alt="" />
      <h3>{detail.title}</h3>
      <a>加入书架</a>
      <a onClick={this.readNow}>立即阅读</a>
    </div>);
  }
}

function mapStateToProps(state) {
  const { detail } = state.reader;
  return {
    detail,
  };
}

export default connect(mapStateToProps)(Search);
