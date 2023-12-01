const regex = /(\d)/g;

const solution = input => {
  const calibrations = [];

  for (let line of input) {
    const numbers = line.match(regex);

    if (numbers.length > 0) {
      calibrations.push(Number(`${numbers[0]}${numbers.at(-1)}`));
    }
  }

  return calibrations.reduce((a, b) => a + b);
};

const answer = 55538;

export { solution, answer };
