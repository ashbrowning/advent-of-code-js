const findLowPoints = (grid) => {
  const lowPoints = [];

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[0].length; ++x) {
      const currentPoint = grid[y][x];
      if (currentPoint === 9) continue;

      const adjacentPoints = [
        grid[y - 1]?.[x],
        grid[y][x + 1],
        grid[y + 1]?.[x],
        grid[y][x - 1]
      ];

      if (adjacentPoints.every(point => (point ?? 9) > currentPoint)) {
        lowPoints.push([x, y]);
      }
    }
  }
  return lowPoints;
}

export { findLowPoints };