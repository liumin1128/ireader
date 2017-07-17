import React from 'react';
import Input from '../components/InputWith';

export default function () {
  function search(val) {
    console.log(val);
  }
  return (<div>
    <Input onAction={search} />
  </div>);
}
