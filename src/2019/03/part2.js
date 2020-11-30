const getCoords = ([x, y], instruction) => {
  const direction = instruction[0];
  const delta = parseInt(instruction.substring(1));
  const coords = [];
  for (let i = 1; i <= delta; ++i) {
    coords.push([
      direction === "R" ? x + i : direction === "L" ? x - i : x,
      direction === "U" ? y + i : direction === "D" ? y - i : y
    ]);
  }
  return coords;
};

const solution = input => {
  const [wireA, wireB] = input.map(wire => wire.split(","));

  const wireACoordsOrder = [];
  wireA.reduce(
    (coord, instruction) => {
      const newCoords = getCoords(coord, instruction);
      wireACoordsOrder.push.apply(
        wireACoordsOrder,
        newCoords.map(coord => coord.join(","))
      );
      return newCoords[newCoords.length - 1];
    },
    [0, 0]
  );

  // Quicker lookups with a Set
  const wireACoordsSet = new Set();
  wireACoordsOrder.forEach(coordStr => wireACoordsSet.add(coordStr));

  const intersections = {};

  let bStep = 1;
  wireB.reduce(
    (currentCoord, instruction) => {
      const newCoords = getCoords(currentCoord, instruction);
      newCoords.forEach(coord => {
        const coordStr = coord.join(",");
        if (wireACoordsSet.has(coordStr) && !intersections[coordStr]) {
          intersections[coordStr] = bStep + wireACoordsOrder.indexOf(coordStr) + 1;
        }
        bStep += 1;
      });
      return newCoords[newCoords.length - 1];
    },
    [0, 0]
  );


  return Object.values(intersections).reduce(
    (memo, steps) => (steps < memo ? steps : memo),
    Number.MAX_SAFE_INTEGER
  );

};

const answer = 3454;

export { solution, answer };
