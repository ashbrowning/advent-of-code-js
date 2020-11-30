const HEIGHT = 6;
const WIDTH = 25;
const PIXELS_IN_LAYER = HEIGHT * WIDTH;

const solution = input => {
  const image = [];
  input[0].split('').forEach((pixel, index) => {
    const layer = Math.floor(index / PIXELS_IN_LAYER);
    if (!image[layer]) {
      image[layer] = [];
    }
    image[layer].push(pixel);
  });

  const leastZeroes = image
    .map(layer => layer.filter(p => p === "0").length)
    .reduce(
      (memoIdx, layer, idx, zeroes) =>
        layer < zeroes[memoIdx] ? idx : memoIdx,
      0
    );

  return image[leastZeroes].filter(p => p === "1").length * image[leastZeroes].filter(p => p === "2").length;
};

const answer = 1703;

export { solution, answer };
