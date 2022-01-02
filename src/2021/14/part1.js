import { doSteps, processInput } from './utils.js';

const solution = input => {
  return doSteps({ ...processInput(input), steps: 10 });
};

const answer = 3831;

export { solution, answer };