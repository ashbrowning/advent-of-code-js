import _ from 'lodash';

const scores = {};

// A-Z
for (let i = 65; i <= 90; ++i) {
  scores[String.fromCharCode(i)] = 27 + i - 65;
}

// a-z
for (let i = 97; i <= 122; ++i) {
  scores[String.fromCharCode(i)] = i - 96;
}

const splitBags = bags =>
  bags.map(bag => {
    const midPoint = bag.length / 2;
    return [bag.slice(0, midPoint), bag.slice(midPoint)];
  });

const solution = input => {
  const parsedCompartments = splitBags(input);
  const commonItems = parsedCompartments.map(
    ([a, b]) => _.intersection(a.split(''), b.split(''))[0]
  );

  return commonItems.reduce((acc, item) => {
    return acc + scores[item];
  }, 0);
};

const answer = 7742;

export { solution, answer };
