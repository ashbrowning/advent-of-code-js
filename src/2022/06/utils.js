const getIndexAfterDistictBlock = (buffer, numberOfDistinctCharacters) => {
  const window = buffer.slice(0, numberOfDistinctCharacters - 1).split('');
  window.unshift('noop');

  for (
    let index = numberOfDistinctCharacters - 1;
    index < buffer.length - 1;
    ++index
  ) {
    window.shift();
    window.push(buffer[index]);

    const tempSet = new Set(window);
    if (tempSet.size === numberOfDistinctCharacters) {
      return index + 1;
    }
  }
};

export { getIndexAfterDistictBlock };
