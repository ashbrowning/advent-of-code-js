import { getPairPermutations, lowestCommonMultiple } from '../../utils/index.js';

const regex = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;

const getMoons = moonStr =>
  regex
    .exec(moonStr)
    .slice(1)
    .map(coord => parseInt(coord, 10));

const updateMoonVelocity = (moons, aIdx, bIdx, dimension) => {
  if (moons[aIdx][`${dimension}`] !== moons[bIdx][`${dimension}`]) {
    moons[aIdx][`${dimension}Delta`] +=
      moons[aIdx][`${dimension}`] > moons[bIdx][`${dimension}`] ? -1 : 1;
    moons[bIdx][`${dimension}Delta`] +=
      moons[aIdx][`${dimension}`] > moons[bIdx][`${dimension}`] ? 1 : -1;
  }
};

const serialiseAxis = (moons, axis) =>
  moons.reduce((memo, moon) =>  memo + moon[axis] + ',' + moon[`${axis}Delta`] + '|', '');

const solution = input => {
  const moons = input.map(getMoons).map(([x, y, z]) => ({
    x,
    y,
    z,
    xDelta: 0,
    yDelta: 0,
    zDelta: 0
  }));

  const permutations = [];
  const gen = getPairPermutations(4);
  for (let i of gen) {
    permutations.push(i);
  }

  const axes = ['x', 'y', 'z'];
  const initialAxisStates = axes.map(axis => serialiseAxis(moons, axis));

  const axisPhases = [0, 0, 0];
  let step = 0;
  while (!axisPhases.every(e => e !== 0)) {
    for (let i = 0; i < axes.length; ++i) {
      if (axisPhases[i] !== 0) {
        continue;
      }

      const str = serialiseAxis(moons, axes[i]);

      if (initialAxisStates[i] === str) {
        axisPhases[i] = step;
      }
    }

    for (let j = 0; j < permutations.length; ++j) {
      const moonAIndex = permutations[j][0];
      const moonBIndex = permutations[j][1];

      updateMoonVelocity(moons, moonAIndex, moonBIndex, 'x');
      updateMoonVelocity(moons, moonAIndex, moonBIndex, 'y');
      updateMoonVelocity(moons, moonAIndex, moonBIndex, 'z');
    }

    // Apply velocity to position
    for (let i = 0; i < moons.length; ++i) {
      moons[i].x += moons[i].xDelta;
      moons[i].y += moons[i].yDelta;
      moons[i].z += moons[i].zDelta;
    }
    step += 1;
  }

  return lowestCommonMultiple(axisPhases);
};

const answer = 506359021038056;

export { answer, solution };
