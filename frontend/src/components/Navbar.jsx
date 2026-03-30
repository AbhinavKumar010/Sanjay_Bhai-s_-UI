import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
  <div className="navbar">
    <a href="/">Login</a>
    <a href="/register">Register</a>
  </div>
);
}

export default Navbar;