import { takeEvery } from 'redux-saga';

function test() {
  console.log('9999999999999999');
}

export default function* watchEffects() {
  yield* takeEvery('test', test);
}
