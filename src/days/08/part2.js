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

  const renderedImage = [];
  for(let i = 0; i < image[0].length; ++i) {
    for(let j = 0; j < image.length; ++j) {
      if (image[j][i] === '2') {
        continue;
      } else if (image[j][i] === '1') {
        renderedImage[i] = '■';
        break;
      } else if (image[j][i] === '0') {
        renderedImage[i] = '□';
        break;
      }
    }
  }

  // for (let i = 0; i < HEIGHT; ++i) {
  //   console.log(renderedImage.slice(i * WIDTH, i * WIDTH + WIDTH).join());
  // }
  // return 'HCGFE'
  return renderedImage.join();
};

const answer = '■,□,□,■,□,□,■,■,□,□,□,■,■,□,□,■,■,■,■,□,■,■,■,■,□,■,□,□,■,□,■,□,□,■,□,■,□,□,■,□,■,□,□,□,□,■,□,□,□,□,■,■,■,■,□,■,□,□,□,□,■,□,□,□,□,■,■,■,□,□,■,■,■,□,□,■,□,□,■,□,■,□,□,□,□,■,□,■,■,□,■,□,□,□,□,■,□,□,□,□,■,□,□,■,□,■,□,□,■,□,■,□,□,■,□,■,□,□,□,□,■,□,□,□,□,■,□,□,■,□,□,■,■,□,□,□,■,■,■,□,■,□,□,□,□,■,■,■,■,□';

export { solution, answer };
