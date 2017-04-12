import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Bookstore from "./routes/Bookstore.js";

import Book from "./routes/Book.js";

import Reader from "./routes/Reader.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/bookstore" component={Bookstore} />
      <Route path="/book" component={Book} />
      <Route path="/reader" component={Reader} />
    </Router>
  );
}

export default RouterConfig;
