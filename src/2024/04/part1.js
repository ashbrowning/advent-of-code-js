
const checkVectors = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0]
];

const XMAS = 'XMAS';

const check = (input, x, y) => {
  const possbileXmas = [];
  for (const [dx, dy] of checkVectors) {
    const cells = [];
    for (let delta = 0; delta < 4; delta++) {
      cells.push(input?.[y + dy * delta]?.[x + dx * delta]);
    }
    possbileXmas.push(cells);
  }

  return possbileXmas.map(r => r.join('')).reduce((acc, str) => {
    return str === XMAS ? acc + 1 : acc;
  }, 0)
}

const getXCoords = (input) => {
  const coords = [];

  // Find all 'X's 
  for (const rowIndex in input) {
    for (const colIndex in input[rowIndex]) {
      if (input[rowIndex][colIndex] === 'X') {
        coords.push([Number.parseInt(colIndex), Number.parseInt(rowIndex)]);
      }
    }
  }

  return coords;
}

const solution = input => {

  const coords = getXCoords(input);

  return coords.reduce((acc, coord) => {
    const [x, y] = coord;
    const r = check(input, x, y);
    return acc + r;
  }, 0);

};

const answer = 2569;

export { solution, answer };
