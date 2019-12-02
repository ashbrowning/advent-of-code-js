const fs = require("fs");
const { differenceInMilliseconds, format } = require("date-fns");
const { getInputPath, getSolutionPath } = require('./pathResolvers');

module.exports = (dayArg, partArg, log = true) => {
  const day = !dayArg.length || dayArg.length === 1 ? `0${dayArg}` : `${dayArg}`;
  const { solution } = require(getSolutionPath(day, partArg));
  const input = fs
    .readFileSync(getInputPath(day), { encoding: "utf8" })
    .split("\n");

  const startTime = new Date();
  const result = solution(input);
  const duration = differenceInMilliseconds(new Date(), startTime);
  if (log) {
    console.log(`Day ${day} Part ${partArg}`);
    console.log("Answer:", result);
    console.log("Runtime:", format(duration, 'mm:ss.SSS'));
  }
  return result;
};
