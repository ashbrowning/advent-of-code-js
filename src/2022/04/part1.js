const solution = input => {
  return input
    .map(line => line.split(/[,-]/).map(n => Number(n)))
    .reduce((acc, [a1, a2, b1, b2]) => {
      if ((a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
};

const answer = 569;

export { solution, answer };
