import React from 'react';
import {
  BrowserRouter as Router,
  Route,   // 这是基本的路由块
  // Link,    // 这是a标签/
  // Switch,   // 这是监听空路由的
  // Redirect, // 这是重定向
  // Prompt,   // 防止转换
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import blue from 'material-ui/colors/blue';
import Index from './routes/Index';
import Search from './routes/Search';
import store from './store';

console.log(blue);

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue, // blue and green play nicely together.
  }),
});

// 模板，套路
const RouterConfig = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Route path="/" exact component={Index} />
          <Route path="/search" exact component={Search} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

export default RouterConfig;
