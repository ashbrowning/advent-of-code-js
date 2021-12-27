const gridFromRows = input =>
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

export { gridFromRows, printGrid };
