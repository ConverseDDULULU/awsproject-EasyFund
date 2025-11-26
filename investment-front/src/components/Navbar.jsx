import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
  to="/"
  className="text-2xl font-extrabold tracking-wider drop-shadow-lg flex items-center gap-2"
>
  <span className="uppercase text-white font-black drop-shadow">
    EasyFund
  </span>
</Link>

  <nav className="flex items-center gap-6 text-sm text-white/90 font-semibold tracking-wide">

  <Link
    to="/login"
    className="hover:text-white transition duration-200 hover:drop-shadow-sm"
  >
    로그인
  </Link>


</nav>
      </div>
    </header>
  );
}
