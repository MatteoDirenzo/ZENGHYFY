import React from "react";
import "./Slider.css";

export default function Slider({ number }) {
  if (number < 0.1) {
    number = 0.1;
  }

  return (
    <div className="slider-container">
      <div
        className="slider-inner"
        id="slide"
        style={{ height: number * 100 + "%", width: "auto" }}
      ></div>
    </div>
  );
}
