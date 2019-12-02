const dayResolver = day => !day.length || day.length === 1 ? `0${day}` : `${day}`;

const getSolutionPath = (day, part) => `${__dirname}/../src/days/${dayResolver(day)}/part${part}.js`;

const getInputPath = (day) => `${__dirname}/../src/days/${dayResolver(day)}/input.txt`;

module.exports = {
  getInputPath,
  getSolutionPath
};