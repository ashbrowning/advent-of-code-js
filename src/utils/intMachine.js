const getOperand = (instructions, fullOpCode, ptr, paramIndex ) => {
  const paramMode = parseInt(fullOpCode.slice(-3 - paramIndex, -2 - paramIndex) || 0, 10)
  return paramMode ? instructions[ptr + paramIndex + 1] : instructions[instructions[ptr + paramIndex + 1]];
}

const setValue = (instructions, fullOpCode, ptr, paramIndex, value) => {
  const paramMode = parseInt(fullOpCode.slice(-3 - paramIndex, -2 - paramIndex) || 0, 10);
  if (paramMode === 2) {
    console.log('paramode 2');
  } else {
    instructions[instructions[ptr + paramIndex + 1]] = value;
  }
};

function* runIntMachine(instructionsParam, inputParams = []) {
  const outputs = [];
  const instructions = instructionsParam.slice();
  const inputs = inputParams.slice();
  let ptr = 0;
  let relativeBase = 0;

  while (ptr < instructions.length) {
    const fullOpCode = '' + instructions[ptr];
    const opCode = parseInt(fullOpCode.slice(-2));
    const operand1 = getOperand(instructions, fullOpCode, ptr, 0);
    const operand2 = getOperand(instructions, fullOpCode, ptr, 1);
    switch (opCode) {
      case 1:
        // Addition
        setValue(instructions, fullOpCode, ptr, 2, operand1 + operand2);
        // instructions[instructions[ptr + 3]] = operand1 + operand2;
        ptr += 4;
        break;
      case 2:
        // Multiplication
        setValue(instructions, fullOpCode, ptr, 2, operand1 * operand2);
        ptr += 4;
        break;
      case 3:
        // Input
        setValue(instructions, fullOpCode, ptr, 0, inputs.shift());
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
        setValue(instructions, fullOpCode, ptr, 2, operand1 < operand2 ? 1 : 0);
        ptr += 4;
        break;
      case 8:
        // If operands are equal
        setValue(instructions, fullOpCode, ptr, 2, operand1 === operand2 ? 1 : 0);
        ptr += 4;
        break;
      case 9: {
        relativeBase += getOperand(instructions, fullOpCode, ptr, 0);
        ptr += 2;
      }
      break;
      case 99:
        ptr = Number.MAX_SAFE_INTEGER;
    }
  }
  return outputs[outputs.length - 1];
};

export { runIntMachine };