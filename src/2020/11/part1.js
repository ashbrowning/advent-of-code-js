const areGridsEqual = (a, b) => {
  const numberOfCols = a.length;
  const numberOfRows = a[0].length;

  for (let y = 0; y < numberOfCols; ++y) {
    for (let x = 0; x < numberOfRows; ++x) {
      if (a[y][x] !== b[y][x]) {
        return false;
      }
    }
  }
  return true;
};

const getAdjacentOccupied = (grid, x, y) => {
  let count = 0;


  for (let ydiff = -1; ydiff <= 1; ++ydiff) {
    for (let xdiff = -1; xdiff <= 1; ++xdiff) {
      if (ydiff === 0 && xdiff === 0) {
        continue;
      }

      const val = grid?.[y + ydiff]?.[x + xdiff];
      if (val === '#') {
        count += 1;
      }
    }
  }
  return count;
};

const cloneGrid = grid => grid.map(row => [...row]);

const solution = input => {
  let currentGrid = input.map(row => row.split(''));

  const numberOfCols = currentGrid.length;
  const numberOfRows = currentGrid[0].length;
  let prevGrid;

  do {
    prevGrid = cloneGrid(currentGrid);
    for (let y = 0; y < numberOfCols; ++y) {
      for (let x = 0; x < numberOfRows; ++x) {
        const seat = prevGrid[y][x];
        if (seat === '.') {
          continue;
        }
        const adjacentOccupied = getAdjacentOccupied(prevGrid, x, y);
        switch (seat) {
          case 'L':
            currentGrid[y][x] = adjacentOccupied === 0 ? '#' : seat;
            break;
          case '#':
            currentGrid[y][x] = adjacentOccupied >= 4 ? 'L' : seat;
            break;
        }
      }
    }
  } while (!areGridsEqual(currentGrid, prevGrid));

  return currentGrid.reduce((acc, row) => {
    return (
      acc +
      row.reduce((rowAcc, seat) => {
        return rowAcc + (seat === '#' ? 1 : 0);
      }, 0)
    );
  }, 0);
};

const answer = 2494;

export { solution, answer };
