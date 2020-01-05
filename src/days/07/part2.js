import { getArrayPermutations } from '../../utils/index.js';
import { runIntMachine } from '../../utils/intMachine.js';

const phaseOptions = [5, 6, 7, 8, 9];

const solution = input => {
  const instructions = input[0].split(',').map(d => parseInt(d, 10));
  let maxThrusterSignal = 0;
  for (let phaseOrder of getArrayPermutations(phaseOptions)) {
    const amplifiers = [];
    let signal = 0;
    for (let i = 0; i < phaseOrder.length; ++i) {
      amplifiers.push(runIntMachine(instructions, [phaseOrder[i], signal]));
      signal = amplifiers[i].next().value;
    }

    let flag = false;
    let eSignal = 0;
    while (!flag) {
      for (let i = 0; i < phaseOptions.length; ++i) {
        const genVal = amplifiers[i].next(signal);
        signal = genVal.value;
        if (i === 4) {
          flag = genVal.done;
          eSignal = signal;
        }
      }
    }

    if (eSignal > maxThrusterSignal) {
      maxThrusterSignal = eSignal;
    }
  }

  return maxThrusterSignal;
};

const answer = 2299406;

export { solution, answer };
