import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from '../../components/SearchBar';

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
  }
  componentWillMount() {
    console.log(this);
    // this.props.dispatch({
    //   type: 'search/search',
    // });
  }
  render() {
    const { list } = this.props;
    return (<div>
      <SearchBar onSubmit={this.search} />
      {list.length}
      {
        list.map(i => (<div key={i._id}>
          <h3>{i.title}</h3>
        </div>))
      }
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
