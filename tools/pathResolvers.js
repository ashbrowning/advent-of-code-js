import { dirname } from 'path';
import { fileURLToPath } from 'url';

import esDirname from 'es-dirname';

const __dirname = esDirname();

const dayResolver = day => day.length === 1 || day < 10 ? `0${day}` : `${day}`;

const getSolutionPath = (day, part) =>
  `${__dirname}/../src/days/${dayResolver(day)}/part${part}.js`;

const getInputPath = day =>
  `${__dirname}/../src/days/${dayResolver(day)}/input.txt`;

export { getInputPath, getSolutionPath };
