const runIntMachine = (instructions, inputParam) => {
  const outputs = [];
  let ptr = 0;

  while (ptr < instructions.length) {
    const fullOpCode = "" + instructions[ptr];
    const opCode = parseInt(fullOpCode.slice(-2));
    const paramMode1 = parseInt(fullOpCode.slice(-3, -2)) || 0;
    const paramMode2 = parseInt(fullOpCode.slice(-4, -3)) || 0;
    const paramMode3 = parseInt(fullOpCode.slice(-5, -4)) || 0; //Though if this is the writing instruction, it won't be in immediate mode

    // Param Modes
    // 0 = Position Mode
    // 1 = Immediate Mode

    switch (opCode) {
      case 1:
        {
          const operand1 = paramMode1
            ? instructions[ptr + 1]
            : instructions[instructions[ptr + 1]];
          const operand2 = paramMode2
            ? instructions[ptr + 2]
            : instructions[instructions[ptr + 2]];
          console.log(
            "add",
            fullOpCode,
            instructions[ptr + 1],
            instructions[ptr + 2],
            instructions[ptr + 3],
            "|",
            operand1,
            operand2,
            "|",
            operand1 + operand2
          );

          instructions[instructions[ptr + 3]] = operand1 + operand2;
          ptr += 4;
        }
        break;
      case 2:
        {
          const operand1 = paramMode1
            ? instructions[ptr + 1]
            : instructions[instructions[ptr + 1]];
          const operand2 = paramMode2
            ? instructions[ptr + 2]
            : instructions[instructions[ptr + 2]];
          console.log(
            "multiply",
            fullOpCode,
            instructions[ptr + 1],
            instructions[ptr + 2],
            instructions[ptr + 3],
            "|",
            operand1,
            operand2,
            "|",
            operand1 * operand2
          );
          instructions[instructions[ptr + 3]] = operand1 * operand2;
          ptr += 4;
        }
        break;
      case 3:
        console.log(
          "take input",
          opCode,
          instructions[ptr + 1],
          "|",
          inputParam
        );
        instructions[instructions[ptr + 1]] = inputParam;
        ptr += 2;
        break;
      case 4:
        console.log(
          "give output",
          opCode,
          instructions[ptr + 1],
          "|",
          inputParam
        );
        outputs.push(instructions[instructions[ptr + 1]]);
        ptr += 2;
        break;
      case 99:
        console.log("halting!", outputs);
        ptr = Number.MAX_SAFE_INTEGER;
    }
  }
  return outputs;
};

export { runIntMachine };