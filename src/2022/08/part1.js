// Given a row of trees, see how many are visible from the left side of the array and return
// their indexes, plus the index of the tallest possible tree
const doRowOfTrees = row => {
  let tallest = -1;
  let tallestPosition = 0;
  const tallTrees = [];
  for (let x = 0; x < row.length; ++x) {
    const tree = row[x];
    if (tree > tallest) {
      tallTrees.push(x);
      tallest = tree;
    }

    if (tallest === 9) {
      tallestPosition = x;
      break;
    }
  }

  return { limit: tallestPosition, tallTrees };
};

const solution = input => {
  // Setup and parse input
  const rows = input.map(row => row.split('').map(height => Number(height)));
  const columns = [];
  for (let i = 0; i < input[0].length; ++i) {
    const tempCol = [];
    for (let j = 0; j < input.length; ++j) {
      tempCol.push(Number(input[j][i]));
    }
    columns.push(tempCol);
  }

  const visibleTrees = new Set();

  // Rows
  for (let y = 0; y < rows.length; ++y) {
    const row = rows[y];
    const { limit, tallTrees: ltrTallTrees } = doRowOfTrees(row);

    ltrTallTrees.forEach(x => visibleTrees.add(`${x},${y}`));

    const { tallTrees: rtlTallTrees } = doRowOfTrees(
      row.slice(limit).reverse()
    );

    rtlTallTrees.forEach(x => visibleTrees.add(`${row.length - 1 - x},${y}`));
  }

  // Columns
  for (let x = 0; x < columns.length; ++x) {
    const col = columns[x];
    const { limit, tallTrees: ltrTallTrees } = doRowOfTrees(col);

    ltrTallTrees.forEach(y => visibleTrees.add(`${x},${y}`));

    const { tallTrees: rtlTallTrees } = doRowOfTrees(
      col.slice(limit).reverse()
    );

    rtlTallTrees.forEach(y => visibleTrees.add(`${x},${col.length - 1 - y}`));
  }

  return visibleTrees.size;
};

const answer = 1796;

export { solution, answer };
