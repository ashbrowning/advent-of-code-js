const getMode = input => {
  const bucketed = input.reduce((acc, crab) => {
    acc[crab] = (acc[crab] ?? 0) + 1;
    return acc;
  }, {});

  const pair = Object.entries(bucketed).reduce(
    (acc, [crab, count]) => (acc[1] < count ? [crab, count] : acc),
    [0, 0]
  );
  return pair[0];
};

const getMedian = input => {
  const midpoint = input.length / 2;
  const heigh = Math.ceil(midpoint);
  const low = Math.floor(midpoint);
  return (input[heigh] + input[low]) / 2;
};

const getMean = input => {
  const total = input.reduce((acc, n) => acc + n, 0);
  return total / input.length;
};

const getTriangleNumber = number => {
  if (number % 2) {
    return Math.ceil(number / 2) * number;
  } else {
    return (number + 1) * (number / 2);
  }
};

export { getMedian, getMean, getMode, getTriangleNumber };