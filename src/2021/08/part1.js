const solution = input => {
  return input.reduce((acc, line) => {
    const [signal, digitsStr] = line.split(' | ');
    const digits = digitsStr.split(' ');

    return (
      acc +
      digits.filter(
        digit =>
          digit.length === 2 ||
          digit.length === 3 ||
          digit.length === 4 ||
          digit.length === 7
      ).length
    );
  }, 0);
};

const answer = 272;

export { solution, answer };
