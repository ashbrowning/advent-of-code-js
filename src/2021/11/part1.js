import { numberGridFromRows } from '../../utils/grids.js';

const addOneToGrid = grid => grid.map(col => col.map(cell => cell + 1));

const addOneToAdjacent = (grid, x, y) => {
  for (let i = x - 1; i <= x + 1; ++i) {
    for (let j = y - 1; j <= y + 1; ++j) {
      if (typeof grid[i]?.[j] === 'number' && grid[i][j] !== 0) {
        grid[i][j] += 1;
      }
    }
  }
  return grid;
};

const doSteps = (gridInput, steps) => {
  let grid = gridInput;
  let flashes = 0;
  for (let i = 1; i <= steps; ++i) {
    let hasFlashes = false;
    grid = addOneToGrid(grid);
    do {
      hasFlashes = false;
      for (let x = 0; x < grid.length; ++x) {
        for (let y = 0; y < grid[0].length; ++y) {
          if (grid[x][y] > 9) {
            hasFlashes = true;
            flashes += 1;
            grid = addOneToAdjacent(grid, x, y);
            grid[x][y] = 0;
          }
        }
      }
    } while (hasFlashes);
  }
  return flashes;
};

const solution = input => {
  let grid = numberGridFromRows(input);
  return doSteps(grid, 100);
};

const answer = 1694;

export { solution, answer };
