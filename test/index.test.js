const { getInputPath, getSolutionPath } = require('../tools/pathResolvers');
const fs = require('fs');

describe("Advent of Code 2019 JS", () => {
  for (let i = 1; i <= 1; ++i) {
    describe(`Day ${i+1}`, () => {
      const input = fs
      .readFileSync(getInputPath(i), { encoding: "utf8" })
      .split("\n");
      it('should give the correct answers for part 1', () => {
        const { solution, answer } = require(getSolutionPath(i, 1));

        expect(solution(input)).toBe(answer);
      });
      it('should give the correct answers for part 2', () => {
        const { solution, answer } = require(getSolutionPath(i, 2));

        expect(solution(input)).toBe(answer);      });
    });
  }
});
