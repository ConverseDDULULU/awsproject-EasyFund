import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-4">
      <h1 className="text-2xl font-bold">로그인</h1>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <input
        className="border px-3 py-2 w-full"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border px-3 py-2 w-full"
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

      <p className="text-sm text-center text-gray-600">
        아직 계정이 없나요? <Link className="text-blue-600" to="/signup">회원가입</Link>
      </p>
    </div>
  );
}
