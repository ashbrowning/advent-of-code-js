
function* runIntMachine(instructionsParam, inputParams = []) {
  const outputs = [];
  const instructions = instructionsParam.slice();
  const inputs = inputParams.slice();
  let ptr = 0;

  while (ptr < instructions.length) {
    const fullOpCode = '' + instructions[ptr];
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
        // Addition
        instructions[instructions[ptr + 3]] = operand1 + operand2;
        ptr += 4;
        break;
      case 2:
        // Multiplication
        instructions[instructions[ptr + 3]] = operand1 * operand2;
        ptr += 4;
        break;
      case 3:
        // Input
        instructions[instructions[ptr + 1]] = inputs.shift();
        ptr += 2;
        break;
      case 4:
        // Output
        const input = yield operand1;
        outputs.push(operand1);
        inputs.unshift(input);
        ptr += 2;
        break;
      case 5:
        // If not zero
        if (operand1 !== 0) {
          ptr = operand2;
        } else {
          ptr += 3;
        }
        break;
      case 6:
        // If zero
        if (operand1 === 0) {
          ptr = operand2;
        } else {
          ptr += 3;
        }
        break;
      case 7:
        // It first operand is less than second
        instructions[instructions[ptr + 3]] = operand1 < operand2 ? 1 : 0;
        ptr += 4;
        break;
      case 8:
        // If operands are equal
        instructions[instructions[ptr + 3]] = operand1 === operand2 ? 1 : 0;
        ptr += 4;
        break;
      case 99:
        ptr = Number.MAX_SAFE_INTEGER;
    }
  }
  return outputs[outputs.length - 1];
};

export { runIntMachine };