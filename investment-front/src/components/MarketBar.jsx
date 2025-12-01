import React, { useEffect, useState } from "react";
import { getMarketTickers } from "../api/market";
import { isAuthenticated } from "../api/auth";

export default function MarketBar() {
  const [tickers, setTickers] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTickers();
    const timer = setInterval(fetchTickers, 15000);
    return () => clearInterval(timer);
  }, []);

  async function fetchTickers() {
    try {
      const data = await getMarketTickers();
      const normalized =
        Array.isArray(data) && data.every((d) => d?.name && d?.value !== undefined)
          ? data
          : typeof data === "object" && data !== null && !Array.isArray(data)
          ? Object.entries(data).map(([name, value]) => ({ name, value }))
          : null;

      setTickers(normalized);
      setError(!normalized || normalized.length === 0);
    } catch (e) {
      console.log("market error", e);
      setError(true);
    }
  }

  if (!isAuthenticated()) return null;
  if (!tickers) return null;

  const hasValue = tickers.some((item) => item.value !== null && item.value !== undefined);

  return (
    <div className="w-full bg-[#0B1120] text-gray-300 px-6 py-2">
      <div className="flex items-center gap-8 text-sm whitespace-nowrap min-w-[2000px] mx-auto">
        <span className="px-3 py-1 bg-white/10 rounded-xl text-white font-semibold tracking-wide">
          실시간 시황
        </span>
        {error || !hasValue ? (
          <span className="text-amber-200">데이터를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</span>
        ) : (
          tickers.map(({ name, value }) => (
            <div key={name} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-slate-300">{name}</span>
              <span className="font-semibold text-emerald-300">{value}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
