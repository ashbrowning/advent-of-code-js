const myHandScores = {
  A: 1,
  B: 2,
  C: 3
};

// key beats value
const winningHands = {
  B: 'A',
  C: 'B',
  A: 'C'
};

// key loses to value
const losingHands = {
  A: 'B',
  B: 'C',
  C: 'A'
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

const calculateScore = input =>
  input.reduce((acc, tuple) => {
    const [theirHand, myHand] = tuple;
    const myHandScore = myHandScores[myHand];
    return acc + myHandScore + getGameScore(myHand, theirHand);
  }, 0);

export { calculateScore, losingHands, winningHands };
