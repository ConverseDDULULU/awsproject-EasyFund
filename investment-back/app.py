from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from market_service import get_market_data
from portfolio_service import get_model_portfolio
from survey_service import calculate_risk_class
from portfolio_service import (
    get_model_portfolio,
    get_past_10_years,
    get_future_forecast,
    get_expected_return,
)
from auth_service import signup, login



app = FastAPI()

# CORS 허용 (리액트와 연동 위해 필수)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/market")
def market():
    return get_market_data()

@app.post("/auth/signup")
def auth_signup(payload: dict):
    email = payload.get("email")
    password = payload.get("password")
    name = payload.get("name")
    if not all([email, password, name]):
        raise HTTPException(status_code=400, detail="필수 항목이 누락되었습니다.")
    res = signup(email, password, name)
    if "error" in res:
        raise HTTPException(status_code=400, detail=res["error"])
    return res

@app.post("/auth/login")
def auth_login(payload: dict):
    email = payload.get("email")
    password = payload.get("password")
    if not all([email, password]):
        raise HTTPException(status_code=400, detail="필수 항목이 누락되었습니다.")
    res = login(email, password)
    if "error" in res:
        raise HTTPException(status_code=400, detail=res["error"])
    return res


@app.post("/survey/submit")
def submit(data: dict):
    answers = data["answers"]
    risk_class = calculate_risk_class(answers)
    return {"risk_class": risk_class}


@app.get("/portfolio/model/{risk_class}")
def portfolio(risk_class: str):
    return get_model_portfolio(risk_class)



@app.get("/portfolio/past/{risk_class}")
def past(risk_class: str):
    return get_past_10_years(risk_class)

@app.get("/portfolio/forecast/{risk_class}")
def forecast(risk_class: str):
    return get_future_forecast(risk_class)

@app.get("/portfolio/expected/{risk_class}")
def expected(risk_class: str):
    return get_expected_return(risk_class)
