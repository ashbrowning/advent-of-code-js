const solution = input => {
  const groups = input.reduce(
    (memo, line) => {
      if (line === '') {
        memo.push(new Set());
      } else {
        const groupSet = memo[memo.length - 1];
        line.split('').forEach(question => groupSet.add(question));
      }

      return memo;
    },
    [new Set()]
  );
  return groups.reduce((memo, group) => memo + group.size, 0);
};

const answer = 6565;

export { solution, answer };
