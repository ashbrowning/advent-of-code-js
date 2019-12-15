import { runIntProgram } from './utils.js';

const solution = input => {
  const instructions = input[0].split(',').map(d => parseInt(d, 10));

  const length = instructions.length;
  for(let noun = 0; noun < length; ++noun ) {
    for(let verb = 0; verb < length; ++verb ) {
      const result = runIntProgram([instructions[0], noun, verb, ...instructions.slice(3)]);
      if (result === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
}

const answer = 5485;

export { solution, answer };
