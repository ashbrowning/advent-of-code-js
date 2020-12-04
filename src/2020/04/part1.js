const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];

const solution = input => {
  // Gather document fields together
  const documentStrings = input.reduce(
    (memo, line) => {
      if (line === '') {
        memo.push('');
        return memo;
      }

      memo[memo.length - 1] = memo[memo.length - 1].concat(' ', line);
      return memo;
    },
    ['']
  );

  // For each doc, split into key/value pairs
  const documents = documentStrings.map(doc => {
    return doc
      .split(' ')
      .reduce((memo, pair) => {
        const [key, value] = pair.split(':');
        memo[key] = value;
        return memo;
      }, {});
  });

  // Validate
  return documents.reduce((memo, doc) => {
    const keys = Object.keys(doc);
    return requiredFields.every(field => keys.includes(field))
      ? memo + 1
      : memo;
  }, 0);
};

const answer = 250;

export { solution, answer };
