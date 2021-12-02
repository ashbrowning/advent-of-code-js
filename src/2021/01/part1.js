const solution = input => {
  const parsedInput = input.map(i => +i);

  let total = 0;
  for (let i = 1; i < parsedInput.length; ++i) {
    total += parsedInput[i - 1] < parsedInput[i] ? 1 : 0;
  }

  return total;
};

const answer = 1502;

export { solution, answer };
