
import client from "./client";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

/** 로그인/회원가입 시 세션 저장 + Navbar 즉시 업데이트 이벤트 발생 */
function setSession({ token, email, name }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify({ email, name }));
  window.dispatchEvent(new Event("storage")); // 🔥 핵심
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("storage")); // 🔥 로그아웃도 즉시 반영
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

/*** 로그인 */
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
    const message =
      err?.response?.data?.detail || "로그인에 실패했습니다.";
    return { ok: false, message };
  }
}

/*** 회원가입 */
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
    const message =
      err?.response?.data?.detail || "회원가입에 실패했습니다.";
    return { ok: false, message };
  }
}
  