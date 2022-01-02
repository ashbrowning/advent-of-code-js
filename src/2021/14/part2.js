import { doSteps, processInput } from './utils.js';

const solution = input => {
  return doSteps({ ...processInput(input), steps: 40 });
};

const answer = 5725739914282;

export { solution, answer };
