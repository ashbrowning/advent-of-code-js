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

const solution = input =>
  input.reduce((highestId, zones) => {
    const rowZones = zones.slice(0, 7);
    const colZones = zones.slice(7);
    const seatId = reduceRow(rowZones) * 8 + reduceCol(colZones);
    return seatId > highestId ? seatId : highestId;
  }, 0);

const answer = 915;

export { solution, answer };
