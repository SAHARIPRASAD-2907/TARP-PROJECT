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
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTUgMTJjMCAxLjY1NC0xLjM0NiAzLTMgM3MtMy0xLjM0Ni0zLTMgMS4zNDYtMyAzLTMgMyAxLjM0NiAzIDN6bTktLjQ0OXMtNC4yNTIgOC40NDktMTEuOTg1IDguNDQ5Yy03LjE4IDAtMTIuMDE1LTguNDQ5LTEyLjAxNS04LjQ0OXM0LjQ0Ni03LjU1MSAxMi4wMTUtNy41NTFjNy42OTQgMCAxMS45ODUgNy41NTEgMTEuOTg1IDcuNTUxem0tNyAuNDQ5YzAtMi43NTctMi4yNDMtNS01LTVzLTUgMi4yNDMtNSA1IDIuMjQzIDUgNSA1IDUtMi4yNDMgNS01eiIvPjwvc3ZnPg=="
        />
      </Link>
      <div className="options">
        <Link className="option" to="/braile-keyboard">
          BRAILE KEYBOARD
        </Link>
        <Link className="option" to="/text-braile">
          TEXT TO BRAILE
        </Link>
        <Link className="option" to="/braile-converter">
          BRAILE CONVERTER
        </Link>
        <Link className="option" to="/sign-language-converter">
          SIGN LANGUAGE CONVERTER
        </Link>
        <Link className="option" to="/learn-more">
          LEARN MORE
        </Link>
        <Link className="option" to="/learn-more">
          SIGN IN
        </Link>
      </div>
    </div>
  );
}

export default Header;
