const hasPair = str => {
  let currentPair = '';
  let streak = 1;
  for (let i = 1; i < str.length; ++i) {
    if (str[i-1] === str[i]) {
      streak += 1;
      currentPair = str[i];
    } else {
      if (streak === 2) {
        return true;
      } else {
        streak = 1;
      }
    }
  }
  return streak === 2;
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
    if (hasIncreasingDigits(password) && hasPair(password)) {
      count += 1;
    }
  }
  return count;
};

const answer = 603;

export { solution, answer };
