const getFlipIndex = (rows, index) => {
  return rows
    .sort((a, b) => a[index] - b[index])
    .findIndex(row => row[index] === '1');
};

const getRating = (rows, mostCommon = true) => {
  const length = rows.length;
  for (let i = 0; i < length; ++i) {
    if (rows.length === 1) {
      break;
    }
    const flipIndex = getFlipIndex(rows, i);
    if (flipIndex > Math.floor(rows.length / 2)) {
      // '0' most common
      rows = mostCommon ? rows.slice(0, flipIndex) : rows.slice(flipIndex);
    } else {
      // '1' most common
      rows = mostCommon ? rows.slice(flipIndex) : rows.slice(0, flipIndex);
    }
  }
  return rows[0];
};

const solution = input => {
  const oxygen = getRating(input.slice(), true);
  const co2 = getRating(input.slice(), false);
  return parseInt(oxygen, 2) * parseInt(co2, 2);
};

const answer = 2795310;

export { solution, answer };
