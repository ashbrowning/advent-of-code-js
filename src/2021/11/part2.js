import { gridFromRows } from '../../utils/grids.js';

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

const doSteps = gridInput => {
  let grid = gridInput;
  let flashes = 0;
  let step = 0;
  while (true) {
    step += 1;
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

    const isSynchronised = grid.every(col => col.every(cell => cell === 0));
    if (isSynchronised) {
      return step;
    }
  }
};

const solution = input => {
  let grid = gridFromRows(input);
  return doSteps(grid, 1000);
};

const answer = 346;

export { solution, answer };
