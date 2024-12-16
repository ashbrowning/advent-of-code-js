const xmasRegex = /(XMAS)/g;
const samxRegex = /(SAMX)/g;

const solution = input => {

  console.time('parse');
  // get all rows/columns/diagonals as strings
  // Horizontal
  const lines = [...input];
  // const lines = []

  // Vertical
  for (let i = 0; i < input[0].length; i++) {
    let line = "";
    for (let j = 0; j < input.length; j++) {
      line += input[j][i];
    }
    lines.push(line);
  }

  // Diagonal |/
  for (let y = 0; y < input.length; y++) {
    let line = "";
    for (let x = 0; x <= y; x++) {
      line += input[y - x][x];
    }
    lines.push(line);
  }

  // Diagonal _/
  for (let x = 1; x < input.length; x++) {
    let line = "";

    for (let y = input.length - 1; y - x >= 0; y--) {
      line += input[y][x - y + input.length - 1];
    }
    lines.push(line);
  }

  // Diagonal \|
  for (let x = 0; x < input.length; x++) {
    let line = "";
    for (let y = 0; x - y >= 0; y++) {
      line += input[input.length - 1 - y][x - y];
    }
    lines.push(line);
  }

  // // Diagonal -\
  for (let y = input.length - 2; y >= 0; y--) {
    let line = "";

    for (let x = 0; y - x >= 0; x++) {
      line += input[y - x][input.length - x - 1];
    }
    lines.push(line);
  }

  // for (let line of lines) {
  //   console.log(line);
  // }

  console.timeEnd('parse');
  console.time('calc');
  
  const rval = lines.reduce((acc, line) => {
    const regexMatches = line.match(xmasRegex)?.length || 0;
    const smaxMatches = line.match(samxRegex)?.length || 0;
    // console.log(line, regexMatches, smaxMatches);
    return acc + regexMatches + smaxMatches;
  }, 0)
  console.timeEnd('calc');
  return rval;
};

const answer = 2569;

export { solution, answer };
