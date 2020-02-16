class Reaction {
  constructor({ inputs, output, outputQuantity }) {
    this.inputs = inputs;
    this.output = output;
    this.outputQuantity = outputQuantity;
  }
}

const solution = input => {
  const reactions = input.reduce((memo, line) => {
    const ingredients = line.match(/(\d+ \w+)+/g);
    const [outputQuantity, output] = ingredients.pop().split(' ');
    const inputs = ingredients.reduce((memo, ingredient) => {
      const [quantity, input] = ingredient.split(' ');
      memo[input] = parseInt(quantity, 10);
      return memo;
    }, {});
    memo[output] = new Reaction({
      inputs,
      output,
      outputQuantity: parseInt(outputQuantity, 10)
    });
    return memo;
  }, {});

  // Negative is a requirement, positive is a surplus
  const currentDemand = {
    FUEL: -1
  };

  let ore = 0;

  while (true) {
    const demandedChemicals = Object.keys(currentDemand).filter(
      key => currentDemand[key] < 0
    );

    if (demandedChemicals.length === 0) {
      break;
    }

    // Find chemicals who are not required for reactions to produce things in demand.
    let potentialChemicals = demandedChemicals.filter(
      ingredient =>
        !demandedChemicals.reduce(
          (flag, key) =>
            key === ingredient
              ? flag
              : reactions[key].inputs[ingredient] || flag,
          false
        )
    );

    //Prioritise potential chemicals if they do not have ORE as an ingredient
    let currentChemical =
      potentialChemicals.filter(
        reaction => !reactions[reaction].inputs['ORE']
      )[0] || potentialChemicals[0];

    const reaction = reactions[currentChemical];
    const requiredQuantity = Math.abs(
      Math.floor(currentDemand[currentChemical] / reaction.outputQuantity)
    );

    Object.entries(reaction.inputs).map(([input, quantity]) => {
      if (input === 'ORE') {
        ore += quantity * requiredQuantity;
      } else {
        if (!currentDemand[input]) {
          currentDemand[input] = 0;
        }
        currentDemand[input] -= quantity * requiredQuantity;
      }
    });

    currentDemand[currentChemical] +=
      reaction.outputQuantity * requiredQuantity;
  }

  return ore;
};

const answer = 741927;

export { answer, solution };