import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getModelPortfolio } from "../api/portfolio";

export default function Result() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const riskClass = params.get("risk_class") || "";
  const [data, setData] = useState(null);

  useEffect(() => {
    if (riskClass) {
      getModelPortfolio(riskClass).then(setData).catch(() => setData(null));
    }
  }, [riskClass]);

  if (!riskClass) {
    return <p>risk_class 파라미터가 없습니다. 설문을 먼저 완료해 주세요.</p>;
  }

  if (!data) return <p>결과 불러오는 중...</p>;

  function goPortfolio() {
    if (!riskClass) {
      alert("risk_class 정보가 없습니다. 설문을 먼저 완료해 주세요.");
      return;
    }
    navigate(`/portfolio?risk_class=${encodeURIComponent(riskClass)}`);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">당신의 투자 성향: {riskClass}</h1>

      <h2 className="text-xl font-semibold">추천 포트폴리오 구성</h2>

      <div className="p-4 bg-white shadow rounded-lg">
        {Object.entries(data).map(([name, weight]) => (
          <div key={name} className="flex justify-between py-2 border-b">
            <span>{name}</span>
            <span className="font-semibold">{weight}%</span>
          </div>
        ))}
      </div>

      <button onClick={goPortfolio} className="bg-blue-600 text-white px-6 py-3 rounded-lg">
        자세한 분석 보러가기
      </button>
    </div>
  );
}
