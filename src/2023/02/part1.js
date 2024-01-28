const gameRegex = /Game (?<id>\d+): (?<outcomes>.*)/;

const limits = {
  red: 12,
  green: 13,
  blue: 14
};

const solution = input => {
  let score = 0;
  input.forEach(line => {
    const { id, outcomes } = gameRegex.exec(line).groups;

    const cubes = outcomes.split(/,|;/).map(s => s.trim().split(' '));

    for (let [number, colour] of cubes) {
      if (Number(number) > limits[colour]) {
        return;
      }
    }

    score += Number(id);
  });
  return score;
};

const answer = 3099;

export { solution, answer };
