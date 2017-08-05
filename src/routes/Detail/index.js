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
    this.props.dispatch({
      type: 'reader/getDetail',
      query: this.props.match.params,
    });
  }
  render() {
    const { detail = {} } = this.props;
    return (<div>
      <img src={detail.cover} alt="" />
      <h3>{detail.title}</h3>
      <a>加入书架</a>
      <a onClick={this.readNow.bind(this, detail._id)}>立即阅读</a>
    </div>);
  }
}

function mapStateToProps(state, history) {
  const id = history.match.params.id;
  const { [id]: current = {} } = state.reader;
  const { detail } = current;
  return {
    detail,
  };
}

export default connect(mapStateToProps)(Search);
