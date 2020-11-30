import { runIntMachine } from '../../utils/intMachine.js';

const solution = input => {
  const instructions = input[0].split(',').map(i => parseInt(i, 10));

  let haltFlag = false;
  let x = 0;
  let y = 0;
  let orientation = 0; // 0 = up, 1 = right, 2 = down, 3 = left
  const map = {
    '0,0': 0
  };
  const generator = runIntMachine(instructions, [map[`${x},${y}`]]);
  let isPainting = true;

  while (!haltFlag) {
    const result = generator.next(map[`${x},${y}`] === undefined ? 0 : map[`${x},${y}`]);
    if (isPainting) {
      map[`${x},${y}`] = result.value;
    } else {
      const orientationDelta = result.value === 0 ? -1 : 1;
      orientation = (orientation + orientationDelta + 4) % 4;

      if (orientation % 2) {
        x -= orientation - 2;
      } else {
        y += orientation - 1;
      }

    }

    isPainting = !isPainting;
    haltFlag = result.done;
  }
  return Object.keys(map).length;
};

const answer = 2343;

export { solution, answer };
