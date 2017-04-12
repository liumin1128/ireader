import request from '../utils/request';
import { urlEncode } from '../utils/common.js';

export function fetch({ query }) {
  const params = urlEncode(query);
  console.log(params);
  return request(`/api/book/fuzzy-search?${params}`);
//   return request('/api/users');
}
