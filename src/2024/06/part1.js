// UP, RIGHT, DONW, LEFT
const directionDelta = [[0, -1], [1, 0], [0, 1], [-1, 0]];

const getSerialisedCoords = ([x, y]) => `${x},${y}`;

const findStartingCoords = (input) => {
  const obsticalCoords = new Set();
  let startCoord = [];
  for (const rowIndex in input) {
    for (const colIndex in input[rowIndex]) {
      if (input[rowIndex][colIndex] === '#') {
        obsticalCoords.add(getSerialisedCoords([colIndex, rowIndex]))
      }
      if (input[rowIndex][colIndex] === '^') {
        startCoord = [Number.parseInt(colIndex), Number.parseInt(rowIndex)];
      }
    }
  }
  return { startCoord, obsticalCoords };
}

const getNextCoordinates = (currentCoordiantes, directionIndex) => {
  return [
    currentCoordiantes[0] + directionDelta[directionIndex][0],
    currentCoordiantes[1] + directionDelta[directionIndex][1]
  ];
}

const solution = input => {

  const { startCoord, obsticalCoords } = findStartingCoords(input);
  let directionIndex = 0; // Start facing 'UP'
  let currentCoordiantes = [...startCoord];
  const visitedCoordinates = new Set();

  // While we stay within the grid
  while (currentCoordiantes[1] < input.length && currentCoordiantes[1] >= 0 && currentCoordiantes[0] < input[0].length && currentCoordiantes[0] >= 0) {
    visitedCoordinates.add(getSerialisedCoords(currentCoordiantes));

    if (obsticalCoords.has(getSerialisedCoords(getNextCoordinates(currentCoordiantes, directionIndex)))) {
      // rotate!
      directionIndex = (directionIndex + 1) % 4;
      console.log('rotating to', directionIndex);
    }

    // move!
    currentCoordiantes[0] += directionDelta[directionIndex][0];
    currentCoordiantes[1] += directionDelta[directionIndex][1];
  }
  return visitedCoordinates.size;
};

const answer = 4973;

export { solution, answer };
