import React from 'react';

export default ({ title, cover }) => (<div>
  {title}
  <img src={cover.substring(7)} alt="" />
</div>);
