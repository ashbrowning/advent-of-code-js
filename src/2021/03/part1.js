const getFlipIndex = (rows, index) => {
  return rows
    .sort((a, b) => a[index] - b[index])
    .findIndex(row => row[index] === '1');
};

const solution = input => {
  const gamma = input[0].split('').reduce((acc, value, i) => {
    const flipIndex = getFlipIndex(input, i);
    acc.push(flipIndex > Math.floor(input.length / 2) ? '0' : '1');
    return acc;
  }, []);

  const epsilon = gamma.map(bit => (bit === '1' ? '0' : '1'));

  return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
};

const answer = 3148794;

export { solution, answer };
