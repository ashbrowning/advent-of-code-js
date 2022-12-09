// A = Rock
// B = Paper
// C = Scissors

const myHandScores = {
  A: 1,
  B: 2,
  C: 3
};

const winningHands = {
  B: 'A',
  C: 'B',
  A: 'C'
};

const getGameScore = (myHand, theirHand) => {
  if (theirHand === myHand) {
    return 3;
  } else if (winningHands[myHand] === theirHand) {
    return 6;
  } else {
    return 0;
  }
};

const solution = input => {
  const parsedInput = input
    .map(line => line.split(' '))
    .map(tuple => [tuple[0], String.fromCharCode(tuple[1].charCodeAt() - 23)]);

  return parsedInput.reduce((acc, tuple) => {
    const [thierHand, myHand] = tuple;
    const myHandScore = myHandScores[myHand];
    return acc + myHandScore + getGameScore(myHand, thierHand);
  }, 0);
};

const answer = 11906;

export { solution, answer };
