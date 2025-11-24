// Simple client-side auth helper (placeholder until backend is connected)
export async function login(email, password) {
  if (!email || !password) return false;
  localStorage.setItem("auth_token", "demo-token");
  return true;
}

export function logout() {
  localStorage.removeItem("auth_token");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("auth_token"));
}
