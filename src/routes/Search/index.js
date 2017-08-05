import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from '../../components/SearchBar';
import Item from './Item';

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
      this.props.history.push(`/book/${id}`);
    };
  }
  componentWillMount() {
    console.log(this);
    // this.props.dispatch({
    //   type: 'search/search',
    // });
  }
  render() {
    const { list = [] } = this.props;
    return (<div>
      <SearchBar onSubmit={this.search} />
      {
        list.map(i => (<div onClick={this.goToDetail.bind(this, i._id)} key={i._id}>
          <Item {...i} />
        </div>))
      }
    </div>);
  }
}

function mapStateToProps(state) {
  const { list } = state.search;
  return {
    list,
  };
}

export default connect(mapStateToProps)(Search);
