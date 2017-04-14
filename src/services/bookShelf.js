import db from 'localforage';

export async function save({ payload }) {
  console.log(payload);
  let temp = [payload];
  const data = await db.getItem('bookshelf');
  if (data && data.length > 0) {
    let isInArr = false;
    let arrIndex = 0;
    data.map((i, index) => {
      if (i.id === payload.id) {
        isInArr = true;
        arrIndex = index;
      }
    });
    if (isInArr) {
      console.log(`${payload.title} 已存在列表中，已更新`);
      const temp2 = data;
      temp2.splice(arrIndex, 1);
      temp = temp.concat(temp2);
    } else {
      console.log(`${payload.title} 加入书架`);
      temp = temp.concat(data);
    }
  }
  return db.setItem('bookshelf', temp);
}
export function get() {
//   db.clear();
  return db.getItem('bookshelf');
}

export async function getBookById({ query }) {
  const data = await db.getItem('bookshelf');
  let book;
  data.map((i) => {
    if (query.id === i.id) {
      book = i;
    }
  });
  return book;
}
