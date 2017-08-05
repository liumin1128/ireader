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
import Index from './routes/Index';
import Search from './routes/Search';
import Detail from './routes/Detail';
import store from './store';

// 模板，套路
const RouterConfig = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/search" exact component={Search} />
        <Route path="/book/:id" exact component={Detail} />
      </div>
    </Router>
  </Provider>
);

export default RouterConfig;
