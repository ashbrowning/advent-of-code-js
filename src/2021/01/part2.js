const solution = input => {
  const parsedInput = input.map(i => +i);

  let total = 0;
  for (let i = 3; i < parsedInput.length; ++i) {
    total += parsedInput[i - 3] < parsedInput[i] ? 1 : 0;
  }

  return total;
};

const answer = 1538;

export { solution, answer };
