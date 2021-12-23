import { getMean, getTriangleNumber } from './utils.js';

const solution = input => {
  const parsedInput = input[0]
    .split(',')
    .map(i => +i)
    .sort((a, b) => a - b);

  const midpoint = Math.floor(getMean(parsedInput));
  return parsedInput.reduce(
    (acc, value) => acc + getTriangleNumber(Math.abs(value - midpoint)),
    0
  );
};

const answer = 96798233;

export { solution, answer };
