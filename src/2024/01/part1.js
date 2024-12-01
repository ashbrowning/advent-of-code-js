const regex = /(\d+)\w+(\d+)/g;

const solution = input => {
  const firstList = [];
  const secondList = [];
  for (let line of input) {
    const [first, second] = line.split("   ").map((x) => parseInt(x));
    firstList.push(first);
    secondList.push(second);
  }

  firstList.sort((a, b) => a - b);
  secondList.sort((a, b) => a - b);

  return firstList.reduce((acc, curr, index) => {
    return acc + Math.abs(curr - secondList[index]);
  }, 0);
 
};

const answer = 2742123;

export { solution, answer };
