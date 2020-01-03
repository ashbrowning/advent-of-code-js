const stationCoords = [13, 17];

const getAsteroidsByAngle = (input) => {
  const asteroidsByAngle = {};
  input.forEach((line, y) => {
    line.split('').forEach((asteroid, x) => {
      if (asteroid === '#') {
        const deltaX = stationCoords[0] - x;
        const deltaY = stationCoords[1] - y;
        if (deltaX === 0 && deltaY === 0) {
          return;
        }

        let angle = Math.atan(Math.abs(deltaX) / Math.abs(deltaY));
        if (deltaY < 0 && deltaX < 0) {
          angle = Math.PI - angle;
        } else if (deltaY < 0 && deltaX >= 0) {
          angle = Math.PI + angle;
        } else if (deltaY >= 0 && deltaX > 0) {
          angle = 2 * Math.PI - angle;
        }

        if (!asteroidsByAngle[angle]) {
          asteroidsByAngle[angle] = [];
        }

        asteroidsByAngle[angle].push([x, y]);
      }
    });
  });
  return asteroidsByAngle;
}

const solution = input => {
  const asteroidsByAngle = getAsteroidsByAngle(input);

  const rotationOrder = Object.keys(asteroidsByAngle).sort((a, b) => {
    return parseFloat(a, 10) - parseFloat(b, 10);
  });

  rotationOrder.forEach(key => {
    asteroidsByAngle[key] = asteroidsByAngle[key].sort((a, b) => {
      return a[0] - b[0];
    });
  });

  let destroyedCount = 0;
  let i = 0;
  while (destroyedCount < 200) {
    const rotation = rotationOrder[i];

    if (asteroidsByAngle[rotation].length === 0) {
      continue;
    }

    const asteroid = asteroidsByAngle[rotation].shift();
    destroyedCount += 1;

    if (destroyedCount === 200) {
      return asteroid[0] * 100 + asteroid[1];
    }

    i = i === rotationOrder.length - 1 ? 0 : i + 1;
  }
};

const answer = 612;

export { answer, solution };
