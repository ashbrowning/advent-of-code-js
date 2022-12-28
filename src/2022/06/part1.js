import { getIndexAfterDistictBlock } from './utils.js';

const solution = input => {
  return getIndexAfterDistictBlock(input[0], 4);
};

const answer = 1794;

export { solution, answer };
