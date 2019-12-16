const getCoords = ([x, y], instruction) => {
  const direction = instruction[0];
  const delta = parseInt(instruction.substring(1));
  const coords = [];
  switch (direction) {
    case 'U':
      for (let i = 1; i <= delta; ++i) {
        coords.push([x, y + i]);
      }
    break;
    case 'D':
      for (let i = 1; i <= delta; ++i) {
        coords.push([x, y - i]);
      }
    break;
    case 'R':
      for (let i = 1; i <= delta; ++i) {
        coords.push([x + i, y]);
      }
    break;
    case 'L':
      for (let i = 1; i <= delta; ++i) {
        coords.push([x - i, y]);
      }
    break;
  }
  return coords;
};

const solution = input => {
  const [wireA, wireB] = input.map(wire => wire.split(','));

  const wireACoords = new Set();
  wireA.reduce(
    (coord, instruction) => {
      const newCoords = getCoords(coord, instruction);
      newCoords.forEach(coord => wireACoords.add(coord.join(',')));
      return newCoords[newCoords.length - 1];
    },
    [0, 0]
  );

  const wireBCoords = new Set();
  wireB.reduce(
    (coord, instruction) => {
      const newCoords = getCoords(coord, instruction);
      newCoords.forEach(coord => wireBCoords.add(coord.join(',')));
      return newCoords[newCoords.length - 1];
    },
    [0, 0]
  );

  const intersection = [];
  wireBCoords.forEach(b => {
    if (wireACoords.has(b)) {
      intersection.push(b);
    }
  });

  return intersection.map(coord => coord.split(',').map(val => parseInt(val))).reduce((memo, [x,y]) => {
    const distance = Math.abs(x) + Math.abs(y);
    return distance < memo ? distance : memo;
  }, Number.MAX_SAFE_INTEGER);

};

const answer = 217;

export { solution, answer };
