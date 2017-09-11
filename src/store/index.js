import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
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
    autoRehydrate(),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : applyMiddleware(),
  ),
);

console.log('store');
console.log(store);

persistStore(store, { whitelist: ['store', 'reader', 'setting'] });


saga.run(effects);

// store.dispatch({ type: 'getSource' });

export default store;
