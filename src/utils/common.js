import store from '../store';

console.oldLog = console.log;

export function log(str) {
  console.oldLog(str);
  if (typeof (str) === 'string' && store) {
    store.dispatch({
      type: 'common/pushLog',
      payload: {
        log: str,
      },
    });
  }
}
