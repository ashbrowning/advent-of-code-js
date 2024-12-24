import { getPairPermutations } from '../../utils/index.js';

const processInput = input => {
  const frequencyLocations = {};
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input.length; x++) {
      const value = input[y][x];
      if (value !== '.') {
        if (!frequencyLocations[value]) {
          frequencyLocations[value] = [];
        }
        frequencyLocations[value].push([x, y]);
      }
    }
  }
  return frequencyLocations;
}

const getSerialisedCoords = ([x, y]) => `${x},${y}`;

const solution = input => {

  const MAX_COORD = input.length; // Assume square grid;
  const isInBounds = (coords) => coords[1] < MAX_COORD && coords[1] >= 0 && coords[0] < MAX_COORD && coords[0] >= 0;
  const antinodeCoords = new Set();

  const frequencyLocations = processInput(input);

  Object.entries(frequencyLocations).forEach(([key, value]) => {
    const antennaPairs = getPairPermutations(value.length);
    for (const pair of antennaPairs) {
      const antenna1 = value[pair[0]];
      const antenna2 = value[pair[1]];

      const xDiff = antenna1[0] - antenna2[0];
      const yDiff = antenna1[1] - antenna2[1];

      const antinode1 = [antenna1[0] + (Math.abs(xDiff) * (xDiff > 0 ? 1 : -1)), antenna1[1] + (Math.abs(yDiff) * (yDiff > 0 ? 1 : -1))];
      const antinode2 = [antenna2[0] + (Math.abs(xDiff) * (xDiff > 0 ? -1 : 1)), antenna2[1] + (Math.abs(yDiff) * (yDiff > 0 ? -1 : 1))];

      if (isInBounds(antinode1)) {
        antinodeCoords.add(getSerialisedCoords(antinode1));
      }

      if (isInBounds(antinode2)) {
        antinodeCoords.add(getSerialisedCoords(antinode2));
      }

    }
  });

  return antinodeCoords.size;
};

const answer = 308;

export { solution, answer };
