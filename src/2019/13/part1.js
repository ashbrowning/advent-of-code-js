import { runIntMachine } from '../../utils/intMachine.js';

const solution = input => {
  const instructions = input[0].split(',').map(i => parseInt(i, 10));

  const gen = runIntMachine(instructions);

  const outputCache = [];
  const grid = {};
  for (let result of gen) {
    outputCache.push(result);

    if (outputCache.length === 3) {
      grid[`${outputCache[0]},${outputCache[1]}`] = outputCache[2];
      outputCache.length = 0;
    }
  }

  return Object.values(grid).filter(tile => tile === 2).length;
}

const answer = 226;

export { answer, solution }