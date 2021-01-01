const lineRegex = /^(.*) bags contain (.*)/;
const contentsRegex = /(\d+) ([^\d]*) bags?(,|\.)?/;
const EMPTY_BAG_STR = 'no other bags.';

const solution = input => {
  const bags = input.reduce((acc, line) => {
    const [, outerBag, contents] = line.match(lineRegex);

    acc[outerBag] = [];
    if (contents.trim() === EMPTY_BAG_STR) {
      return acc;
    }

    acc[outerBag] = contents.split(',').map(item => {
      const [, number, bag] = item.match(contentsRegex);
      return { name: bag, quantity: +number };
    });

    return acc;
  }, {});

  const queue = ['shiny gold'];
  let total = 0;
  while (queue.length !== 0) {
    const currentBag = queue.shift();
    total += bags[currentBag].reduce((acc, bag) => {
      for(let i = 0; i< bag.quantity; ++i) {
        queue.push(bag.name);
      }
      acc += bag.quantity;
      return acc;
    }, 0);
  }
  return total;
};

const answer = 30899;

export { solution, answer };
