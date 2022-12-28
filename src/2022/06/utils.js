const getIndexAfterDistictBlock = (buffer, numberOfDistinctCharacters) => {
  // const buffer = input[0];

  const window = buffer.slice(0, numberOfDistinctCharacters - 1).split('');
  window.unshift('noop');

  for (
    let index = numberOfDistinctCharacters - 1;
    index < buffer.length - numberOfDistinctCharacters;
    ++index
  ) {
    window.shift();
    window.push(buffer[index]);

    const tempSet = new Set(window);
    if (tempSet.size === numberOfDistinctCharacters) {
      console.log('window', window);
      return index + 1;
    }
  }
};

export { getIndexAfterDistictBlock }
