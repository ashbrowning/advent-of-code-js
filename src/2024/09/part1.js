const isEmptyBlock = (index) => index % 2;
const getFileId = (index) => index / 2;

const appendToArray = (arr, size, value) => arr.push(...(new Array(size).fill(value)));

const solution = input => {
  const originalDisk = input[0].split('').map(block => Number.parseInt(block));

  const newDisk = [];

  let originalDiskEnd = originalDisk.length - 1;
  let endBlockID = getFileId(originalDiskEnd);

  function* getEndValueGenerator() {
    for (let blockId = endBlockID; blockId >= 0; --blockId) {
      const blockSizeRemaining = originalDisk[blockId * 2];
      for (let sizeLeft = blockSizeRemaining; sizeLeft > 0; --sizeLeft) {
        yield blockId;
      }
    }
  }

  const endValueGenerator = getEndValueGenerator();

  for (let i = 0; i < originalDisk.length; i++) {
    const blockSize = originalDisk[i];
    if (getFileId(i) === newDisk.at(-1)) {
      const fileId = getFileId(i);
      const fileIdsAlreadyIn = newDisk.filter(id => id === getFileId(i)).length;
      appendToArray(newDisk, blockSize - fileIdsAlreadyIn, fileId)
      break;
    }

    if (isEmptyBlock(i)) {
      const newBlock = [];
      for (let spaceLeft = blockSize; spaceLeft > 0; --spaceLeft) {
        const blockValue = endValueGenerator.next().value;
        if (blockValue >= getFileId(i)) {
          newBlock.push(blockValue);
        }
      }
      newDisk.push(...newBlock);
    } else {
      const fileId = getFileId(i);
      if (newDisk.at(-1) !== fileId) {
        appendToArray(newDisk, blockSize, fileId)
      }
    }
  }

  return newDisk.reduce((acc, value, index) => acc + (value * index), 0);
};

const answer = 6398608069280;

export { solution, answer };
