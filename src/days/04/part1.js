const hasAdjacent = str => {
  for (let i = 1; i < str.length; ++i) {
    if (str[i-1] === str[i]) {
      return true;
    }
  }
  return false;
};

const hasIncreasingDigits = str => {
  for (let i = 1; i < str.length; ++i) {
    if (str[i-1] > str[i]) {
      return false;
    }
  };
  return true;
};

const solution = input => {
  const [min, max] = input[0].split('-').map(str => parseInt(str));
  let count = 0;
  for (let i = min; i <= max; ++i) {
    const password = `${i}`;
    if (hasIncreasingDigits(password) && hasAdjacent(password)) {
      count += 1;
    }
  }
  return count;
};

const answer = 921;

export { solution, answer };
