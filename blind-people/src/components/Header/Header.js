import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

function Header() {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <img
          alt="logo"
          className="logo"
          src="https://t4.ftcdn.net/jpg/02/28/34/87/360_F_228348761_mUepq4xFEZ6ecodMvDrgt5935G5JcgUE.jpg"
          title="Home"
        />
      </Link>
      <div className="options">
        <Link className="option" to="/braile-keyboard">
          <span className="navhead"> Braille Keyboard </span>
        </Link>
        <Link className="option" to="/text-braile">
          <span className="navhead"> Text to Braille </span>
        </Link>
        <Link className="option" to="/braile-converter">
          <span className="navhead"> Braille to Text </span>
        </Link>
        <Link className="option" to="/learn-more">
          <span className="navhead"> Learn More </span>
        </Link>
        <Link className="option" to="/learn-more">
          <span className="navhead"> Sign In </span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
