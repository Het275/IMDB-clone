import React from "react";
import Logo from "../assets/movie.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex border items-center space-x-8 pl-5 py-5">
      <img src={Logo} alt="movie.svg" className="w-10" />
      <Link to="/" className="text-blue-600 font-bold text-2xl">Movies</Link>
      <Link to="/watchlist" className="text-blue-600 font-bold text-2xl">WatchList</Link>
    </div>
  );
}

export default Navbar;
