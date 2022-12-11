import { calculateScore } from './utils.js';

// A = Rock
// B = Paper
// C = Scissors

const convertXyzToAbc = ([theirHand, myHand]) => [
  theirHand,
  String.fromCharCode(myHand.charCodeAt() - 23)
];

const solution = input => {
  const parsedInput = input.map(line => line.split(' ')).map(convertXyzToAbc);

  return calculateScore(parsedInput);
};

const answer = 11906;

export { solution, answer };
