// 处理书籍列表，这里仅将封面转换为真实url
export const formatBookList = (data) => {
  return data.map((i) => {
    return {
      ...i,
      cover: i.cover.replace(/\/agent\//, ''),
    };
  });
};
