const solution = input => {
  // Add the start jolt into the set too. Device jolt not required as it is dynamically based on adapter jolts
  const uniqSet = new Set();
  const sortedInput = input.map(n => +n).sort((a, b) => a - b);
  sortedInput.unshift(0);

  // Find where gaps of three exist and split
  const buckets = [[0]];
  for (let i = 1; i < sortedInput.length; ++i) {
    if (sortedInput[i] - sortedInput[i - 1] === 3) {
      buckets.push([sortedInput[i]]);
    } else {
      buckets[buckets.length - 1].push(sortedInput[i]);
    }
  }

  // Iteratively calculate number of paths in the graph to get to the respective index in the array
  // ie, with 1-2-3, index 2 would have a 2 paths to it. Adding a fourth node of '4' to the mix would
  // add edges to indexes to all existing nodes (as they are within 3 difference of '4') so add the
  // subgraph paths that now connect to '4' togther (ie, 1 + 1 + 2 = 4); This means there are 4 paths
  // to get to 4
  const numberOfOptions = buckets.map(bucket => {
    const graphPathsToNode = [1];

    for (let index = 1; index < bucket.length; ++index) {
      const val = bucket[index];
      let branches = 0;
      for (let i = 1; i <= 3; ++i) {
        if (
          bucket?.[index - i] !== undefined &&
          !(bucket?.[index - i] < val - 3)
        ) {
          branches += graphPathsToNode[index - i];
        }
      }
      graphPathsToNode.push(branches);
    }
    return graphPathsToNode.pop();
  });
  return numberOfOptions.reduce((acc, options) => acc * (options || 1), 1);
};

const answer = 74049191673856;

export { solution, answer };
