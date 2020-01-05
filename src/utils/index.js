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

const greatestCommonFactor = numbers => {
  const smallest = numbers.reduce(
    (memo, number) => (number < memo ? number : memo),
    Number.MAX_SAFE_INTEGER
  );

  let gcf = 1;
  for (let i = 1; i <= smallest; ++i) {
    gcf = numbers.every(n => Number.isInteger(n / i)) ? i : gcf;
  }

  return gcf;
};

const lowestCommonMultiple = numbers => {
  let memo = numbers[0];
  for (let i = 1; i < numbers.length; ++i) {
    memo = (memo * numbers[i]) / greatestCommonFactor([memo, numbers[i]]);
  }
  return memo;
};

export {
  getArrayPermutations,
  getPairPermutations,
  greatestCommonFactor,
  lowestCommonMultiple,
  replaceChar
};
