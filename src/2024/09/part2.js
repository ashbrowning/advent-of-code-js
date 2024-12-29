const isEmptyBlock = (index) => Boolean(index % 2);
const getFileId = (index) => index / 2;

const solution = input => {
  const originalDisk = input[0].split('').map(block => Number.parseInt(block));
  const rawBlocks = [];

  for (let i = 0; i < originalDisk.length; i++) {
    const blockSize = originalDisk[i];
    const isEmpty = isEmptyBlock(i);
    rawBlocks.push({ size: blockSize, value: isEmpty ? null : getFileId(i), isEmpty: isEmptyBlock(i), moved: false });
  }

  for (let i = rawBlocks.length - 1; i >= 0; --i) {
    const block = rawBlocks[i];
    if (block.isEmpty || block.moved) {
      continue;
    }

    const size = block.size;
    for (let j = 0; j < rawBlocks.length; j++) {
      const maybeEmptyBlock = rawBlocks[j];
      if (!maybeEmptyBlock) {
        debugger;
      }
      if (!maybeEmptyBlock.isEmpty || maybeEmptyBlock.size < size || j >= i) {
        continue;
      }

      // Insert before empty block
      const newBlock = { size, value: block.value, isEmpty: false, moved: true };
      rawBlocks.splice(j, 0, newBlock);
      // Convert old block to empty block
      rawBlocks[i] = { size: size, value: null, isEmpty: true, moved: false };

      // Reduce or remove taken empty block
      if (size === maybeEmptyBlock.size) {
        // Remove the block
        rawBlocks.splice(j + 1, 1)
      } else {
        maybeEmptyBlock.size -= size;
      }

      break;
    }
  }

  let index = 0;
  return rawBlocks.reduce((acc, block) => {
    for (let i = 0; i < block.size; i++) {
      acc += ((block.value ?? 0) * (index + i))
    }
    index += block.size;
    return acc;
  }, 0);
};

const answer = 6427437134372;

export { solution, answer };
