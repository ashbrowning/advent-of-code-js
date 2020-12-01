const TARGET = 2020;

const solution = input => {
  const parsedInput = input.map(i => +i).sort((a, b) => a - b);
  let startIndex = 0;
  let endIndex = parsedInput.length - 1;

  while (startIndex !== endIndex) {
    const addition = parsedInput[startIndex] + parsedInput[endIndex];
    if ( addition === TARGET) {
      break;
    } else if (addition > TARGET) {
      endIndex -= 1;
    } else {
      startIndex += 1;
    }
  }

  return parsedInput[startIndex] * parsedInput[endIndex];
};

const answer = 138379;

export { solution, answer };
