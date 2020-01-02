import { runIntMachine } from '../../utils/intMachine.js';

const solution = input => {
  const inputParam = [1];
  const instructions = input[0].split(",").map(d => parseInt(d, 10));
  const outputs = []
  for (let i of runIntMachine(instructions, inputParam)) {
    outputs.push(i);
  }
  return outputs[outputs.length - 1];
};

const answer = 2752191671;

export { solution, answer };
