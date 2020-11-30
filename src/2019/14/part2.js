import { calculateOre, parseInput } from './utils.js';

const solution = input => {
  const reactions = parseInput(input);
  const TARGET_ORE = 1000000000000;
  let fuelInput = 1;
  let delta = Math.pow(2, 15);
  while (true) {
    const ore = calculateOre(reactions, fuelInput);

    if (ore === TARGET_ORE) {
      break;
    }

    if (ore > TARGET_ORE) {
      if (delta === 1) {
        fuelInput -= 1;
        break;
      }
      fuelInput -= delta;
      delta /= 2;
    }
    fuelInput += delta;
  }

  return fuelInput;
};

const answer = 2371699;

export { answer, solution };
