const regex = /(\d)|(zero|one|two|three|four|five|six|seven|eight|nine)/g;

const stringToNumberMap = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
};

const solution = input => {
  const calibrations = [];
  for (let line of input) {
    const numbers = line.match(regex);

    if (numbers.length === 0) {
      continue;
    }

    if (numbers.length === 1) {
      calibrations.push(Number(`${numbers[0]}${numbers[0]}`));
      continue;
    }

    calibrations.push(Number(`${numbers[0]}${numbers.at(-1)}`));
  }

  return calibrations.reduce((a, b) => a + b);
};

const answer = 55538;

export { solution, answer };
