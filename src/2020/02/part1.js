const solution = input => {
  const parsedInput = input.map(line => {
    const [min, max, char, code] = line
      .replace('-', ' ')
      .replace(':', '')
      .split(' ');
    return { min: +min, max: +max, char, code };
  });

  return parsedInput.reduce((memo, { min, max, char, code }) => {
    const occurances = code.split(char).length - 1;
    return min <= occurances && max >= occurances ? memo + 1 : memo;
  }, 0);
};

const answer = 378;

export { solution, answer };