const rowRegex = /^(\d+),(\d+) -> (\d+),(\d+)$/;

const countVents = (input, enableDiagonals = false) => {
  const ventCount = new Map();

  for (let i = 0; i < input.length; ++i) {
    const [x1, y1, x2, y2] = input[i]
      .match(rowRegex)
      .slice(1)
      .map(n => +n);

    const xStep = x2 - x1 === 0 ? 0 : x2 - x1 > 0 ? 1 : -1;
    const yStep = y2 - y1 === 0 ? 0 : y2 - y1 > 0 ? 1 : -1;

    if (xStep !== 0 && yStep !== 0 && !enableDiagonals) continue;

    let x = x1 - xStep;
    let y = y1 - yStep;

    do {
      x += xStep;
      y += yStep;

      const key = `${x},${y}`;
      if (!ventCount.has(key)) {
        ventCount.set(key, 1);
      } else {
        ventCount.set(key, ventCount.get(key) + 1);
      }
    } while (!(x === x2 && y === y2));
  }

  let count = 0;
  for(const v of ventCount.values()) {
    count += v > 1 ? 1 : 0;
  }

  return count;
};

export { countVents };
