const processInput = input => ({
  baseInstructions: input[0],
  rules: input.slice(2).reduce((acc, line) => {
    const [key, value] = line.split(' -> ');
    acc[key] = value;
    return acc;
  }, {})
});

const doSteps = ({ baseInstructions, rules, steps = 10 }) => {
  let pairMap = new Map();
  for (let i = 1; i < baseInstructions.length; ++i) {
    const pair = baseInstructions.slice(i - 1, i + 1);
    pairMap.set(pair, (pairMap.get(pair) || 0) + 1);
  }

  const letterCount = baseInstructions.split('').reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {});

  for (let i = 0; i < steps; ++i) {
    const stepMap = new Map();
    for (const [currentPair, count] of pairMap) {
      const newLetter = rules[currentPair];
      const left = `${currentPair[0]}${newLetter}`;
      const right = `${newLetter}${currentPair[1]}`;
      stepMap.set(left, count + (stepMap.get(left) || 0));
      stepMap.set(right, count + (stepMap.get(right) || 0));
      letterCount[newLetter] = (letterCount[newLetter] || 0) + count;
    }
    pairMap = stepMap;
  }

  const order = Object.keys(letterCount).sort(
    (a, b) => letterCount[b] - letterCount[a]
  );

  return letterCount[order[0]] - letterCount[order[order.length - 1]];
};

export { doSteps, processInput };
