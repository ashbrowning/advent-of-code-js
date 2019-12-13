const solution = input => {
  const instructions = input[0].split(',').map(d => parseInt(d, 10));
  instructions[1] = 12;
  instructions[2] = 2;

  const length = instructions.length;

  for(let i = 0; i < length; i+=4) {
    const op = instructions[i];
    const val1 = instructions[instructions[i+1]];
    const val2 = instructions[instructions[i+2]];
    const dest = instructions[i+3];

    if (op === 1) {
      instructions[dest] = val1 + val2;
    } else if (op === 2 ) {
      instructions[dest] = val1 * val2;
    } else {
      break;
    }
  }

  return instructions[0];
}

const answer = 4570637;

export { solution, answer };
