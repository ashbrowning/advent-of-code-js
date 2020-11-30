import { dirname } from 'path';
import { fileURLToPath } from 'url';

import esDirname from 'es-dirname';

const __dirname = esDirname();

const dayResolver = day =>
  day.length === 1 || day < 10 ? `0${day}` : `${day}`;

const yearResolver = year => (year.length === 2 ? `20${year}` : year);

const getSolutionPath = ({ day, part, year }) =>
  `${__dirname}/../src/${year}/${day}/part${part}.js`;

const getInputPath = ({ day, year }) =>
  `${__dirname}/../src/${year}/${day}/input.txt`;

export { dayResolver, yearResolver, getInputPath, getSolutionPath };
