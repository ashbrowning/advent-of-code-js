const slopes = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2]
];

const run = (input, steps) => {
  const currentCoord = [0, 0];
  const maxY = input.length;
  const maxX = input[0].length;

  let count = 0;

  while (maxY > currentCoord[1]) {
    count = input[currentCoord[1]][currentCoord[0] % maxX] === '#' ? count + 1 : count;
    currentCoord[0] = currentCoord[0] + steps[0]
    currentCoord[1] = currentCoord[1] + steps[1];
  }

  return count;
};

const solution = (input) => {
  return slopes.reduce((memo, slope) => {
    return memo * run(input, slope);
  }, 1);
}

const answer = 280;

export { solution, answer };
