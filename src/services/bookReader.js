import request from '../utils/request';

export function getSource({ query }) {
  return request(`/api/toc?view=summary&book=${query.id}`);
}

export function getChapterList({ query }) {
  return request(`/api/toc/${query.id}?view=chapters`);
}

export function getChapter({ query }) {
  return request(`/chapter/${query.link}?k=2124b73d7e2e1945&t=1468223717`);
}
