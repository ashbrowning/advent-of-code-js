const solution = input => {
  let currentBiggestElf = 0;
  let currentElf = 0;
  for (let calories of input) {
    currentElf = calories === '' ? 0 : currentElf + Number(calories);
    currentBiggestElf =
      currentBiggestElf < currentElf ? currentElf : currentBiggestElf;
  }

  return currentBiggestElf;
};

const answer = 68292;

export { solution, answer };
