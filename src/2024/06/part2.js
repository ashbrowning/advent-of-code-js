// UP, RIGHT, DONW, LEFT
const directionDelta = [[0, -1], [1, 0], [0, 1], [-1, 0]];

const getSerialisedCoords = ([x, y]) => `${x},${y}`;
const getSerialisedCoordsWithDirection = ([x, y], dir) => `${x},${y}:${dir}`;

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

const tempObsticalRunThrough = ({ startCoord, obsticalCoords, tempObsticalCoord, isInBounds }) => {
  let currentCoordiantes = [...startCoord];
  let directionIndex = 0; // Start facing 'UP'
  const visitedCoordinatesWithRotation = new Set();
  const obsticalCoordsWithTemporaryObstical = new Set([...obsticalCoords, tempObsticalCoord]);

  while (isInBounds(currentCoordiantes)) {
    // Check for loop
    if (visitedCoordinatesWithRotation.has(getSerialisedCoordsWithDirection(currentCoordiantes, directionIndex))) {
      // A loop has been found
      return true;
    }

    visitedCoordinatesWithRotation.add(getSerialisedCoordsWithDirection(currentCoordiantes, directionIndex));
    const nextStep = getNextCoordinates(currentCoordiantes, directionIndex);

    if (obsticalCoordsWithTemporaryObstical.has(getSerialisedCoords(nextStep))) {
      // rotate
      directionIndex = (directionIndex + 1) % 4;
    } else {
      // move!
      currentCoordiantes = getNextCoordinates(currentCoordiantes, directionIndex);
    }

  }

  return false;
}

const solution = input => {
  const MAX_COORD = input.length; // Assume square grid
  const isInBounds = (coords) => coords[1] < MAX_COORD && coords[1] >= 0 && coords[0] < MAX_COORD && coords[0] >= 0;

  const { startCoord, obsticalCoords } = findStartingCoords(input);
  let directionIndex = 0; // Start facing 'UP'
  let currentCoordiantes = [...startCoord];
  const visitedCoordinates = new Set();


  // === FIRST PASS ===
  // While we stay within the grid
  while (isInBounds(currentCoordiantes)) {
    visitedCoordinates.add(getSerialisedCoords(currentCoordiantes));
    const nextStep = getNextCoordinates(currentCoordiantes, directionIndex);

    if (obsticalCoords.has(getSerialisedCoords(nextStep))) {
      // Rotate!
      directionIndex = (directionIndex + 1) % 4;
    } else {
      // Move!
      currentCoordiantes = getNextCoordinates(currentCoordiantes, directionIndex);
    }
  }

  let loopCount = 0;
  for (const tempObsticalCoord of visitedCoordinates) {
    if (tempObsticalRunThrough({ startCoord, obsticalCoords, tempObsticalCoord, isInBounds })) {
      loopCount++;
    }
  }

  return loopCount;
};

const answer = 1482;

export { solution, answer };