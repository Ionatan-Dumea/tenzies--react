import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Timer from "./components/Timer";
import BestTime from "./components/BestTime";

/* useWindowSize CUSTOM HOOK */
function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
}

export default function App() {
  const [gameOver, setGameOver] = useState(false);
  const [dice, setDice] = useState(generateRandomDice());
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("best_time")
      ? parseInt(localStorage.getItem("best_time"))
      : ""
  );
  const [newBestTime, setNewBestTime] = useState(false);

  useEffect(() => {
    const firstDie = dice[0].value;
    let gameOver =
      dice.every((die) => die.isHeld === true) &&
      dice.every((die) => die.value === firstDie);
    if (gameOver) {
      setGameOver(true);
      if (time < bestTime || !bestTime) {
        setBestTime(time);
        localStorage.setItem("best_time", time.toString());
        setNewBestTime(true);
      }
    }
  }, [dice]);

  function newDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function generateRandomDice() {
    const randomDice = [];
    for (let i = 0; i < 10; i++) {
      randomDice.push(newDie());
    }
    return randomDice;
  }

  function holdDie(id) {
    setRunning(true);
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice(e) {
    if (!gameOver) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : newDie();
        })
      );
    } else {
      setDice(generateRandomDice());
      setGameOver(false);
      setTime(0);
      setRunning(false);
      setNewBestTime(false);
    }
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));
  const [height, width] = useWindowSize();
  return (
    <div>
      {gameOver && <Confetti height={height} width={width} />}
      <div className="board">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-btn" onClick={(e) => rollDice(e)}>
          {gameOver ? "New Game" : "Roll"}
        </button>

        <Timer
          time={time}
          setTime={setTime}
          running={running}
          gameOver={gameOver}
          newBestTime={newBestTime}
        />

        <BestTime time={bestTime} />
      </div>
    </div>
  );
}
