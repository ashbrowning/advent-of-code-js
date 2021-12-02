const solution = input => {
  const parsedInput = input
    .map(i => i.split(' '))
    .map(([instruction, value]) => [instruction, +value]);

  const position = {
    aim: 0,
    depth: 0,
    horizontalPosition: 0
  };

  for (let [instruction, value] of parsedInput) {
    switch (instruction) {
      case 'forward':
        position.horizontalPosition += value;
        position.depth += position.aim * value;
        continue;
      case 'up':
        position.aim -= value;
        continue;
      case 'down':
        position.aim += value;
        continue;
    }
  }

  return position.depth * position.horizontalPosition;
};

const answer = 2036120;

export { solution, answer };
