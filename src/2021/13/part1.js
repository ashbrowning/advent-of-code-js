const foldRegex = /fold along (.)=(\d+)/;

const solution = input => {
  const division = input.findIndex(line => line === '');
  const coords = input.slice(0, division).map(c => c.split(',').map(Number));
  const folds = input
    .slice(division + 1)
    .map(line => line.match(foldRegex).slice(1, 3));

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

  const coordSet = new Set();
  for (let coord of coords) {
    coordSet.add(`${coord[0]},${coord[1]}`);
  }
  return coordSet.size;
};

const answer = 666;

export { solution, answer };
