const getSerialisedCoordsFromArray = ([x, y]) => `${x},${y}`;

const getSerialisedCoords = ({ x, y }) => `${x},${y}`;

const isWithinSquareGrid = ({ x, y }, size) => y < size && y >= 0 && x < size && x >= 0;

const isWithinSquareGridWithArrayCoords = (coords, size) => coords[1] < size && coords[1] >= 0 && coords[0] < size && coords[0] >= 0;

const numberGridFromRows = input =>
  input.reduce(
    (acc, row) => {
      row.split('').forEach((cell, i) => {
        acc[i].push(+cell);
      });
      return acc;
    },
    new Array(input[0].length).fill('').map(() => [])
  );

const printGrid = grid => {
  const printArr = [];
  for (let y = 0; y < grid[0].length; ++y) {
    let str = '';
    for (let x = 0; x < grid.length; ++x) {
      str += `${grid[x][y]},`;
    }
    printArr.push(str);
  }
  console.log(printArr);
};

export { getSerialisedCoordsFromArray, getSerialisedCoords, isWithinSquareGrid, numberGridFromRows, printGrid };
