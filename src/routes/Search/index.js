import React from 'react';
import Button from 'material-ui/Button';
import Input from '../components/InputWith';

export default function () {
  function search(val) {
    console.log(val);
  }
  return (<div>
    <Button>
      Hello World
    </Button>
    <Input onAction={search} />
  </div>);
}
