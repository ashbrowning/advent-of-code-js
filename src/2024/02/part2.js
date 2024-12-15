import { parseInput } from './utils.js';

const testReport = report => {
  const differences = [];
  for (let i = 0; i < report.length - 1; i++) {
    differences.push(report[i + 1] - report[i]);
  }

  differences.sort((a, b) => a - b);

  if (Math.abs(differences.at(0)) > 3 || Math.abs(differences.at(-1)) > 3) {
    return false;
  }

  return differences.every(levelDelta => levelDelta > 0) || differences.every(levelDelta => levelDelta < 0);
};

const permutateReport = report => {
  const permutations = [];
  for (let i = 0; i < report.length; i++) {
    const copy = report.slice();
    copy.splice(i, 1);
    permutations.push(copy);
  }
  return permutations;
}

const solution = input => {
  const parsedInput = parseInput(input);
  const safeReports = parsedInput.filter(report => {
    if(testReport(report)) {
      return true;
    }

    return permutateReport(report).some(testReport);
  });

  return safeReports.length;
};

const answer = 293;

export { solution, answer };
