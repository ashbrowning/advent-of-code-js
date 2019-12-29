import fs from 'fs';
import { getInputPath, getSolutionPath } from '../tools/pathResolvers';

describe("Advent of Code 2019 JS", () => {
  for (let i = 1; i <= 7; ++i) {
    describe(`Day ${i}`, () => {
      const input = fs
      .readFileSync(getInputPath(i), { encoding: "utf8" })
      .split("\n");
      it('should give the correct answers for part 1', async () => {
        const { solution, answer } = await import(getSolutionPath(i, 1));

        expect(solution(input)).toBe(answer);
      });
      it('should give the correct answers for part 2', async () => {
        const { solution, answer } = await import(getSolutionPath(i, 2));

        expect(solution(input)).toBe(answer);      });
    });
  }
});
