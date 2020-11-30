import { getArrayPermutations } from '../../utils/index.js';
import { runIntMachine } from '../../utils/intMachine.js';

const phaseOptions = [4, 3, 2, 1, 0];

const solution = input => {
  const instructions = input[0].split(',').map(d => parseInt(d, 10));
  let maxThrusterSignal = 0;
  for (let phaseOrder of getArrayPermutations(phaseOptions)) {
    let outputSignal = 0;
    for (let i = 0; i < phaseOrder.length; ++i) {
      const generator = runIntMachine(instructions, [
        phaseOrder[i],
        outputSignal
      ]);
      const result = generator.next();
      outputSignal = result.value;
    }

    if (maxThrusterSignal < outputSignal) {
      maxThrusterSignal = outputSignal;
    }
  }

  return maxThrusterSignal;
};

const answer = 206580;

export { solution, answer };
