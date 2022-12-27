const stackRegexStr = '((\\[([A-Z])\\]|\\s{3})\\s?)';
const instructionRegex = /move (\d+) from (\d+) to (\d+)/;

const solution = input => {
  const indexLine = input.findIndex(line => line.startsWith(' 1'));
  const numberOfStacks = Number(input[indexLine].match(/(\d+)/g).pop());

  const stacks = Array.from(Array(numberOfStacks), () => []);

  for (let i = indexLine - 1; i >= 0; --i) {
    const regex = new RegExp(stackRegexStr, 'g');
    let result;
    while ((result = regex.exec(input[i]))) {
      const crate = result[3];
      if (!crate) {
        continue;
      }
      const index = result.index / 4;
      stacks[index].push(crate);
    }
  }

  const instructions = input.slice(indexLine + 2);

  for (let instruction of instructions) {
    const [_, amount, from, to] = instruction.match(instructionRegex);
    const temp = stacks[from - 1].splice(-1 * amount).reverse();
    stacks[to - 1].push(...temp);
  }
  return stacks.map(stack => stack.pop()).join('');
};

const answer = 'LJSVLTWQM';

export { solution, answer };
