import fs from 'fs';
import { dayResolver, getInputPath, getSolutionPath } from '../tools/pathResolvers';

describe('Advent of Code 2019 JS', () => {
  for (let i = 1; i <= 11; ++i) {
    describe(`Day ${i}`, () => {
      const day = dayResolver(i);
      const input = fs
        .readFileSync(getInputPath(day), { encoding: 'utf8' })
        .split('\n');
      it('should give the correct answers for part 1', async () => {
        const { solution, answer } = await import(getSolutionPath(day, 1));
        expect(solution(input)).toBe(answer);
      });
      it('should give the correct answers for part 2', async () => {
        const { solution, answer } = await import(getSolutionPath(day, 2));
        expect(solution(input)).toBe(answer);
      });
    });
  }
});
