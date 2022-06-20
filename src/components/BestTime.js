import React from "react";
import { formatTime } from "../utils/formatTime";

export default function BestTime({ time }) {
  const formatedBest = formatTime(time);
  return (
    <div className="best-time">
      <span>Time record: </span>
      <span>{formatedBest.minutes}:</span>
      <span>{formatedBest.seconds}:</span>
      <span>{formatedBest.miliseconds}</span>
    </div>
  );
}
