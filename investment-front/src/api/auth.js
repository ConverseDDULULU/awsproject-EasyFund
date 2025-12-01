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
    return {
      ok: false,
      message: "\\uc774\\uba54\\uc77c\\uacfc \\ube44\\ubc00\\ubc88\\ud638\\ub97c \\uc785\\ub825\\ud574 \\uc8fc\\uc138\\uc694.",
    };
  }
  try {
    const res = await client.post("/auth/login", { email, password });
    const { token, name } = res.data;
    setSession({ token, email, name });
    return { ok: true };
  } catch (err) {
    const message =
      err?.response?.data?.detail ||
      "\\ub85c\\uadf8\\uc778\\uc5d0 \\uc2e4\\ud328\\ud588\\uc2b5\\ub2c8\\ub2e4.";
    return { ok: false, message };
  }
}

export async function signup(name, email, password) {
  if (!name || !email || !password) {
    return {
      ok: false,
      message: "\\uc774\\ub984, \\uc774\\uba54\\uc77c, \\ube44\\ubc00\\ubc88\\ud638\\ub97c \\ubaa8\\ub450 \\uc785\\ub825\\ud574 \\uc8fc\\uc138\\uc694.",
    };
  }
  try {
    const res = await client.post("/auth/signup", { name, email, password });
    const { token } = res.data;
    setSession({ token, email, name });
    return { ok: true };
  } catch (err) {
    const message =
      err?.response?.data?.detail ||
      "\\ud68c\\uc6d0\\uac00\\uc785\\uc5d0 \\uc2e4\\ud328\\ud588\\uc2b5\\ub2c8\\ub2e4.";
    return { ok: false, message };
  }
}
