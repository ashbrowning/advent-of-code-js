'use strict';

import launcher from './tools/launcher.js';

const dayArg = process.argv[2];
const partArg = process.argv[3];
const yearArg = process.argv[4];

launcher({ dayArg, partArg, yearArg });
