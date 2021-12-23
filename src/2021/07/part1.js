import { getMedian } from './utils.js';

const solution = input => {
  const parsedInput = input[0]
    .split(',')
    .map(i => +i)
    .sort((a, b) => a - b);

  const median = getMedian(parsedInput);

  return parsedInput.reduce((acc, value) => acc + Math.abs(value - median), 0);
};

const answer = 344735;

export { solution, answer };
