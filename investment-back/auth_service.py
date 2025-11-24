import json
import hashlib
import base64
from pathlib import Path
from typing import Dict, Optional

USERS_FILE = Path(__file__).resolve().parent / "users.json"


def _load_users() -> Dict[str, Dict[str, str]]:
    if USERS_FILE.exists():
        try:
            return json.loads(USERS_FILE.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


def _save_users(users: Dict[str, Dict[str, str]]) -> None:
    USERS_FILE.write_text(json.dumps(users, ensure_ascii=False, indent=2), encoding="utf-8")


def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def signup(email: str, password: str, name: str) -> Dict[str, str]:
    users = _load_users()
    if email in users:
        return {"error": "이미 가입된 이메일입니다."}
    users[email] = {"password": _hash_password(password), "name": name}
    _save_users(users)
    token = base64.b64encode(f"{email}:{name}".encode("utf-8")).decode("utf-8")
    return {"token": token, "email": email, "name": name}


def login(email: str, password: str) -> Dict[str, str]:
    users = _load_users()
    user = users.get(email)
    if not user:
        return {"error": "존재하지 않는 계정입니다."}
    if user["password"] != _hash_password(password):
        return {"error": "비밀번호가 올바르지 않습니다."}
    token = base64.b64encode(f"{email}:{user['name']}".encode("utf-8")).decode("utf-8")
    return {"token": token, "email": email, "name": user["name"]}


def get_profile(email: str) -> Optional[Dict[str, str]]:
    users = _load_users()
    user = users.get(email)
    if not user:
        return None
    return {"email": email, "name": user["name"]}
