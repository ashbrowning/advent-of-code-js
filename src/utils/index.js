const replaceChar = (str, index, char = '-') =>
  str.substring(0, index) + char + str.substring(index + 1);

function* getArrayPermutations(arr) {
  if (arr.length === 1) {
    yield arr;
  }
  for (let i = 0; i < arr.length; ++i) {
    let slicedArray = arr.slice();
    slicedArray.splice(i, 1);
    for (let n of getArrayPermutations(slicedArray)) {
      yield [arr[i], ...n];
    }
  }
}

function* getPairPermutations(max) {
  for (let i = 0; i < max -1; ++i) {
    for (let j = i + 1; j < max; ++j) {
      yield [i , j];
    }
  }
}

export {
  getArrayPermutations,
  getPairPermutations,
  replaceChar
};
