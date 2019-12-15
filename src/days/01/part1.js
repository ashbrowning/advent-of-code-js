const solution = input =>
  input.reduce((memo, component) => (Math.floor(component / 3) - 2 ) + memo, 0);

const answer = 3305301;

export { solution, answer }