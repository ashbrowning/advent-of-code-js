const OPERATIONS = {
  ADD: 1,
  MULTIPLY: 2,
  INPUT: 3,
  OUTPUT: 4,
  IFNOTZERO: 5,
  IFZERO: 6,
  LESSTHAN: 7,
  EQUALTO: 8,
  RELATIVE: 9,
  HALT: 99
};

const getOperand = (instructions, fullOpCode, ptr, paramIndex, relativeBase ) => {
  const paramMode = parseInt(fullOpCode.slice(-3 - paramIndex, -2 - paramIndex) || 0, 10)
  switch (paramMode) {
    case 0:
      return instructions[instructions[ptr + 1 + paramIndex]] || 0;
    case 1:
      return instructions[ptr + 1 + paramIndex] || 0;
    case 2:
      return instructions[instructions[ptr + 1 + paramIndex] + relativeBase] || 0;
  }
}

const setValue = (instructions, fullOpCode, ptr, paramIndex, value, relativeBase) => {
  const paramMode = parseInt(fullOpCode.slice(-3 - paramIndex, -2 - paramIndex) || 0, 10);
  if (paramMode === 2) {
    const location = (instructions[ptr + 1 + paramIndex] + relativeBase) || 0;
    instructions[location] = value;
  } else {
    instructions[instructions[ptr + 1 + paramIndex]] = value;
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
    const operand1 = getOperand(instructions, fullOpCode, ptr, 0, relativeBase);
    const operand2 = getOperand(instructions, fullOpCode, ptr, 1, relativeBase);
    switch (opCode) {
      case OPERATIONS.ADD:
        // Addition
        setValue(instructions, fullOpCode, ptr, 2, operand1 + operand2, relativeBase);
        ptr += 4;
        break;
      case OPERATIONS.MULTIPLY:
        // Multiplication
        setValue(instructions, fullOpCode, ptr, 2, operand1 * operand2, relativeBase);
        ptr += 4;
        break;
      case OPERATIONS.INPUT:
        // Input
        setValue(instructions, fullOpCode, ptr, 0, inputs.shift(), relativeBase);
        ptr += 2;
        break;
      case OPERATIONS.OUTPUT:
        // Output
        const input = yield operand1;
        outputs.push(operand1);
        inputs.unshift(input);
        ptr += 2;
        break;
      case OPERATIONS.IFNOTZERO:
        // If not zero
        if (operand1 !== 0) {
          ptr = operand2;
        } else {
          ptr += 3;
        }
        break;
      case OPERATIONS.IFZERO:
        // If zero
        if (operand1 === 0) {
          ptr = operand2;
        } else {
          ptr += 3;
        }
        break;
      case OPERATIONS.LESSTHAN:
        // It first operand is less than second
        setValue(instructions, fullOpCode, ptr, 2, operand1 < operand2 ? 1 : 0, relativeBase);
        ptr += 4;
        break;
      case OPERATIONS.EQUALTO:
        // If operands are equal
        setValue(instructions, fullOpCode, ptr, 2, operand1 === operand2 ? 1 : 0, relativeBase);
        ptr += 4;
        break;
      case OPERATIONS.RELATIVE: {
        const incBase = getOperand(instructions, fullOpCode, ptr, 0, relativeBase);
        relativeBase += incBase;
        ptr += 2;
      }
      break;
      case OPERATIONS.HALT:
        ptr = Number.MAX_SAFE_INTEGER;
    }
  }
  return outputs[outputs.length - 1];
};

export { runIntMachine };