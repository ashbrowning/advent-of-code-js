import { runIntMachine } from '../../utils/intMachine.js';

const solution = input => {
  const instructions = input[0].split(',').map(i => parseInt(i, 10));

  let haltFlag = false;
  let x = 0;
  let y = 0;
  let orientation = 0; // 0 = up, 1 = right, 2 = down, 3 = left
  const map = {
    '0,0': 1
  };
  const generator = runIntMachine(instructions, [map[`${x},${y}`]]);
  let isPainting = true;

  while (!haltFlag) {
    const result = generator.next(
      map[`${x},${y}`] === undefined ? 0 : map[`${x},${y}`]
    );
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

  // Find the bounds
  const bounds = Object.keys(map).reduce(
    (memo, coord) => {
      const [x, y] = coord.split(',').map(c => parseInt(c, 10));
      memo.xMax = x > memo.xMax ? x : memo.xMax;
      memo.xMin = x < memo.xMin ? x : memo.xMin;
      memo.yMax = y > memo.yMax ? y : memo.yMax;
      memo.yMin = y < memo.yMin ? y : memo.yMin;
      return memo;
    },
    {
      xMax: 0,
      xMin: 0,
      yMax: 0,
      yMin: 0
    }
  );

  const renderedImage = [];
  for (let i = bounds.yMin; i <= bounds.yMax; ++i) {
    const row = [];
    for (let j = bounds.xMin; j <= bounds.xMax; ++j) {
      row.push(map[`${j},${i}`] ?  '■' : '□');
    }
    renderedImage.push(row);
  }

  return renderedImage.reduce((memo, row) => memo += row.join(''),'');
};

// JFBERBUH

const answer = '□□□■■□■■■■□■■■□□■■■■□■■■□□■■■□□■□□■□■□□■□□□□□□□■□■□□□□■□□■□■□□□□■□□■□■□□■□■□□■□■□□■□□□□□□□■□■■■□□■■■□□■■■□□■□□■□■■■□□■□□■□■■■■□□□□□□□■□■□□□□■□□■□■□□□□■■■□□■□□■□■□□■□■□□■□□□□■□□■□■□□□□■□□■□■□□□□■□■□□■□□■□■□□■□■□□■□■□□□■■□□■□□□□■■■□□■■■■□■□□■□■■■□□□■■□□■□□■□□□';

export { solution, answer };
