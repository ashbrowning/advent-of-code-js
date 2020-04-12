import { calculateOre, parseInput } from './utils.js';

const solution = input => {
  const reactions = parseInput(input);
  return calculateOre(reactions);
};

const answer = 741927;

export { answer, solution };