import { getPairPermutations } from '../../utils/index.js';

const regex = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;

const getMoons = moonStr =>
  regex
    .exec(moonStr)
    .slice(1)
    .map(coord => parseInt(coord, 10));

const updateMoonVelocity = (moons, aIdx, bIdx, dimension) => {
  if (moons[aIdx][`${dimension}`] !== moons[bIdx][`${dimension}`]) {
    moons[aIdx][`${dimension}Delta`] += moons[aIdx][`${dimension}`] > moons[bIdx][`${dimension}`] ? -1 : 1;
    moons[bIdx][`${dimension}Delta`] += moons[aIdx][`${dimension}`] > moons[bIdx][`${dimension}`] ? 1 : -1;
  }
};

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

  for (let step = 0; step < 1000; ++step) {
    for (let j = 0; j < permutations.length; ++j) {
      const moonAIndex = permutations[j][0];
      const moonBIndex = permutations[j][1];

      updateMoonVelocity(moons, moonAIndex, moonBIndex, 'x');
      updateMoonVelocity(moons, moonAIndex, moonBIndex, 'y');
      updateMoonVelocity(moons, moonAIndex, moonBIndex, 'z');
    }

    // Apply velocity to position
    for(let i = 0; i < moons.length; ++i) {
      moons[i].x += moons[i].xDelta;
      moons[i].y += moons[i].yDelta;
      moons[i].z += moons[i].zDelta;
    }
  }

  //Get potential energy
  const energy = [];
  for (let i = 0; i < moons.length; ++i) {
    const potentialEnergy = Math.abs(moons[i].x) + Math.abs(moons[i].y) + Math.abs(moons[i].z);
    const kineticEnergy = Math.abs(moons[i].xDelta) + Math.abs(moons[i].yDelta) + Math.abs(moons[i].zDelta);
    energy.push(potentialEnergy * kineticEnergy);
  }

  return energy.reduce((memo, e) => memo + e, 0);
};

const answer = 8538;

export { answer, solution };
