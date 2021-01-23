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
  const checklist = Array(8).fill(null);
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, 1],
    [1, 1],
    [1, -1],
    [-1, -1]
  ];

  for (let delta = 1; checklist.includes(null); ++delta) {
    for (let dirIndex = 0; dirIndex < directions.length; ++dirIndex) {
      if (!checklist[dirIndex]) {
        const dir = directions[dirIndex];
        const space = grid[y + delta * dir[0]]?.[x + delta * dir[1]];
        if (space === undefined) {
          checklist[dirIndex] = '.';
        } else if (space !== '.') {
          checklist[dirIndex] = space;
        }
      }
    }
  }

  return checklist.reduce((acc, seat) => acc + (seat === '#' ? 1 : 0), 0);
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
            currentGrid[y][x] = adjacentOccupied >= 5 ? 'L' : seat;
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
