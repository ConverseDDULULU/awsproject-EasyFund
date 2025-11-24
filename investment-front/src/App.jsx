import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MarketBar from "./components/MarketBar";
import RequireAuth from "./components/RequireAuth";
import { isAuthenticated } from "./api/auth";

import Home from "./pages/Home";
import Survey from "./pages/survey";
import Result from "./pages/Result";
import PortfolioAnalysis from "./pages/PortfolioAnalysis";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <Navbar />
      {isAuthenticated() && <MarketBar />}{/* 로그인된 사용자에게만 시장 정보 표시 */}

      <div className="w-full min-h-screen px-8 py-6 max-w-7xl mx-auto">

        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/survey"
            element={
              <RequireAuth>
                <Survey />
              </RequireAuth>
            }
          />
          <Route
            path="/result"
            element={
              <RequireAuth>
                <Result />
              </RequireAuth>
            }
          />
          <Route
            path="/portfolio"
            element={
              <RequireAuth>
                <PortfolioAnalysis />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}
