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

  const getAntinodes = (antenna, delta) => {
    const antinodes = [antenna];
    while (true) {
      const lastAntinode = antinodes[antinodes.length - 1];
      const nextAntinode = [lastAntinode[0] + delta[0], lastAntinode[1] + delta[1]];
      if (isInBounds(nextAntinode)) {
        antinodes.push(nextAntinode);
      } else {
        return antinodes;
      }
    }
  }

  const antinodeCoords = new Set();

  const frequencyLocations = processInput(input);

  Object.entries(frequencyLocations).forEach(([key, value]) => {
    const antennaPairs = getPairPermutations(value.length);
    for (const pair of antennaPairs) {
      const antenna1 = value[pair[0]];
      const antenna2 = value[pair[1]];

      const xDiff = antenna1[0] - antenna2[0];
      const yDiff = antenna1[1] - antenna2[1];

      const deltas1 = [(Math.abs(xDiff) * (xDiff > 0 ? 1 : -1)), (Math.abs(yDiff) * (yDiff > 0 ? 1 : -1))];
      const deltas2 = [(Math.abs(xDiff) * (xDiff > 0 ? -1 : 1)), (Math.abs(yDiff) * (yDiff > 0 ? -1 : 1))];

      const antinodes1 = getAntinodes(antenna1, deltas1);
      const antinodes2 = getAntinodes(antenna2, deltas2);

      [...antinodes1, ...antinodes2].forEach(antinode => {
        antinodeCoords.add(getSerialisedCoords(antinode));
      });

    }
  });

  return antinodeCoords.size;
};

const answer = 1147;

export { solution, answer };
