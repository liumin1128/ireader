import request from '../utils/request';
import { urlEncode } from '../utils/common.js';

export function fetch({ query }) {
  const params = urlEncode(query);
  return request(`/api/book/fuzzy-search?${params}`);
}
