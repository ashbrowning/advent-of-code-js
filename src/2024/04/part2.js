
const checkVectors = [
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
];


const checkIsXMas = (input, x, y) => {
  if (((input[y - 1]?.[x - 1] === 'M' && input[y + 1]?.[x + 1] === 'S') || (
    input[y + 1]?.[x + 1] === 'M' && input[y - 1]?.[x - 1] === 'S')) && ((
      input[y - 1]?.[x + 1] === 'M' && input[y + 1]?.[x - 1] === 'S') || (
        input[y + 1]?.[x - 1] === 'M' && input[y - 1]?.[x + 1] === 'S'
      ))) {
    {
      return true;
    }
  }
}

const getACoords = (input) => {
  const coords = [];

  // Find all 'A's 
  for (const rowIndex in input) {
    for (const colIndex in input[rowIndex]) {
      if (input[rowIndex][colIndex] === 'A') {
        coords.push([Number.parseInt(colIndex), Number.parseInt(rowIndex)]);
      }
    }
  }

  return coords;
}

const solution = input => {

  const coords = getACoords(input);

  console.log(coords);

  return coords.reduce((acc, coord) => {
    const [x, y] = coord;
    const r = checkIsXMas(input, x, y);
    return checkIsXMas(input, x, y) ? acc + 1 : acc;
  }, 0);

};

const answer = 1998;

export { solution, answer };
