import React from 'react';

import SearchBar from '../../components/SearchBar';

export default function () {
  function search(val) {
    console.log(val);
  }
  return (<div>
    <SearchBar onSubmit={search} />
  </div>);
}
