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

export { getArrayPermutations };
