const getDirectorySizes = input => {
  const pathStack = [];
  const directoryMap = {};
  const sizeMap = { '/': null };

  const cd = path => {
    if (path === '..') {
      pathStack.pop();
    } else {
      pathStack.push(path);
    }
  };

  const ls = index => {
    const path = pathStack.join('/');
    let i = index + 1;
    directoryMap[path] = directoryMap[path] ?? [];

    for (; !input[i]?.startsWith('$') && input[i]; ++i) {
      const [size, name] = input[i].split(' ');
      const itemPath = `${path}/${name}`;
      directoryMap[path].push(itemPath);
      if (size === 'dir') {
        directoryMap[itemPath] = [];
        sizeMap[itemPath] = null;
      } else {
        sizeMap[itemPath] = Number(size);
      }
    }
    return i - 1;
  };

  for (let i = 0; i < input.length; ++i) {
    const line = input[i];
    switch (true) {
      case line.startsWith('$ cd'):
        cd(line.split('$ cd')[1].trim());
        break;
      case line.startsWith('$ ls'):
        i = ls(i);
        break;
      default:
        break;
    }
  }

  const unknownSizedDirectories = new Set(
    Object.entries(sizeMap)
      .filter(([_, size]) => size === null)
      .map(([name]) => name)
  );

  while (!(unknownSizedDirectories.size === 0)) {
    for (const dir of unknownSizedDirectories) {
      if (directoryMap[dir].every(child => sizeMap[child])) {
        sizeMap[dir] = directoryMap[dir].reduce(
          (acc, child) => acc + sizeMap[child],
          0
        );
        unknownSizedDirectories.delete(dir);
      }
    }
  }

  return Object.fromEntries(
    Object.entries(directoryMap).map(([dir]) => [dir, sizeMap[dir]])
  );
};

export { getDirectorySizes };
