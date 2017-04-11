import request from '../utils/request';

export function fetch() {
  return request('/book/fuzzy-search?query=凡人修仙传&start=0&limit=10');
}
