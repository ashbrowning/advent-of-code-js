import { getDirectorySizes } from './utils.js';

const solution = input => {
  const sizeMap = getDirectorySizes(input);

  return Object.values(sizeMap)
    .filter(size => size <= 100000)
    .reduce((acc, size) => acc + size);
};

const answer = 1491614;

export { solution, answer };
