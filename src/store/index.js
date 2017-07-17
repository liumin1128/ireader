import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import effects from './effects';

const saga = createSagaMiddleware();

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      saga,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : applyMiddleware(),
  ),
);

saga.run(effects);

store.dispatch({ type: 'test' });

export default store;
