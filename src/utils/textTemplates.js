export const divideText = (string) => {
  let delay_value = 0.3;
  let array = string.split('');
  let newArray = [];
  array.map((el, index) => {
    let data = { id: index, letter: el, delay: delay_value };
    newArray.push(data);
    delay_value = delay_value + 0.1;
    return null;
  });
  return newArray;
};

export const divideParagraph = (paragraphs) => {
  let delay = 1;
  let arr = [];
  paragraphs.map((el, index) => {
    let data = { id: index, text: el, delay: delay };
    arr.push(data);
    delay = delay + 0.2;
    return null;
  });
  return arr;
};

export const letterVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};
