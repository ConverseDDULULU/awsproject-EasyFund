import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, isAuthenticated, logout } from "../api/auth";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authState, setAuthState] = React.useState({
    authed: isAuthenticated(),
    user: getUser(),
  });

  const userLabel = authState.user?.name
    ? `${authState.user.name}님 환영합니다`
    : "";

  React.useEffect(() => {
    setAuthState({
      authed: isAuthenticated(),
      user: getUser(),
    });
  }, [location]);

  function handleLogout() {
    logout();
    setAuthState({ authed: false, user: null });
    navigate("/login");
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wider drop-shadow-lg flex items-center gap-2"
        >
          <span className="uppercase text-white font-black drop-shadow">EasyFund</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm text-white/90 font-semibold tracking-wide">
          {authState.authed ? (
            <>
              {userLabel && (
                <span className="px-3 py-1 rounded-full bg-white/15 text-white drop-shadow-sm">
                  {userLabel}
                </span>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-md bg-white/15 hover:bg-white/25 transition duration-200"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="hover:text-white transition duration-200 hover:drop-shadow-sm"
              >
                회원가입
              </Link>
              <Link
                to="/login"
                className="hover:text-white transition duration-200 hover:drop-shadow-sm"
              >
                로그인
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
