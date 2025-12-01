import React, { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    setError("");
    setLoading(true);
    const res = await signup(name, email, pw);
    setLoading(false);
    if (res.ok) {
      navigate("/survey");
      return;
    }
    setError(res.message || "회원가입에 실패했습니다.");
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-4">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <p className="text-sm text-gray-600">이메일과 이름, 비밀번호를 입력해 계정을 만들어 주세요.</p>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <input
        className="border px-3 py-2 w-full"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "가입 중..." : "회원가입"}
      </button>

      <p className="text-sm text-center text-gray-600">
        이미 계정이 있나요?{" "}
        <Link className="text-blue-600" to="/login">
          로그인
        </Link>
      </p>
    </div>
  );
}
