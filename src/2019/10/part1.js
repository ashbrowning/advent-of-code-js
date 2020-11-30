const solution = input => {
  const asteroids = [];
  input.forEach((line, y) => {
    line.split('').forEach((asteroid, x) => {
      if (asteroid === '#') {
        asteroids.push([x, y]);
      }
    });
  });

  return asteroids.reduce((memo, potentialAsteroid) => {
    const angles = new Set();
    asteroids.forEach(a => {
      const deltaX = potentialAsteroid[0] - a[0];
      const deltaY = potentialAsteroid[1] - a[1];
      if (deltaX === 0 && deltaY === 0) {
        return;
      }

      let angle = Math.atan(Math.abs(deltaX)/Math.abs(deltaY));
      if (deltaY < 0 && deltaX < 0) {
        angle = Math.PI - angle;
      } else if (deltaY < 0 && deltaX >= 0) {
        angle = Math.PI + angle;
      } else if (deltaY >= 0 && deltaX > 0) {
        angle = (2 * Math.PI) - angle;
      }
      angles.add(angle);
    });

    return angles.size > memo ? angles.size : memo;
  }, 0);
}

const answer = 269;

export { solution, answer };
