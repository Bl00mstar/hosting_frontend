export const dateConverter = (value) => {
  let convDate = new Date(value).toLocaleString().split(',');
  let date = convDate[1] + ' ' + convDate[0];
  return date;
};
