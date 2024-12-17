import { useState } from "react";
type SquareValue = "X" | "O" | null;

export function useTicTacToe() {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<SquareValue>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const calculateWinner = (squares: SquareValue[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          line: lines[i],
        };
      }
    }

    return null;
  };

  const handleClick = (i: number) => {
    const boardCopy = [...board];

    if (winner || boardCopy[i]) return;

    boardCopy[i] = xIsNext ? "X" : "O";

    setBoard(boardCopy);
    setXIsNext(!xIsNext);

    const result = calculateWinner(boardCopy);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return {
    board,
    xIsNext,
    winner,
    winningLine,
    handleClick,
    resetGame,
  };
}
