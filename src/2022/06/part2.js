import { getIndexAfterDistictBlock } from './utils.js';

const solution = input => {
  return getIndexAfterDistictBlock(input[0], 14);
};

const answer = 2851;

export { solution, answer };
