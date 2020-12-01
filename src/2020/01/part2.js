const TARGET = 2020;

const solution = input => {
  const parsedInput = input.map(i => +i).sort((a, b) => a - b);
  let startIndex = 0;
  let middleIndex = 1;
  let endIndex = parsedInput.length - 1;

  while (startIndex !== endIndex) {
    const addition =
      parsedInput[startIndex] +
      parsedInput[endIndex] +
      parsedInput[middleIndex];
    if (addition === TARGET) {
      break;
    } else if (addition > TARGET) {
      endIndex -= 1;
      middleIndex = startIndex;
    } else if (endIndex - 1 === middleIndex) {
      startIndex += 1;
      middleIndex = startIndex;
    }
    middleIndex += 1;
  }

  return (
    parsedInput[startIndex] * parsedInput[endIndex] * parsedInput[middleIndex]
  );
};

const answer = 85491920;

export { solution, answer };