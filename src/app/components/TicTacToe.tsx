import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTicTacToe } from "../hooks/use-TicTacToe";

export default function TicTacToe() {
  const { board, xIsNext, winner, winningLine, handleClick, resetGame } =
    useTicTacToe();

  const renderSquare = (i: number) => {
    const isWinningSquare = winningLine && winningLine.includes(i);

    return (
      <Button
        variant="outline"
        className={`w-20 h-20 text-4xl relative
          ${isWinningSquare ? "bg-green-100" : ""}
          ${isWinningSquare && winner === "X" ? "text-blue-600" : ""}
          ${isWinningSquare && winner === "O" ? "text-red-600" : ""}
        `}
        onClick={() => handleClick(i)}
      >
        {board[i]}
        {isWinningSquare && (
          <div className="absolute inset-0 border-4 border-green-500 pointer-events-none"></div>
        )}
      </Button>
    );
  };

  return (
    <Card className="w-96 mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">
          {winner !== null
            ? winner === null
              ? "let's start!"
              : `Winner: ${winner}!`
            : board.every((square) => square !== null)
            ? "Game Over!"
            : `Next Player: ${xIsNext ? "X" : "O"}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {board.map((_, i) => (
            <div key={i}>{renderSquare(i)}</div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button onClick={resetGame} className="mt-4">
            Reset Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
