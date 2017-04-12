import request from '../utils/request';
import { urlEncode } from '../utils/common.js';

export function getList({ query }) {
  const params = urlEncode(query);
  return request(`/api/book/fuzzy-search?${params}`);
}

export function getDetail({ query }) {
  return request(`/api/book/${query.id}`);
}
