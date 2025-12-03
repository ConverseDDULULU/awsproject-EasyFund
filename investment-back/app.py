from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Base, engine
Base.metadata.create_all(bind=engine)


from auth_schema import LoginRequest, SignupRequest
from auth_service import login, signup
from database import get_db
from market_service import get_market_data
from portfolio_service import (
    get_expected_return,
    get_future_forecast,
    get_model_portfolio,
    get_past_10_years,
)
from survey_service import calculate_risk_class


app = FastAPI()

# CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict to specific domains later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/market")
def market():
    return get_market_data()


@app.post("/auth/signup")
def auth_signup(req: SignupRequest, db: Session = Depends(get_db)):
    result = signup(req.email, req.password, req.name, db)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result


@app.post("/auth/login")
def auth_login(req: LoginRequest, db: Session = Depends(get_db)):
    result = login(req.email, req.password, db)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result


@app.post("/survey/submit")
def submit(data: dict):
    answers = data["answers"]
    risk_class = calculate_risk_class(answers)
    return {"risk_class": risk_class}


@app.get("/portfolio/model")
def portfolio(risk_class: str):
    return get_model_portfolio(risk_class)


@app.get("/portfolio/past")
def past(risk_class: str):
    return get_past_10_years(risk_class)


@app.get("/portfolio/forecast")
def forecast(risk_class: str):
    return get_future_forecast(risk_class)


@app.get("/portfolio/expected")
def expected(risk_class: str):
    return get_expected_return(risk_class)
