import random

# Model portfolios by risk class (sample weights, in percent)
PORTFOLIOS = {
    "\uc548\uc815\ud615": {"\ub2ec\ub7ec": 40, "\ucc44\uad8c": 40, "\uc8fc\uc2dd": 15, "\uae08": 5},
    "\uc548\uc815\ucd94\uad6c\ud615": {"\ub2ec\ub7ec": 25, "\ucc44\uad8c": 45, "\uc8fc\uc2dd": 25, "\uae08": 5},
    "\uade0\ud615\ud615": {"\ub2ec\ub7ec": 15, "\ucc44\uad8c": 40, "\uc8fc\uc2dd": 35, "\uae08": 10},
    "\uc131\uc7a5\ud615": {"\ub2ec\ub7ec": 10, "\ucc44\uad8c": 25, "\uc8fc\uc2dd": 55, "\uae08": 10},
    "\uacf5\uaca9\ud615": {"\ub2ec\ub7ec": 5, "\ucc44\uad8c": 15, "\uc8fc\uc2dd": 70, "\uae08": 10},
}

# Fixed annual returns (in percent) based on user-provided figures
ANNUAL_RETURNS = {
    "VOO": 14.13,
    "QQQ": 18.99,
    "\ucc44\uad8c": 4.0,
    "\ub2ec\ub7ec": 0.5,
    "\uae08": 3.0,
}

# Use a blended equity return from VOO/QQQ
EQUITY_RETURN = (ANNUAL_RETURNS["VOO"] + ANNUAL_RETURNS["QQQ"]) / 2  # 16.56%


def _expected_portfolio_return(weights):
    # Weighted expected annual return using fixed rates
    r_equity = EQUITY_RETURN
    r_bond = ANNUAL_RETURNS["\ucc44\uad8c"]
    r_cash = ANNUAL_RETURNS["\ub2ec\ub7ec"]
    r_gold = ANNUAL_RETURNS["\uae08"]

    return (
        (weights.get("\uc8fc\uc2dd", 0) / 100) * r_equity
        + (weights.get("\ucc44\uad8c", 0) / 100) * r_bond
        + (weights.get("\ub2ec\ub7ec", 0) / 100) * r_cash
        + (weights.get("\uae08", 0) / 100) * r_gold
    )


def get_past_10_years(risk_class):
    if risk_class not in PORTFOLIOS:
        return []

    weights = PORTFOLIOS[risk_class]
    # 카테고리별 연평균 수익률과 포트폴리오 가중 기대수익률
    equity = EQUITY_RETURN
    bond = ANNUAL_RETURNS["\ucc44\uad8c"]
    cash = ANNUAL_RETURNS["\ub2ec\ub7ec"]
    gold = ANNUAL_RETURNS["\uae08"]
    portfolio_ret = _expected_portfolio_return(weights)

    # 금 10년 시계열 (기초 100에서 연복리)
    def idx_series(rate):
        val = 100.0
        start = 2015
        result = []
        for i in range(10):
            year = start + i
            val *= 1 + rate / 100
            result.append({"date": str(year), "value": round(val, 2)})
        return result
    # 달러 환율 시계열 (기초 1100원, 연 2% 상승 가정)
    def fx_series(base=1100.0, rate=2.0):
        val = base
        start = 2015
        result = []
        for i in range(10):
            year = start + i
            val *= 1 + rate / 100
            result.append({"date": str(year), "value": round(val, 2)})
        return result

    fx_series_data = fx_series()
    gold_series = idx_series(gold)

    return {
        "categories": [
            {"category": "\ucc44\uad8c", "value": round(bond, 2)},
            {"category": "\uc8fc\uc2dd(VOO/QQQ)", "value": round(equity, 2)},
            {"category": "\ud3ec\ud2b8\ud3f4\ub9ac\uc624(\uac00\uc911)", "value": round(portfolio_ret, 2)},
        ],
        "fx_gold": [
            {"date": fx["date"], "USD/KRW": fx["value"], "\uae08": g["value"]}
            for fx, g in zip(fx_series_data, gold_series)
        ],
    }


def get_future_forecast(risk_class):
    if risk_class not in PORTFOLIOS:
        return []

    annual_ret = _expected_portfolio_return(PORTFOLIOS[risk_class])
    # 미래 예상 수익률을 단일 값으로 제공 (연평균)
    return {"expected_return": round(annual_ret, 2)}


def get_model_portfolio(risk_class):
    if risk_class not in PORTFOLIOS:
        return {"error": "invalid risk class"}
    return PORTFOLIOS[risk_class]


def get_expected_return(risk_class):
    if risk_class not in PORTFOLIOS:
        return {"error": "invalid risk class"}
    r = _expected_portfolio_return(PORTFOLIOS[risk_class])
    return {"portfolio_expected": round(r, 2)}

