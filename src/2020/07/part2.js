const lineRegex = /^(.*) bags contain (.*)/;
const contentsRegex = /(\d+) ([^\d]*) bags?(,|\.)?/;
const EMPTY_BAG_STR = 'no other bags.';
const SHINY_GOLD = 'shiny gold';

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

  const stack = [SHINY_GOLD];
  const cache = {};
  while (stack.length !== 0) {
    const currentBag = stack[stack.length - 1];
    const nonCachedBags = bags[currentBag].filter(bag => cache[bag.name] === undefined);

    if (nonCachedBags.length !== 0) {
      stack.push(...nonCachedBags.map(b => b.name));
      continue;
    }

    // we have every bag cached!
    cache[currentBag] = bags[currentBag].reduce((acc, bag) => {
      return acc + (bag.quantity * cache[bag.name]) + bag.quantity;
    }, 0);

    stack.pop();
  }
  return cache[SHINY_GOLD];
};

const answer = 30899;

export { solution, answer };
