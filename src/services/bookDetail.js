import request from '../utils/request';

export function getDetail({ query }) {
  return request(`/api/book/${query.id}`);
}
