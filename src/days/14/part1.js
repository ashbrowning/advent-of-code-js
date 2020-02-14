const solution = input => {
  const reactions = input
    .map(line => line.split('=>'))
    .reduce((memo, [inputStrs, outputStr]) => {
      const inputs = inputStrs.split(',').reduce((memo, input) => {
        const [quantity, ingredient] = input.trim().split(' ');
        memo[ingredient] = parseInt(quantity, 10);
        return memo;
      }, {});

      const [outputQuantity, outputIngredient] = outputStr.trim().split(' ');
      memo[outputIngredient] = [
        inputs,
        { [outputIngredient]: parseInt(outputQuantity, 10) }
      ];
      return memo;
    }, {});

  console.log('reactions', reactions);

  let flag = false;

  // Use minus a surplus
  const currentDemand = {
    FUEL: 1
  };

  while (!(currentDemand['ORE'] && Object.keys(currentDemand).length === 1)) {
    // Find the reaction from current demand that does not depend on others

    console.log('');

    const demandKeys = Object.keys(currentDemand).filter(
      key => currentDemand[key] > 0
    );

    // let currentReaction =
    //   demandKeys[0] !== 'ORE' ? demandKeys[0] : demandKeys[1];

    let currentReaction;
    let validReactions = [];

    //Optimisation to chose a current Demand ingredient that is not needed for subsequent reactions

    // For each demanded ingredient, choose the one that does not feature in inputs for other demanded ingerdients
    demandKeys.forEach(ingredient => {
      if (ingredient === 'ORE') return;

      const isStandalone = !demandKeys.reduce((flag, key) => {
        // if (key === 'ORE') return true
        if (key === 'ORE' || key === ingredient) return flag;
        // console.log('isstandalone', ingredient, reactions[key][0], reactions[key][0][ingredient])
        return reactions[key][0][ingredient] || flag;
      }, false);

      //Prioritise standalones if they do not have ORE as an ingredient

      if (isStandalone) {
        console.log('isStandaline!', ingredient);
        currentReaction = ingredient;
        validReactions.push(ingredient);
      }
    });

    console.log('validReaction', validReactions);
    currentReaction =
      validReactions.filter(reaction => !reactions[reaction][0]['ORE'])[0] ||
      validReactions[0];

    console.log('currentReaction', currentReaction);
    console.log('current demand', currentDemand);

    const reaction = reactions[currentReaction];
    const outputQuantity = reaction[1][currentReaction];

    const requiredQuantity = Math.ceil(
      currentDemand[currentReaction] / outputQuantity
    );

    Object.entries(reactions[currentReaction][0]).map(([input, quantity]) => {
      console.log('input, quant', input, quantity, quantity * requiredQuantity);
      if (currentDemand[input]) {
        currentDemand[input] += quantity * requiredQuantity;
      } else {
        currentDemand[input] = quantity * requiredQuantity;
      }
    });

    // delete currentDemand[currentReaction];
    currentDemand[currentReaction] -=
      reactions[currentReaction][1][currentReaction] * requiredQuantity;
  }

  return currentDemand['ORE'];
};

const answer = 741927;

export { answer, solution };

// 16 DSFDZ => 1 FUEL
// 1 QSLKV, 13 XRBKF => 5 DSFDZ
// 2 VCJSD, 1 XRBKF => 8 QSLKV
// 1 LSLP => 6 XRBKF
// 15 GJDPC => 7 LSLP
// 5 GJDPC => 6 VCJSD
// 1 SHMGH, 1 ZTXNJ => 4 GJDPC
// 195 ORE => 7 SHMGH
// 104 ORE => 3 ZTXNJ





// 1 DSQLK, 4 WFDK, 1 BVSL => 1 FUEL
// 5 HVPMK => 9 DSQLK
// 2 ZXTQ, 6 NTMRX => 4 WFDK
// 18 TGMNG => 4 HVPMK
// 9 VCJSD, 14 SXNZP => 4 TGMNG
// 11 BVSL => 6 SXNZP
// 1 TLJL => 5 BVSL
// 1 QSLKV, 13 XRBKF => 5 NTMRX
// 11 GDPLN => 8 KHRFD
// 15 VCJSD => 7 LSLP
// 195 ORE => 7 SHMGH
// 2 VCJSD, 1 XRBKF => 8 QSLKV
// 8 ZTXNJ, 4 TLJL => 2 MSZWL
// 155 ORE => 1 GDPLN
// 7 TLJL, 16 MSZWL, 5 KHRFD => 2 ZXTQ
// 1 SHMGH, 1 ZTXNJ => 4 GJDPC
// 5 GJDPC => 6 VCJSD
// 104 ORE => 3 ZTXNJ
// 1 LSLP => 6 XRBKF
// 164 ORE => 2 TLJL