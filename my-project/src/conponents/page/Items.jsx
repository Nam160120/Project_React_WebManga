import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Items() {
  return (
    <div className="itemsManga">
      <div className="back">
        <Link to="/">Back to home</Link>
      </div>
      <p> Nothing to read !</p>
      <div className="imgItems">
        <img src="/meme.jpg" alt="" />
      </div>
    </div>
  );
}

export default Items;
