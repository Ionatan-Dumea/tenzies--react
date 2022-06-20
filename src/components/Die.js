import React from "react";

export default function Die(props) {
  const visibleDots = [
    [4],
    [0, 8],
    [0, 4, 8],
    [0, 2, 6, 8],
    [0, 2, 4, 6, 8],
    [0, 2, 3, 5, 6, 8],
  ];

  const dots = [];
  for (let i = 0; i < 9; i++) {
    dots.push(
      <span
        key={i}
        className="dot"
        style={{
          backgroundColor: visibleDots[props.value - 1].includes(i)
            ? "#faf9f6"
            : "transparent",
        }}
      />
    );
  }

  return (
    <div
      className="die"
      style={{
        backgroundColor: props.isHeld ? "#a7f432" : "rgba(222, 49, 99, 0.95)",
      }}
      onClick={props.holdDie}
    >
      {dots}
    </div>
  );
}
