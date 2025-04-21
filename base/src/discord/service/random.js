export const randomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

export const randomIndexLog = (max, log) => {
  return Math.floor(Math.log((Math.random() * (Math.pow(log, max)-1))+1) / Math.log(log));
};

export const randomIndexLogReverse = (max, log) => {
  return max - randomIndexLog(max, log) - 1;
};

export const random = (choices) => {
  return choices[randomIndex(choices.length)];
};

export const randomLog = (choices, log = 2.0) => {
  return choices[randomIndexLog(choices.length, log)];
};

export const randomLogReverse = (choices, log = 2.0) => {
  return choices[randomIndexLogReverse(choices.length, log)];
};

/*
const test = (randomFn) => {
  const array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 1000;i++) {
    array[randomFn(10)]++;
  }

  console.log(array);
}

test(randomIndex);
test(l => randomIndexLog(l, 2));
test(l => randomIndexLogReverse(l, 2));
*/
