const memoryRegex = /(mul\([\d]{1,3},[\d]{1,3}\))/g;
const instructionRegex = /mul\(([\d]{1,3}),([\d]{1,3})\)/;

const solution = input => {
  const matches = input.map(row => row.match(memoryRegex)).flat();
  return matches.reduce((acc, match) => {
    const [_, a, b] = match.match(instructionRegex);
    return acc + a * b;
  }, 0);
};

const answer = 173731097;

export { solution, answer };
