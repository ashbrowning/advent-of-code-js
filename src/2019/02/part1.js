import { runIntProgram } from './utils.js';

const solution = input => {
  const instructions = input[0].split(',').map(d => parseInt(d, 10));
  instructions[1] = 12;
  instructions[2] = 2;

  return runIntProgram(instructions);
}

const answer = 4570637;

export { solution, answer };
