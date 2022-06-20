import React, { useEffect } from "react";
import { formatTime } from "../utils/formatTime";

export default function Timer({
  time,
  running,
  setTime,
  gameOver,
  newBestTime,
}) {
  const formatedTime = formatTime(time);

  useEffect(() => {
    let interval = null;
    if (running && !gameOver) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, gameOver]);

  return (
    <div>
      <span>{formatedTime.minutes}:</span>
      <span>{formatedTime.seconds}:</span>
      <span>{formatedTime.miliseconds}</span>
      {newBestTime && <span className="new-best-time">🎉 new record 🎉</span>}
    </div>
  );
}
