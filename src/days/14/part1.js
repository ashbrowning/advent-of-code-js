const solution = input => {

  const reactions = input
    .map(line => line.split('=>'))
    .reduce((memo, [inputStrs, outputStr]) => {
      const inputs = inputStrs.split(',').reduce((memo, input) => {
        const [quantity, ingredient] = input.trim().split(' ');
        memo[ingredient] = parseInt(quantity, 10);
        return memo;
      }, {});

      console.log('inputs', inputs);
      const [outputQuantity, outputIngredient] = outputStr.trim().split(' ');
      memo[outputIngredient] = [
        inputs,
        { [outputIngredient]: parseInt(outputQuantity, 10) }
      ];
      return memo;
    }, {});

  console.log('reactions', reactions);

  let flag = false;

  const currentDemand = {
    FUEL: 1
  };

  while (!(currentDemand['ORE'] && Object.keys(currentDemand).length === 1)) {
    // Find the reaction from current demand that does not depend on others

    console.log('');

    const demandKeys = Object.keys(currentDemand);

    // let currentReaction =
    //   demandKeys[0] !== 'ORE' ? demandKeys[0] : demandKeys[1];

    let currentReaction;

    //Optimisation to chose a current Demand ingredient that is not needed for subsequent reactions

    // For each demanded ingredient, choose the one that does not feature in inputs for other demanded ingerdients
    for (const ingredient in currentDemand) {
      if (ingredient === 'ORE') continue;

      const isStandalone = !(demandKeys.reduce((flag, key) => {
        if (key === 'ORE' || key === ingredient) return flag;
        return reactions[key][0][ingredient] || flag;
      }, false));

      if (isStandalone) {
        currentReaction = ingredient;
      }
    }

    console.log('currentReaction', currentReaction);
    console.log('current demand', currentDemand);


    const reaction = reactions[currentReaction];
    const outputQuantity = reaction[1][currentReaction];

    const requiredQuantity = Math.ceil(currentDemand[currentReaction] / outputQuantity);

    Object.entries(reactions[currentReaction][0]).map(([input, quantity]) => {
      console.log('input, quant', input, quantity);
      if (currentDemand[input]) {
        currentDemand[input] += (quantity * requiredQuantity);
      } else {
        currentDemand[input] = (quantity * requiredQuantity);
      }
    });

    delete currentDemand[currentReaction];
    console.log('currentD', currentDemand);
  }

  return currentDemand['ORE'];
};

const answer = 226;

export { answer, solution };
