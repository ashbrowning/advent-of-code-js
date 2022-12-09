const solution = input => {
  let currentElf = 0;
  const elves = [];
  for (let calories of input) {
    if (calories === '') {
      elves.push(currentElf);
      currentElf = 0;
    } else {
      currentElf += Number(calories);
    }
  }

  return elves
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc + val);
};

const answer = 203203;

export { solution, answer };
