const solution = input => {
  return input.reduce((total, line) => {
    const [firstIndex, secondIndex, char, code] = line
      .replace('-', ' ')
      .replace(':', '')
      .split(' ');
    const firstChar = code[+firstIndex - 1];
    const secondChar = code[+secondIndex - 1];
    return (firstChar === char && secondChar !== char) ||
      (firstChar !== char && secondChar === char)
      ? total + 1
      : total;
  }, 0);
};

const answer = 280;

export { solution, answer };
