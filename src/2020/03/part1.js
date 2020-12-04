const steps = [3, 1];

const solution = input => {
  const currentCoord = [0, 0];
  const maxY = input.length;
  const maxX = input[0].length;

  let count = 0;

  while (maxY !== currentCoord[1]) {
    count = input[currentCoord[1]][currentCoord[0] % maxX] === '#' ? count + 1 : count;
    currentCoord[0] = currentCoord[0] + steps[0]
    currentCoord[1] = currentCoord[1] + steps[1];
  }

  return count;
};

const answer = 189;

export { solution, answer };
