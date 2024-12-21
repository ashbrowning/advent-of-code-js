const parseInput = (input) => {
  const rules = [];
  const updates = [];

  let midPointFound = false;
  for (const line of input) {
    if (line === '') {
      midPointFound = true;
      continue;
    }

    (midPointFound ? updates : rules).push(line);
  }

  return { rules, updates };
}

const parseRules = (rules) => {
  const pageRules = {}
  for (const rule of rules) {
    const [prev, next] = rule.split('|');
    console.log('prev', prev, next);
    if (pageRules[prev] === undefined) {
      pageRules[prev] = new Set();
    }
    pageRules[prev].add(next);
  }
  return pageRules;
}

const parseUpdates = (updates) => {
  return updates.map(update => update.split(','));
}

const isUpdateValid = (rules, update) => {
  return update.every((_, i, arr) => {

    // Check both ways
    const sliceBefore = update.slice(0, i);
    const sliceAfter = update.slice(i + 1);
    const updateNumber = update[i];

    const isBeforeOkay = sliceBefore.every((num) => (!rules[num] || rules[num]?.has(updateNumber)) && (!rules[updateNumber] || !rules[updateNumber]?.has(num)));
    const isAfterOkay = sliceAfter.every((num) => (!rules[updateNumber] || rules[updateNumber]?.has(num)) && (!rules[num] || !rules[num]?.has(updateNumber)));

    return isBeforeOkay && isAfterOkay;
  })
}


const solution = input => {
  const parsedInput = parseInput(input);
  const rules = parseRules(parsedInput.rules);
  const updates = parseUpdates(parsedInput.updates);

  const filteredUpdates = updates.filter(update => isUpdateValid(rules, update));

  return filteredUpdates.map(update => {
    // return middle value
    return update[Math.floor(update.length / 2)]
  }).reduce((acc, value) => {
    return acc + Number.parseInt(value);
  }, 0);

};

const answer = 4578;

export { solution, answer };
