import { openTags, scores, tagPairs } from './utils.js';

const solution = input => {
  const illegalChars = [];
  for (let line of input) {
    const stack = [];
    for (let char of line) {
      if (openTags.has(char)) {
        stack.push(char);
      } else {
        if (tagPairs[char] === stack[stack.length - 1]) {
          stack.pop();
        } else {
          illegalChars.push(char);
          break;
        }
      }
    }
  }

  return illegalChars.reduce((acc, char) => acc + scores[char], 0);
};

const answer = 392043;

export { solution, answer };
