const solution = input => {
  let currentBiggestElf = 0;
  let currentElf = 0;
  for (let calories of input) {
    if (calories === '') {
      if (currentBiggestElf < currentElf) {
        currentBiggestElf = currentElf;
      }
      currentElf = 0;
    } else {
      currentElf += +calories;
    }
  }

  return currentBiggestElf;
};

const answer = 68292;

export { solution, answer };
