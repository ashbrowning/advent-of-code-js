const operationOptionCache = {};

const getOperationOptions = (numberOfOptions) => {
  if (operationOptionCache[numberOfOptions]) {
    return operationOptionCache[numberOfOptions];
  }
  const operators = ['+', '*', '||'];
  let options = operators.map(operator => [operator]);

  for (let i = 1; i < numberOfOptions; i++) {
    const newOptions = [];
    for (const operator of operators) {
      for (const option of options) {
        newOptions.push([operator, ...option]);
      }
    }
    options = newOptions;
  }

  operationOptionCache[numberOfOptions] = options;
  return options;
}

const doCalc = (a, b, operator) => {
  switch (operator) {
    case '+':
      return a + b;
    case '*':
      return a * b;
    case '||':
      return Number.parseInt(`${a}${b}`);
  }
}

const solution = input => {
  const allCalibrations = input.reduce((acc, line) => {
    const [target, numbersStr] = line.split(':');
    const numbers = numbersStr.trim().split(' ').map(Number);
    acc.push([Number.parseInt(target), numbers]);
    return acc;
  }, []);

  const validCalibrations = [];

  for (const calibration of allCalibrations) {
    const [target, numbers] = calibration;
    const options = getOperationOptions(numbers.length - 1);

    for (const option of options) {
      let result = numbers[0];
      for (let i = 0; i < option.length; i++) {
        result = doCalc(result, numbers[i + 1], option[i]);
        if (result > target) {
          break;
        }
      }
      if (result === target) {
        validCalibrations.push(result);
        break;
      }
    }
  }

  return validCalibrations.reduce((acc, value) => acc + value, 0);

};

const answer = 581941094529163;

export { solution, answer };
