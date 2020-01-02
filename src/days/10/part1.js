const solution = input => {
  const asteroids = [];
  input.forEach((line, y) => {
    line.split('').forEach((asteroid, x) => {
      if (asteroid === '#') {
        asteroids.push([x, y]);
      }
    });
  });

  // console.log('asteroids', asteroids);
  return asteroids.reduce((memo, potentialAsteroid) => {
    const angles = new Set();
    console.log('');
    console.log(potentialAsteroid, memo);
    asteroids.forEach(a => {
      const deltaX = potentialAsteroid[0] - a[0];
      const deltaY = potentialAsteroid[1] - a[1];

      if (deltaX === 0 && deltaY === 0) {
        return;
      }

      let angle = Math.atan(deltaX/deltaY);

      if (deltaY < 0 && deltaX < 0){
        angle += Math.PI/2;
        //below right + 0.5PI
      } else if (deltaY < 0 && deltaX >= 0) {
        angle += Math.PI/2;
        //below left + PI
      } else if (deltaY >= 0 && deltaX >= 0) {
        angle += (3 * Math.PI)/2;
        // above left + 1.5PI
      }
      //else leave alone

      console.log(angle);
      angles.add(angle);

      //if above, delta Y is positive
      //if to the right, delta X is negative

      // a 5 3
      // potential 3 3

      //     o
      //    ___
      //   |  /
      // a | /
      //   |/
      //
      //Math.atan(0.75)*(180/Math.PI)
    });

    return angles.size > memo ? angles.size : memo;
  }, 0);
}

const answer = 269;

export { solution, answer };
