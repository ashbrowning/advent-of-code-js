import { solution as getWeakNumber } from './part1.js';

const findContiguousRange = (arr, target) => {
  let startIndex = 0;
  let endIndex = 2;

  while (endIndex !== arr.length + 1) {
    const sum = arr
      .slice(startIndex, endIndex)
      .reduce((acc, val) => acc + val, 0);
    if (sum === target) {
      return { start: startIndex, end: endIndex };
    } else if (sum < target) {
      endIndex += 1;
    } else {
      if (startIndex + 2 === endIndex) {
        endIndex += 1;
      }
      startIndex += 1;
    }
  }
};

const solution = input => {
  const weakNumber = getWeakNumber(input);
  const parsedInput = input.map(n => +n);
  const seqIndexes = findContiguousRange(parsedInput, weakNumber);
  const seq = parsedInput.slice(seqIndexes.start, seqIndexes.end);
  seq.sort((a,b) => a - b);
  return seq[0] + seq[seq.length - 1];
};

const answer = 28045630;

export { solution, answer };
