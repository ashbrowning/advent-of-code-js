import { runIntMachine } from '../../utils/intMachine.js';

const solution = input => {
  const instructions = input[0].split(',').map(i => parseInt(i, 10));
  instructions[0] = 2;

  const gen = runIntMachine(instructions);

  const outputCache = [];
  const grid = {};
  let halt = false;
  let segment = 0;

  let xBall = -1;
  let paddle = -1;
  let xDelta = 0;

  while(!halt) {
    const result = gen.next(xDelta);
    outputCache.push(result.value);
    if (outputCache.length === 3) {
      if (outputCache[0] === -1 && outputCache[1] === 0) {
        segment = outputCache[2];
      }
      if (outputCache[2] === 3) {
        paddle = outputCache[0];
      }
      if (outputCache[2] === 4) {
        xBall = outputCache[0];
      }

      if (xBall !== -1 && paddle !== -1) {
        if (xBall > paddle) {
          xDelta = 1;
        } else if (xBall < paddle) {
          xDelta = -1;
        } else {
          xDelta = 0;
        }
      }

      grid[`${outputCache[0]},${outputCache[1]}`] = outputCache[2];
      outputCache.length = 0;
    }
    halt = result.done;
  }
  return segment;
}

const answer = 10800;

export { answer, solution }