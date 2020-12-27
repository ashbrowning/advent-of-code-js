const solution = input => {
  const groups = input.reduce(
    (memo, line, index, input) => {
      if (line === '') {
        memo.push([...input[index + 1].split('')]);
      } else {
        const splitLine = line.split('');
        const currentGroup = memo[memo.length - 1];
        memo[memo.length - 1] = currentGroup.filter(q => splitLine.includes(q));
      }

      return memo;
    },
    [[...input[0].split('')]]
  );
  return groups.reduce((memo, group) => memo + group.length, 0);
};

const answer = 3137;

export { solution, answer };
