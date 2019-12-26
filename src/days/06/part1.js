const solution = input => {
  const mappings = input
    .map(pair => pair.split(")"))
    .reduce((memo, [body, orbiter]) => {
      memo[`${orbiter}`] = body;
      return memo;
    }, {});

  return Object.keys(mappings).reduce((total, startingOrbiter) => {
    let orbiter = startingOrbiter;
    let orbits = 0;
    while (mappings[orbiter]) {
      orbiter = mappings[orbiter];
      orbits += 1;
    }
    return total + orbits;
  }, 0);
};

const answer = 273985;

export { solution, answer };
