const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const validate = {
  byr: data => +data >= 1920 && +data <= 2002,
  iyr: data => +data >= 2010 && +data <= 2020,
  eyr: data => +data >= 2020 && +data <= 2030,
  hgt: data => {
    const [, measure, unit] = data.match(/(\d+)(cm|in)/) ?? [];
    if (unit === 'cm') {
      return +measure >= 150 && +measure <= 193;
    } else if (unit === 'in') {
      return +measure >= 59 && +measure <= 76;
    }
    return false;
  },
  hcl: data => /#[a-f0-9]{6}/.test(data),
  ecl: data => validEyeColors.includes(data),
  pid: data => /(^\d{9}$)/.test(data),
  cid: data => true
};

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
      .trim()
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
    return requiredFields.every(field => keys.includes(field)) &&
      Object.entries(doc).every(([key, val]) => validate[key](val))
      ? memo + 1
      : memo;
  }, 0);
};

const answer = 158;

export { solution, answer };
