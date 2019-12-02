import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const dayResolver = day => !day.length || day.length === 1 ? `0${day}` : `${day}`;

const getSolutionPath = (day, part) => `${__dirname}/../src/days/${dayResolver(day)}/part${part}.js`;

const getInputPath = (day) => `${__dirname}/../src/days/${dayResolver(day)}/input.txt`;

export {
  getInputPath,
  getSolutionPath
};