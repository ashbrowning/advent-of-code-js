const solution = input => {
  const sortedInput = input.map(n => +n).sort((a, b) => a - b);

  const { one, three } = sortedInput.reduce((acc, currentRating) => {
    const diff = currentRating - acc.prev;
    if (diff === 1) {
      acc.one += 1;
    } else if (diff === 3) {
      acc.three += 1;
    }

    acc.prev = currentRating;
    return acc;
  }, {
    one: 0,
    three: 1, //Device is always a three diff in jolts
    prev: 0
  });

  return one * three;
};

const answer = 2738;

export { solution, answer };
