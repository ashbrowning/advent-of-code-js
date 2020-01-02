import { runIntMachine } from '../../utils/intMachine.js';

const solution = input => {
  const inputParam = [2];
  const instructions = input[0].split(",").map(d => parseInt(d, 10));
  const outputs = []
  for (let i of runIntMachine(instructions, inputParam)) {
    outputs.push(i);
  }
  return outputs[outputs.length - 1];
};

const answer = 87571;

export { solution, answer };
