const runProgram = input => {
  let acc = 0;
  let ptr = 0;

  while (typeof input[ptr] === 'string' && ptr !== input.length) {
    const [operator, operandStr] = input[ptr].split(' ');
    const operand = +operandStr;
    input[ptr] = { operator, operand };

    switch (operator) {
      case 'nop':
        ptr += 1;
        break;
      case 'acc':
        acc += operand;
        ptr += 1;
        break;
      case 'jmp':
        ptr += operand;
        break;
    }
  }

  return ptr === input.length ? acc : null;
};

const solution = input => {
  for(let i = 0; i < input.length; ++i) {
    if (input[i].startsWith('nop') || input[i].startsWith('jmp')) {
      const amendedInput = input.slice();
      if (input[i].startsWith('nop')) {
        amendedInput.splice(i, 1, input[i].replace('nop', 'jmp'));
      }
      if (input[i].startsWith('jmp')) {
        amendedInput.splice(i, 1, input[i].replace('jmp', 'nop'));
      }
      const result = runProgram(amendedInput);
      if (result !== null) {
        return result;
      }
    }
  }
};

const answer = 1270;

export { solution, answer };