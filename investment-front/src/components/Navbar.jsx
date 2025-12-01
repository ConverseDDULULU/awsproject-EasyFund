// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getUser, isAuthenticated, logout } from "../api/auth";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [authState, setAuthState] = React.useState({
//     authed: isAuthenticated(),
//     user: getUser(),
//   });

//   const userLabel = authState.user?.name
//     ? `${authState.user.name}\ub2d8 \ud658\uc601\ud569\ub2c8\ub2e4!`
//     : "";

//   React.useEffect(() => {
//     const syncAuth = () => {
//       setAuthState({
//         authed: isAuthenticated(),
//         user: getUser(),
//       });
//     };

//     window.addEventListener("storage", syncAuth);
//     syncAuth();

//     return () => window.removeEventListener("storage", syncAuth);
//   }, []);

//   function handleLogout() {
//     logout();
//     setAuthState({ authed: false, user: null });
//     navigate("/login");
//   }

//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
//         <Link
//           to="/"
//           className="text-2xl font-extrabold tracking-wider drop-shadow-lg flex items-center gap-2"
//         >
//           <span className="uppercase text-white font-black drop-shadow">EasyFund</span>
//         </Link>

//         <nav className="flex items-center gap-4 text-sm text-white/90 font-semibold tracking-wide">
//           {authState.authed ? (
//             <>
//               {userLabel && (
//                 <span className="px-3 py-1 rounded-full bg-white/15 text-white drop-shadow-sm">
//                   {userLabel}
//                 </span>
//               )}
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-1 rounded-md bg-white/15 hover:bg-white/25 transition duration-200"
//               >
//                 \ub85c\uadf8\uc544\uc6c3
//               </button>
//             </>
//           ) : (
//             <div className="flex items-center gap-3">
//               <Link
//                 to="/signup"
//                 className="hover:text-white transition duration-200 hover:drop-shadow-sm"
//               >
//                 \ud68c\uc6d0\uac00\uc785
//               </Link>
//               <Link
//                 to="/login"
//                 className="hover:text-white transition duration-200 hover:drop-shadow-sm"
//               >
//                 \ub85c\uadf8\uc778
//               </Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }
// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, isAuthenticated, logout } from "../api/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const [authState, setAuthState] = React.useState({
    authed: isAuthenticated(),
    user: getUser(),
  });

  const userLabel = authState.user?.name
    ? `${authState.user.name}님 환영합니다`
    : "";

  React.useEffect(() => {
    const syncAuth = () => {
      setAuthState({
        authed: isAuthenticated(),
        user: getUser(),
      });
    };

    window.addEventListener("storage", syncAuth);
    syncAuth(); // 최초 1회 실행

    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wider drop-shadow-lg flex items-center gap-2"
        >
          <span className="uppercase text-white font-black drop-shadow">EASYFUND</span>
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
