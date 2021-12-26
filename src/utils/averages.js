const getMedian = input => {
  const midpoint = input.length / 2;
  const high = Math.ceil(midpoint) - 1;
  return input[high];
};

export { getMedian };
