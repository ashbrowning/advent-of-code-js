import { isWithinSquareGrid, numberGridFromRows, getSerialisedCoords } from '../../utils/grids.js';

const createTrail = (currentCoord, startCoord) => ({ currentCoord, startCoord });

const deltas = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }];

const solution = input => {
  const grid = numberGridFromRows(input);

  const maybeTrails = [];
  const completeTrails = [];

  for (let x = 0; x < grid.length; ++x) {
    for (let y = 0; y < grid[x].length; ++y) {
      if (grid[x][y] === 0) {
        maybeTrails.push(createTrail({ x, y }, getSerialisedCoords({ x, y })));
      }
    }
  }

  const oneTrail = [...maybeTrails];

  let i = 0;
  while (oneTrail.length > 0) {
    const trail = oneTrail[i];
    while (true) {
      const nextCoords = [];
      for (const delta of deltas) {
        const currentCoord = trail.currentCoord;
        const nextCoord = { x: currentCoord.x + delta.x, y: currentCoord.y + delta.y };
        const currentTopography = grid[currentCoord.x][currentCoord.y];

        if (!isWithinSquareGrid(nextCoord, grid.length) || grid[nextCoord.x][nextCoord.y] !== currentTopography + 1) {
          continue;
        } else {
          nextCoords.push(nextCoord);
        }
      }

      if (nextCoords.length === 0) {
        oneTrail.splice(oneTrail.indexOf(trail), 1);
        break;
      }

      if (nextCoords.length === 1) {
        // Update the trail
        trail.currentCoord = nextCoords[0];
        if (grid[nextCoords[0].x][nextCoords[0].y] === 9) {
          // End of the trail - move to trails array, remove from maybeTrails
          completeTrails.push(trail);
          oneTrail.splice(oneTrail.indexOf(trail), 1);
          break;
        }
      } else {
        // Create new trails
        for (const nextCoord of nextCoords) {
          const newTrail = createTrail(nextCoord, trail.startCoord);
          if (grid[nextCoord.x][nextCoord.y] === 9) {
            completeTrails.push(newTrail);
          } else {
            oneTrail.push(newTrail);
          }
        }

        // delete the current trail
        oneTrail.splice(oneTrail.indexOf(trail), 1);
        break;
      }
    }
  }

  return completeTrails.length;
};

const answer = 875;

export { solution, answer };
