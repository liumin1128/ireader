import React from 'react';
import {
  BrowserRouter as Router,
  Route,   // 这是基本的路由块
  Link,    // 这是a标签
  // Switch,   // 这是监听空路由的
  // Redirect, // 这是重定向
  // Prompt,   // 防止转换
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Index from './routes/Index';
import Search from './routes/Search';
import store from './store';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// 模板，套路
const RouterConfig = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <div>
          <ul>
            <li><Link to="/">Index</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
          <Route path="/" exact component={Index} />
          <Route path="/search" exact component={Search} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

export default RouterConfig;
