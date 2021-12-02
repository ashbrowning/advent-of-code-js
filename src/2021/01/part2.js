const solution = input => {
  const parsedInput = input.map(i => +i);

  let prev = Number.MAX_SAFE_INTEGER;
  let total = 0;
  for (let i = 2; i < parsedInput.length; ++i) {
    const window = parsedInput[i-2] + parsedInput[i-1] + parsedInput[i];
    total += prev < window ? 1 : 0;
    prev = window;
  }

  return total
};

const answer = 1538;

export { solution, answer };