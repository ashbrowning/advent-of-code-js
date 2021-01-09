const WINDOW_SIZE = 25;

const findPair = (arr, target) => {
  const sortedArray = arr.sort((a, b) => a - b);

  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex !== endIndex) {
    const addition = sortedArray[startIndex] + sortedArray[endIndex];
    if (addition === target) {
      return true;
    } else if (addition > target) {
      endIndex -= 1;
    } else {
      startIndex += 1;
    }
  }

  return false;
};

const solution = input => {
  const parsedInput = input.map(n => +n);
  for(let i = WINDOW_SIZE; i < parsedInput.length; ++i) {
    const target = parsedInput[i];
    const arr = parsedInput.slice(i - WINDOW_SIZE, i);
    const hasPair = findPair(arr, target);
    if (!hasPair) {
      return target;
    }
  }
};

const answer = 167829540;

export { solution, answer };
