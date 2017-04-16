import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

function Loading({ loading }) {
  return (
    <div style={{ position: 'relative', width: 40, height: 40, margin: '100px auto', display: loading ? 'block' : 'none' }}>
      <RefreshIndicator
        size={40}
        left={0}
        top={0}
        status="loading"
      />
    </div>
  );
}

export default Loading;
