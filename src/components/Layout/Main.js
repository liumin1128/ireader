import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function Main({ children }) {
  return (
    <MuiThemeProvider>
      {children}
    </MuiThemeProvider>
  );
}

export default Main;
