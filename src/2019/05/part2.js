import { runIntMachine } from '../../utils/intMachine.js';

const solution = input => {
  const inputParam = 5;
  const instructions = input[0].split(",").map(d => parseInt(d, 10));
  const outputs = []
  for (let i of runIntMachine(instructions, [inputParam])) {
    outputs.push(i);
  }  return outputs[outputs.length - 1];
};

const answer = 8805067;

export { solution, answer };
