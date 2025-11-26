import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "../api/auth";

export default function Home() {
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);
    const res = await login(email, pw);
    setLoading(false);
    if (res.ok) {
      navigate("/survey");
      return;
    }
    setError(res.message || "로그인에 실패했습니다.");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center bg-slate-50">
      <div className="flex-1 w-full flex justify-center items-start px-4 pt-12 pb-16">
        <section className="bg-white shadow rounded-2xl p-8 border border-gray-100 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-2">로그인</h1>
          <p className="text-sm text-gray-600 mb-4">회원가입을 해서 초보자용 포트폴리오는 추천받아요</p>

          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

          <input
            className="border px-3 py-2 w-full mb-3 rounded"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border px-3 py-2 w-full mb-4 rounded"
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white w-full py-2 rounded disabled:opacity-60"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            아직 계정이 없나요?{" "}
            <Link className="text-blue-600" to="/signup">
              회원가입
            </Link>
          </p>

          {authed && (
            <div className="mt-4 text-center">
              {/* <button
                className="inline-flex justify-center px-4 py-2 rounded bg-emerald-600 text-white font-semibold"
                onClick={() => navigate("/survey")}
              >
                설문 바로가기
              </button> */}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
