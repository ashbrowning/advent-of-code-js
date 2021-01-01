const lineRegex = /^(.*) bags contain (.*)/;
const contentsRegex = /(\d+) ([^\d]*) bags?(,|\.)?/;
const EMPTY_BAG_STR = 'no other bags.';

const solution = input => {
  // Bags maps is keyed such that a bag can be in Array<bag>
  const bags = input.reduce((acc, line) => {
    const [, outerBag, contents] = line.match(lineRegex);

    if (contents.trim() === EMPTY_BAG_STR) {
      return acc;
    }

    const innerBags = contents.split(',').map(item => {
      const [, number, bag] = item.match(contentsRegex);
      return bag;
    });

    innerBags.forEach(innerBag => {
      acc[innerBag] ??= new Set();
      acc[innerBag].add(outerBag);
    });

    return acc;
  }, {});

  const queue = ['shiny gold'];
  const bagSet = new Set();
  while (queue.length !== 0) {
    const currentBag = queue.shift();
    bagSet.add(currentBag);
    bags[currentBag]?.forEach( b => queue.push(b));
  }

  // minus 1 to discount the shiny gold queue seed
  return bagSet.size - 1;
};

const answer = 161;

export { solution, answer };
