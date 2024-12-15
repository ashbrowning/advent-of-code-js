const memoryRegex = /do\(\)|don't\(\)|(mul\([\d]{1,3},[\d]{1,3}\))/g;
const instructionRegex = /mul\(([\d]{1,3}),([\d]{1,3})\)/;

const solution = input => {
  const matches = input.map(row => row.match(memoryRegex)).flat();
  
  const result = matches.reduce(({ acc, isEnabled }, match) => {
    switch (match) {
      case "do()":
        return { acc, isEnabled: true };
      case "don't()":
        return { acc, isEnabled: false };
      default:
        if (isEnabled) {
          const [_, a, b] = match.match(instructionRegex);
          return { acc: acc + a * b, isEnabled };
        } else {
          return { acc, isEnabled };
        }
    }
  }, { acc: 0, isEnabled: true });
  return result.acc;
};

const answer = 173731097;

export { solution, answer };
