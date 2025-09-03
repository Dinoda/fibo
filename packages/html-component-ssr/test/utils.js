import { flatten, clean } from '../src/utils.js';

const array = [
  1, 
  2, 
  [3, 4, [5]],
  [[[6], 7], 8]
];

const arrayEquals = (a1, a2) => {
  if (a1.length == a2.length) {
    for (let i = 0;i < a1.length;i++) {
      if (a1[i] !== a2[i]) {
        console.error(`Index ${i} different: ${a1[i]} / ${a2[i]}`);
      }
    }
  } else {
    console.error(`Different length: ${a1.length} / ${a2.length}`);
  }
}

console.log(array);
console.log(flatten(array));
console.log(arrayEquals(flatten(array), [
  1, 2, 3, 4, 5, 6, 7, 8
]));

//////////////////////////////////////////////

const a2 = [
  1,
  null,
  2,
  undefined,
  3,
  [],
  {},
  4,
  5,
];

console.log(a2);
console.log(clean(a2));

