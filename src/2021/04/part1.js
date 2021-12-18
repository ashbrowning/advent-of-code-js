const addColumns = board => {
  const length = board.length;
  for (let i = 0; i < length; ++i) {
    const col = [];
    for (let j = 0; j < length; ++j) {
      col.push(board[j][i]);
    }
    board.push(col);
  }
  return board;
};

const rowRegex = /^\s?(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)$/;

const updateBoard = (board, calledNumber) =>
  board.map(row => {
    const index = row.findIndex(n => n === calledNumber);
    if (index === -1) {
      return row;
    } else {
      return row.splice(index, 1);
    }
  });

const checkBoard = board => board.some(row => row.length === 0);

const sumBoard = board => {
  return (
    board.reduce((acc, row) => {
      return (
        acc +
        row.reduce((rowAcc, no) => {
          return rowAcc + no;
        }, 0)
      );
    }, 0)
  );
};

const parseBoards = input => {
  const boards = [[]];
  for (let i = 0; i < input.length; ++i) {
    const match = input[i].match(rowRegex);

    if (!match) {
      boards.push([]);
      continue;
    }

    boards[boards.length - 1].push(match.slice(1).map(n => +n));
  }

  return boards;
}

const solution = input => {
  const calledNumbers = input[0].split(',').map(i => +i);

  const parsedBoards = parseBoards(input.slice(2)).map(addColumns);

  let winningIndex;
  let calledNumber;

  for (let i = 0; i < calledNumbers.length; ++i) {
    calledNumber = calledNumbers[i];
    parsedBoards.map(board => updateBoard(board, calledNumber));
    winningIndex = parsedBoards.findIndex(checkBoard);
    if (winningIndex !== -1) {
      break;
    }
  }

  const sum = sumBoard(parsedBoards[winningIndex].slice(0, 5)); //Ignore the columns while summing

  return sum * calledNumber;
};

const answer = 71708;

export { solution, answer };
