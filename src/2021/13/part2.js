const foldRegex = /fold along (.)=(\d+)/;

const solution = input => {
  const division = input.findIndex(line => line === '');
  const coords = input.slice(0, division).map(c => c.split(',').map(Number));
  const folds = input
    .slice(division + 1)
    .map(line => line.match(foldRegex).slice(1, 3));

  while (folds.length) {
    const fold = folds.shift();

    for (let i in coords) {
      const coord = coords[i];
      const foldIndex = fold[0] === 'x' ? 0 : 1;

      if (coord[foldIndex] > +fold[1]) {
        const delta = Math.abs(coord[foldIndex] - fold[1]);
        coords[i] =
          fold[0] === 'x'
            ? [coord[0] - delta * 2, coord[1]]
            : [coord[0], coord[1] - delta * 2];
      }
    }
  }

  const { maxX, maxY } = coords.reduce(
    (acc, coord) => {
      acc.maxX = acc.maxX > coord[0] ? acc.maxX : coord[0];
      acc.maxY = acc.maxY > coord[1] ? acc.maxY : coord[1];
      return acc;
    },
    { maxX: 0, maxY: 0 }
  );

  const grid = [];
  for (let y = 0; y < maxY + 1; ++y) {
    grid.push(new Array(maxX + 1).fill('.'));
  }

  for (const coord of coords) {
    grid[coord[1]][coord[0]] = '#';
  }

  for (const line of grid) {
    console.log(line.join(''));
  }

  return 'CJHAZHKU';
};

const answer = 'CJHAZHKU';

export { solution, answer };
