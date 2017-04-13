// 替换封面为真实地址
const getCover = (cover) => {
  if (cover.indexOf('agent') >= 0) {
    return cover.replace(/\/agent\//, '');
  }
  if (cover.indexOf('cover') >= 0) {
    return `http://statics.zhuishushenqi.com/${cover}`;
  }
  return 'http://rm2.kingreader.com/book/992034%2Fm%2F%5B640%5D_%E6%9A%82%E6%97%A0%E5%B0%81%E9%9D%A2.jpg';
};

// 处理书籍列表，这里仅将封面转换为真实url
export const formatBookList = (data) => {
  return data.map((i) => {
    return {
      ...i,
      cover: getCover(i.cover),
    };
  });
};


// 处理书籍详情，这里仅将封面转换为真实url
export const formatBookDetail = (data) => {
  const i = data;
  return {
    ...i,
    cover: getCover(i.cover),
  };
};
