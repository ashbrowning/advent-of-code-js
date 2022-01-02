const getEdgesMap = input => {
  const edges = {};

  for (let line of input) {
    const [from, to] = line.split('-');

    if (edges[from]) {
      edges[from].push(to);
    } else {
      edges[from] = [to];
    }

    if (edges[to]) {
      edges[to].push(from);
    } else {
      edges[to] = [from];
    }
  }

  return edges;
};

export { getEdgesMap };