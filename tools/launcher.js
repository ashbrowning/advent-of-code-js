import fs from 'fs';
import datefns from 'date-fns';
import { dayResolver, yearResolver, getInputPath, getSolutionPath } from './pathResolvers.js';

const { differenceInMilliseconds, format } = datefns;

const launcher = async ({ dayArg, partArg: part, yearArg = '2022', log = true }) => {
  // const day = !dayArg.length || dayArg.length === 1 ? `0${dayArg}` : `${dayArg}`;
  const day = dayResolver(dayArg);
  const year = yearResolver(yearArg);
  const { solution } = await import(getSolutionPath({ day, part, year }));
  const input = fs
    .readFileSync(getInputPath({ day, year }), { encoding: 'utf8' })
    .split('\n');

  const startTime = new Date();
  const result = solution(input);
  const duration = differenceInMilliseconds(new Date(), startTime);
  if (log) {
    console.log(`Year ${year} Day ${day} Part ${part}`);
    console.log('Answer:', result);
    console.log('Runtime:', format(duration, 'mm:ss.SSS'));
  }
  return result;
};

export default launcher;
