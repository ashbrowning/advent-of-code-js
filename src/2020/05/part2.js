const NUM_OF_ROWS = 128;
const NUM_OF_COLS = 8;

const reduceRow = rowZones =>
  rowZones.split('').reduce((memo, zone, index) => {
    return memo + (zone === 'B' ? NUM_OF_ROWS / Math.pow(2, index + 1) : 0);
  }, 0);

const reduceCol = colZones =>
  colZones.split('').reduce((memo, zone, index) => {
    return memo + (zone === 'R' ? NUM_OF_COLS / Math.pow(2, index + 1) : 0);
  }, 0);

const solution = input => {
  const ids = input.reduce((ids, zones) => {
    const rowZones = zones.slice(0, 7);
    const colZones = zones.slice(7);
    ids.push(reduceRow(rowZones) * 8 + reduceCol(colZones));
    return ids;
  }, []);

  ids.sort((a, b) => a - b);
  return ids.find((id, index, ids) => ids[index + 1] !== id + 1) + 1;
};

const answer = 699;

export { solution, answer };
