export const solution = input =>
  input.reduce((memo, component) => (Math.floor(component / 3) - 2 ) + memo, 0);

// module.exports = {
//   solution,
//   answer: 3305301
// };

// export solution;