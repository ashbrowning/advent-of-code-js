const stepsToAncester = ({ start, ancestor, mappings }) => {
  let orbiter = start;
  let count = 0;
  while (mappings[orbiter] && mappings[orbiter] !== ancestor) {
    orbiter = mappings[orbiter];
    count += 1;
  }
  return count;
};

const solution = input => {
  const mappings = input
    .map(pair => pair.split(')'))
    .reduce((memo, [body, orbiter]) => {
      memo[orbiter] = body;
      return memo;
    }, {});

  const start = 'YOU';
  const destination = 'SAN';

  const [startRoute, destinationRoute] = [start, destination].map(
    startingOrbiter => {
      let orbiter = startingOrbiter;
      const path = [];
      while (mappings[orbiter]) {
        path.push(mappings[orbiter]);
        orbiter = mappings[orbiter];
      }
      return path;
    }
  );

  const ancestor = startRoute.filter(o => destinationRoute.includes(o))[0];
  return (
    stepsToAncester({ start, ancestor, mappings }) +
    stepsToAncester({ start: destination, ancestor, mappings })
  );
};

const answer = 460;

export { solution, answer };
