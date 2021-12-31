import { getEdgesMap } from './utils.js';

const lowerCaseRegex = /[a-z]+/;

const solution = input => {
  const edges = getEdgesMap(input);

  const completedPaths = new Set();

  const pathStack = ['start'];

  while (pathStack.length) {
    const currentPath = pathStack.pop();
    const lastNode = currentPath.match(/[^,]+$/)[0];
    const newPaths = edges[lastNode].reduce((acc, node) => {
      if (node.match(lowerCaseRegex)) {
        if (currentPath.includes(node)) {
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
  return completedPaths.size;
};

const answer = 3802;

export { solution, answer };
