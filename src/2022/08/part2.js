import { getDirectorySizes } from './utils.js';

const DISK_SIZE = 70000000;
const UPDATE_SIZE = 30000000;

const solution = input => {
  const sizeMap = getDirectorySizes(input);
  const usedSpace = sizeMap['/'];
  const spaceToFree = UPDATE_SIZE - (DISK_SIZE - usedSpace);

  const folder = Object.entries(sizeMap).reduce(
    ([_, accSize], [name, size]) => {
      if (size > spaceToFree && size < accSize) {
        return [name, size];
      } else {
        return [_, accSize];
      }
    },
    ['/', usedSpace]
  );

  return folder[1];
};

const answer = 6400111;

export { solution, answer };
