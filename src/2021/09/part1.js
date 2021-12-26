import { findLowPoints } from './utils.js';

const solution = input => {
  const grid = input.map(row => row.split('').map(n => +n));
  return findLowPoints(grid).reduce((acc, [x, y]) => acc + grid[y][x] + 1, 0);
};

const answer = 558;

export { solution, answer };
