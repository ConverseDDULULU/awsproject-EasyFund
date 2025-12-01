import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import MarketBar from "./components/MarketBar";
import RequireAuth from "./components/RequireAuth";
import { isAuthenticated } from "./api/auth";

import Survey from "./pages/Survey";
import Result from "./pages/Result";
import PortfolioAnalysis from "./pages/PortfolioAnalysis";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Layout() {
  const location = useLocation();
  const authed = isAuthenticated();

  // 로그인/회원가입 페이지에서는 마켓바 숨김
  const hideMarketBar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      <Navbar />
      {authed && !hideMarketBar && <MarketBar />}

      <div className="w-full min-h-screen px-8 py-6 max-w-7xl mx-auto">
        <Routes>
          {/* 🔥 홈: 로그인 여부에 따라 이동 */}
          <Route
            path="/"
            element={
              authed ? (
                <Navigate to="/portfolio" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 로그인/회원가입 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 설문 및 결과 페이지: 로그인 필요 */}
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

          {/* 나머지는 홈으로 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
