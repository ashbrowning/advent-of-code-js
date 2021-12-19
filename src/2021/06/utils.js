const processFish = (input, days) => {
  const fishCounts = input[0].split(',').reduce((acc, fish) => {
    acc[+fish] += 1;
    return acc;
  }, new Array(9).fill(0));

  for(let i = 0; i < days; ++i) {
    const birthingFish = fishCounts.shift();
    fishCounts.push(birthingFish);
    fishCounts[6] += birthingFish;
  }

  return fishCounts.reduce((acc, fish) => acc + fish, 0);
}

export { processFish };
