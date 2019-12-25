import { runIntMachine } from './utils.js';

const solution = input => {
  const inputParam = 1;
  const instructions = input[0].split(",").map(d => parseInt(d, 10));
  const outputs = runIntMachine(instructions, inputParam);
  return outputs[outputs.length - 1];
};

const answer = 8332629;

export { solution, answer };
