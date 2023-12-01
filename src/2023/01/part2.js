const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

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

const getNumber = stringNumber =>
  stringToNumberMap[stringNumber] || stringNumber;

const solution = input => {
  const calibrations = [];

  for (let line of input) {
    const numbers = Array.from(line.matchAll(regex)).map(match => match[1]);

    if (numbers.length > 0) {
      calibrations.push(
        Number(`${getNumber(numbers[0])}${getNumber(numbers.at(-1))}`)
      );
    }
  }
  return calibrations.reduce((a, b) => a + b);
};

const answer = 54875;

export { solution, answer };
