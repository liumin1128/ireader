import db from 'localforage';

export async function save({ payload }) {
  let temp = [payload];
  const data = await db.getItem('bookshelf');
  if (data && data.length > 0) {
    let isInArr = false;
    data.map((i) => {
      if (i.id === payload.id) {
        isInArr = true;
      }
    });
    if (isInArr) {
      console.log(`${payload.title} 已存在列表中，无需加入书架`);
      return;
    } else {
      temp = temp.concat(data);
    }
  }
  return db.setItem('bookshelf', temp);
}
export function get() {
//   db.clear();
  return db.getItem('bookshelf');
}

