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
    let i = index + 1;  //Start on the next line (ie, the ls output)
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

    // Return the index for the loop to pick up from (ie, the next line after ls output)
    return i - 1;
  };

  // Parse instruction list
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

  // Get a Set of all paths/directories we don't know the size of
  const unknownSizedDirectories = new Set(
    Object.entries(sizeMap)
      .filter(([_, size]) => size === null)
      .map(([name]) => name)
  );

  // Until we know the size of all directories, find those whom we know the size of each item within it
  // and calculate the directory size.
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

  // Return a map of directory path keys to size values
  return Object.fromEntries(
    Object.entries(directoryMap).map(([dir]) => [dir, sizeMap[dir]])
  );
};

export { getDirectorySizes };
