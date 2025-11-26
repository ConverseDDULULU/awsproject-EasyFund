import client from "./client";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

function setSession({ token, email, name }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify({ email, name }));
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function login(email, password) {
  if (!email || !password) {
    return { ok: false, message: "이메일과 비밀번호를 입력해주세요." };
  }
  try {
    const res = await client.post("/auth/login", { email, password });
    const { token, name } = res.data;
    setSession({ token, email, name });
    return { ok: true };
  } catch (err) {
    const message = err?.response?.data?.detail || "로그인에 실패했습니다.";
    return { ok: false, message };
  }
}

export async function signup(name, email, password) {
  if (!name || !email || !password) {
    return { ok: false, message: "이름, 이메일, 비밀번호를 모두 입력해주세요." };
  }
  try {
    const res = await client.post("/auth/signup", { name, email, password });
    const { token } = res.data;
    setSession({ token, email, name });
    return { ok: true };
  } catch (err) {
    const message = err?.response?.data?.detail || "회원가입에 실패했습니다.";
    return { ok: false, message };
  }
}
