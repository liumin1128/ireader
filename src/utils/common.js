// 对象转url
export const urlEncode = (param) => {
  if (param === null) return '';
  let result = JSON.stringify(param);
  result = result.replace(/{|}|"/g, '');
  result = result.replace(/:/g, '=');
  result = result.replace(/,/g, '&');
  return result;
};

