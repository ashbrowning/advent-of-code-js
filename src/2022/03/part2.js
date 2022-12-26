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

const solution = input => {
  const commonItems = _.chunk(input, 3).map(
    group => _.intersection(...group.map(g => g.split('')))[0]
  );

  return commonItems.reduce((acc, item) => {
    return acc + scores[item];
  }, 0);
};

const answer = 2276;

export { solution, answer };
