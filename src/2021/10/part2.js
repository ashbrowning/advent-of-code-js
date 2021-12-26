import { incompleteScores, openTags, tagPairs } from './utils.js';

import { getMedian } from '../../utils/averages.js';

const solution = input => {
  const scores = [];

  for (let line of input) {
    const stack = [];
    let isCorrupt = false;

    for (let char of line) {
      if (openTags.has(char)) {
        stack.push(char);
      } else {
        if (tagPairs[char] === stack[stack.length - 1]) {
          stack.pop();
        } else {
          // Illegal chars
          isCorrupt = true;
          break;
        }
      }
    }

    if (isCorrupt) continue;

    scores.push(
      stack.reverse().reduce((acc, char) => acc * 5 + incompleteScores[char], 0)
    );
  }
  return getMedian(scores.sort((a, b) => a - b));
};

const answer = 1605968119;

export { solution, answer };
