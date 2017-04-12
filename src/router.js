import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Bookstore from './routes/Bookstore.js';

import Book from './routes/Book.js';

import Reader from './routes/Reader.js';

import MainLayout from './components/Layout/Main';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={IndexPage} />
        <Route path="/bookstore" component={Bookstore} />
        <Route path="/book" component={Book} />
        <Route path="/reader" component={Reader} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
