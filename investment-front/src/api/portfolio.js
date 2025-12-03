// src/api/portfolio.js
import client from "./client";

// 모델 포트폴리오 (자산 비중)
export async function getModelPortfolio(riskClass) {
  const res = await client.get(
    `/portfolio/model`,
    { params: { risk_class: riskClass } }
  );
  return res.data; // { "달러": 10, "채권": 25, "주식": 55, "금": 10 } 이런 형태
}

// 과거 10년 수익률 & FX/금 시계열
export async function getPastReturns(riskClass) {
  const res = await client.get(
    `/portfolio/past`,
    { params: { risk_class: riskClass } }
  );
  return res.data; 
  // { categories: [...], fx_gold: [...] }
}

// 미래 예상 수익률 (연평균)
export async function getFutureForecast(riskClass) {
  const res = await client.get(
    `/portfolio/forecast`,
    { params: { risk_class: riskClass } }
  );
  return res.data; // { expected_return: 12.52 }
}

// (필요하면) 기대 수익률만 별도로 가져오는 API
export async function getExpectedReturn(riskClass) {
  const res = await client.get(
    `/portfolio/expected`,
    { params: { risk_class: riskClass } }
  );
  return res.data; // { portfolio_expected: 12.52 }
}
