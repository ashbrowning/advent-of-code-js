import { findLowPoints } from './utils.js';

const serializeCoords = (x, y) => `${x},${y}`;

const solution = input => {
  const grid = input.map(row => row.split('').map(n => +n));
  const lowPoints = findLowPoints(grid);

  const basinSizes = [];

  for (let lowPoint of lowPoints) {
    const queue = [lowPoint];
    const visitedPoints = new Set();
    visitedPoints.add(serializeCoords(...lowPoint));

    while (queue.length) {
      const [x, y] = queue.shift();

      const processAdjacentCoord = (x, y) => {
        if (
          !visitedPoints.has(serializeCoords(x, y)) &&
          (grid[y]?.[x] ?? 9) !== 9
        ) {
          visitedPoints.add(serializeCoords(x, y));
          queue.push([x, y]);
        }
      };

      processAdjacentCoord(x, y - 1);
      processAdjacentCoord(x + 1, y);
      processAdjacentCoord(x, y + 1);
      processAdjacentCoord(x - 1, y);
    }

    basinSizes.push(visitedPoints.size);
  }

  return basinSizes
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((acc, size) => acc * size, 1);
};

const answer = 882942;

export { solution, answer };
