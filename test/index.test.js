import fs from 'fs';
import {
  dayResolver,
  getInputPath,
  getSolutionPath
} from '../tools/pathResolvers';

describe('Advent of Code 2023 JS', () => {
  for (let i = 1; i <= 1; ++i) {
    describe(`Day ${i}`, () => {
      const day = dayResolver(i);
      const input = fs
        .readFileSync(getInputPath({ day, year: 2023 }), { encoding: 'utf8' })
        .split('\n');
      it('should give the correct answers for part 1', async () => {
        const { solution, answer } = await import(
          getSolutionPath({ day, part: 1, year: 2023 })
        );
        expect(solution(input)).toBe(answer);
      });
      it('should give the correct answers for part 2', async () => {
        const { solution, answer } = await import(
          getSolutionPath({ day, part: 2, year: 2023 })
        );
        expect(solution(input)).toBe(answer);
      });
    });
  }
});
