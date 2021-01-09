const solution = input => {
  let acc = 0;
  let ptr = 0;

  while (typeof input[ptr] === 'string') {
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

  return acc;
};

const answer = 1475;

export { solution, answer };
