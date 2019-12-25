const runIntMachine = (instructions, inputParam) => {
  const outputs = [];
  let ptr = 0;

  while (ptr < instructions.length) {
    const fullOpCode = "" + instructions[ptr];
    const opCode = parseInt(fullOpCode.slice(-2));
    const operand1 =
      parseInt(fullOpCode.slice(-3, -2)) || 0
        ? instructions[ptr + 1]
        : instructions[instructions[ptr + 1]];
    const operand2 =
      parseInt(fullOpCode.slice(-4, -3)) || 0
        ? instructions[ptr + 2]
        : instructions[instructions[ptr + 2]];

    switch (opCode) {
      case 1:
        instructions[instructions[ptr + 3]] = operand1 + operand2;
        ptr += 4;
        break;
      case 2:
        instructions[instructions[ptr + 3]] = operand1 * operand2;
        ptr += 4;
        break;
      case 3:
        instructions[instructions[ptr + 1]] = inputParam;
        ptr += 2;
        break;
      case 4:
        outputs.push(operand1);
        ptr += 2;
        break;
      case 5:
        if (operand1 !== 0) {
          ptr = operand2;
        } else {
          ptr += 3;
        }
        break;
      case 6:
        if (operand1 === 0) {
          ptr = operand2;
        } else {
          ptr += 3;
        }
        break;
      case 7:
        instructions[instructions[ptr + 3]] = operand1 < operand2 ? 1 : 0;
        ptr += 4;
        break;
      case 8:
        instructions[instructions[ptr + 3]] = operand1 === operand2 ? 1 : 0;
        ptr += 4;
        break;
      case 99:
        ptr = Number.MAX_SAFE_INTEGER;
    }
  }
  return outputs;
};

export { runIntMachine };
