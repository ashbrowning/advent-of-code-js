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
  const MAX_COORD = input.length; // Assume square grid
  const isInBounds = (coords) => coords[1] < MAX_COORD && coords[1] >= 0 && coords[0] < MAX_COORD && coords[0] >= 0;

  const { startCoord, obsticalCoords } = findStartingCoords(input);
  let directionIndex = 0; // Start facing 'UP'
  let currentCoordiantes = [...startCoord];
  const visitedCoordinates = new Set();

  // While we stay within the grid
  while (isInBounds(currentCoordiantes)) {
    visitedCoordinates.add(getSerialisedCoords(currentCoordiantes));

    if (obsticalCoords.has(getSerialisedCoords(getNextCoordinates(currentCoordiantes, directionIndex)))) {
      // rotate!
      directionIndex = (directionIndex + 1) % 4;
    }

    // move!
    currentCoordiantes[0] += directionDelta[directionIndex][0];
    currentCoordiantes[1] += directionDelta[directionIndex][1];
  }

  return visitedCoordinates.size;
};

const answer = 4973;

export { solution, answer };
