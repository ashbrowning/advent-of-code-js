import { getEdgesMap } from './utils.js';

const lowerCaseRegex = /[a-z]+/;

const solution = input => {
  const edges = getEdgesMap(input);

  const smallCaves = Object.keys(edges).filter(
    node => node.match(lowerCaseRegex) && node !== 'start' && node !== 'end'
  );

  const completedPaths = new Set();

  for (let smallCave of smallCaves) {
    const pathStack = ['start'];

    while (pathStack.length) {
      const currentPath = pathStack.pop();
      const lastNode = currentPath.match(/[^,]+$/)[0];

      const newPaths = edges[lastNode].reduce((acc, node) => {
        if (node.match(lowerCaseRegex) && currentPath.includes(node)) {
          if (
            node !== smallCave ||
            (node === smallCave &&
              currentPath.match(new RegExp(smallCave, 'g')).length > 1)
          ) {
            return acc;
          }
        }

        const newPath = `${currentPath},${node}`;

        if (node === 'end') {
          completedPaths.add(newPath);
        } else {
          acc.push(newPath);
        }
        return acc;
      }, []);

      pathStack.push(...newPaths);
    }
  }

  return completedPaths.size;
};

const answer = 99448;

export { solution, answer };
