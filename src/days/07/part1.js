import { runIntMachine } from './utils.js';

function* getArrayPermutations(arr) {
  if (arr.length === 1) {
    yield arr;
  }
  for (let i = 0; i < arr.length; ++i) {
    let slicedArray = arr.slice();
    slicedArray.splice(i, 1);
    for (let n of getArrayPermutations(slicedArray)) {
      yield [arr[i], ...n];
    }
  }
}

const phaseOptions = [4, 3, 2, 1, 0];

const solution = input => {
  const instructions = input[0].split(",").map(d => parseInt(d, 10));
  let maxThrusterSignal = 0;
  for (let phaseOrder of getArrayPermutations(phaseOptions)) {
    let outputSignal = 0;
    for(let i = 0; i < phaseOrder.length; ++i) {
      const outputs = runIntMachine(instructions, [phaseOrder[i], outputSignal]);
      outputSignal = outputs[outputs.length - 1];
    }

    if (maxThrusterSignal < outputSignal) {
      maxThrusterSignal = outputSignal;
    }
  }

  return maxThrusterSignal;
};

const answer = 206580;

export { solution, answer };