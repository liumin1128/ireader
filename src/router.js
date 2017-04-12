import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Bookstore from "./routes/Bookstore.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/bookstore" component={Bookstore} />
    </Router>
  );
}

export default RouterConfig;
