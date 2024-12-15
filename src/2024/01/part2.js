const regex = /(\d+)\w+(\d+)/g;

const solution = input => {
  const firstList = [];
  const secondList = [];
  for (let line of input) {
    const [first, second] = line.split("   ").map((x) => parseInt(x));
    firstList.push(first);
    secondList.push(second);
  }

  const cache = {};

  let total = 0;
  for (let i of firstList) {
    if (!cache[i]) {
      const linetotal = secondList.reduce((acc, curr) => curr === i ? acc + 1 : acc, 0);
      cache[i] = linetotal * i;
    }
    total += cache[i];
  }

  return total;

};

const answer = 21328497;

export { solution, answer };
