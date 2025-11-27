import yfinance as yf
from fastapi import HTTPException


def get_market_data():
    try:
        symbols = {
            "USD/KRW": "KRW=X",
            "S&P500": "^GSPC",
            "NASDAQ": "^IXIC",
            "DOW": "^DJI",
            "DXY": "DX-Y.NYB",
            # 미 국채 수익률(단기~장기) - 야후에서 비교적 안정적으로 제공되는 심볼
            "미국 단기물(13주)": "^IRX",  # 13-week T-Bill
            "미국 5년물": "^FVX",        # 5Y
            "미국 10년물": "^TNX",       # 10Y
            "미국 30년물": "^TYX",       # 30Y
        }

        def fetch(symbol):
            t = yf.Ticker(symbol)
            price = t.info.get("regularMarketPrice")
            if price is None:
                fast_info = getattr(t, "fast_info", {})
                price = fast_info.get("last_price") or fast_info.get("lastPrice")
            return price

        data = {}
        for name, sym in symbols.items():
            try:
                data[name] = fetch(sym)
            except Exception:
                data[name] = None
        # If everything failed, return a static fallback so the UI can render
        if all(v is None for v in data.values()):
            return {
                "USD/KRW": 1300.0,
                "S&P500": 4700.0,
                "NASDAQ": 16500.0,
                "DOW": 36000.0,
                "DXY": 104.0,
                "미국 국채(13주)": 5.3,
                "미국 5년물": 4.2,
                "미국 10년물": 4.1,
                "미국 30년물": 4.3,
                "note": "fallback data (live fetch failed)",
            }
        return data
    except Exception as e:
        # Log and return fallback instead of surfacing 503 to keep UI alive
        print(f"[market_service] market fetch failed: {e}")
        return {
            "USD/KRW": 1300.0,
            "S&P500": 4700.0,
            "NASDAQ": 16500.0,
            "DOW": 36000.0,
            "DXY": 104.0,
            "미국 국채(13주)": 5.3,
            "미국 5년물": 4.2,
            "미국 10년물": 4.1,
            "미국 30년물": 4.3,
            "note": "fallback data (exception fallback)",
        }
