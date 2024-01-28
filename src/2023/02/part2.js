const gameRegex = /Game (?<id>\d+): (?<outcomes>.*)/;

const solution = input => {
  return input.reduce((acc, line) => {
    const { id, outcomes } = gameRegex.exec(line).groups;

    const cubes = outcomes.split(/,|;/).map(s => s.trim().split(' '));

    const minColours = cubes.reduce(
      (acc, [numberStr, colour]) => {
        const number = Number(numberStr);
        if (number > acc[colour]) {
          acc[colour] = number;
        }
        return acc;
      },
      {
        red: 0,
        green: 0,
        blue: 0
      }
    );

    return acc + Object.values(minColours).reduce((acc, curr) => acc * curr);
  }, 0);
};

const answer = 72970;

export { solution, answer };
