import { calculateScore, losingHands, winningHands } from './utils.js';

// A = Rock
// B = Paper
// C = Scissors

// X = Lose
// Y = Draw
// Z = Win

const solution = input => {
  const parsedInput = input.map(line => line.split(' '));

  const hands = parsedInput.map(([theirHand, outcome]) => {
    switch (outcome) {
      case 'Y':
        return [theirHand, theirHand];
      case 'X':
        return [theirHand, winningHands[theirHand]];
      case 'Z':
        return [theirHand, losingHands[theirHand]];
    }
  });

  return calculateScore(hands);
};

const answer = 11186;

export { solution, answer };
