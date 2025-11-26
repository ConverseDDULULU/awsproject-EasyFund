// src/pages/PortfolioAnalysis.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { getModelPortfolio, getPastReturns, getFutureForecast } from "../api/portfolio";

const COLOR_MAP = {
  달러: "#34d399",
  채권: "#a78bfa",
  주식: "#60a5fa",
  금: "#fbbf24",
};
const COLORS = ["#34d399", "#60a5fa", "#a78bfa", "#fbbf24"];

const ASSET_DESC = {
  달러: "달러 예금/현금성",
  채권: "미국채/채권 ETF",
  주식: "주식/지수 ETF",
  금: "금 관련 ETF",
};

const RISK_DESC = {
  "\uc548\uc815\ud615": "원금 보전을 중시하는 보수적 투자자.",
  "\uc548\uc815\ucd94\uad6c\ud615": "안정과 수익 사이 균형을 추구하는 투자자.",
  "\uade0\ud615\ud615": "채권과 주식을 고르게 가져가는 투자자.",
  "\uc131\uc7a5\ud615": "높은 수익을 위해 변동성을 수용하는 투자자.",
  "\uacf5\uaca9\ud615": "NASDAQ QQQ만 사용하고 VOO는 포함하지 않는 공격적 투자자.",
};

const SAMPLE_MAIN = { category: "포트폴리오(가정)", value: 12.52 };
const SAMPLE_UST = { category: "미국채(UST)", value: 4 };
const SAMPLE_VOO = { category: "미국 S&P500 (VOO)", value: 14.13 };
const SAMPLE_QQQ = { category: "미국 나스닥 (QQQ)", value: 18.99 };

function compound(rate, years) {
  if (rate == null) return "-";
  const v = ((1 + rate / 100) ** years - 1) * 100;
  return `${v.toFixed(1)}%`;
}

export default function PortfolioAnalysis() {
  const [params] = useSearchParams();
  const risk = params.get("risk_class");

  const [model, setModel] = useState(null);
  const [pastCategories, setPastCategories] = useState([]);
  const [annualReturn, setAnnualReturn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!risk) return;

    async function loadAll() {
      try {
        const [modelRes, pastRes, forecastRes] = await Promise.all([
          getModelPortfolio(risk),
          getPastReturns(risk),
          getFutureForecast(risk),
        ]);

        setModel(modelRes);
        setPastCategories(pastRes.categories || []);
        setAnnualReturn(forecastRes.expected_return);
      } catch (e) {
        console.error("Portfolio load error:", e);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, [risk]);

  if (!risk) return <p>risk_class 파라미터가 없습니다.</p>;
  if (loading) return <p>포트폴리오 분석 데이터를 불러오는 중입니다...</p>;

  const assetList = model
    ? Object.entries(model).map(([name, weight], idx) => ({
        name,
        weight,
        desc: ASSET_DESC[name] || "",
        fill: COLOR_MAP[name] || COLORS[idx % COLORS.length],
      }))
    : [];

  const percentTick = (v) => `${v}%`;
  const percentTooltip = (value, name) => [`${value}%`, name];

  // 바 차트 데이터: 하나의 필드에 4개 막대 표시
  const ustData = pastCategories.find((c) => /UST/i.test(c.category || "")) || SAMPLE_UST;
  const portfolioData = pastCategories.find((c) => /포트폴리오/i.test(c.category || "")) || SAMPLE_MAIN;
  const vooData = pastCategories.find((c) => /VOO/i.test(c.category || "")) || SAMPLE_VOO;
  const qqqData = pastCategories.find((c) => /QQQ/i.test(c.category || "")) || SAMPLE_QQQ;
  const fourBarData = [ustData, portfolioData, vooData, qqqData];

  return (
    <div className="px-4 py-6 space-y-8">
      <h1 className="text-3xl font-bold">포트폴리오 분석</h1>

      {/* 투자 성향 & 예상 수익률 */}
      <section className="card p-6 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
            투자 성향: {risk}
          </span>
          <span className="text-sm text-gray-600">{RISK_DESC[risk] || "투자 성향 설명이 없습니다."}</span>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-gray-700">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
            예상 연평균 수익률: {annualReturn != null ? `${annualReturn}%` : "-"}
          </span>
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
            10년 예상: {compound(annualReturn, 10)}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700">
            20년 예상: {compound(annualReturn, 20)}
          </span>
        </div>
      </section>

      {/* 추천 포트폴리오: 도넛 + 상세표 */}
      <section className="card p-6 space-y-6">
        <h2 className="text-xl font-semibold">추천 포트폴리오</h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/2 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={assetList}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="weight"
                  labelLine={false}
                >
                  {assetList.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v}%`, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3 text-sm justify-center">
              {assetList.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: a.fill }} />
                  <span className="text-gray-700">{a.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">자산</th>
                  <th className="px-4 py-2 text-right">비중</th>
                  <th className="px-4 py-2 text-left">설명</th>
                </tr>
              </thead>
              <tbody>
                {assetList.map((a, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">
                      <span
                        className="inline-block w-3 h-3 rounded-sm mr-2 align-middle"
                        style={{ backgroundColor: a.fill }}
                      />
                      {a.name}
                    </td>
                    <td className="px-4 py-2 text-right">{a.weight}%</td>
                    <td className="px-4 py-2">{a.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 과거 10년 평균 수익률 - 하나의 차트에 4개 막대 */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">과거 10년 평균 수익률 (UST/포트폴리오/VOO/QQQ)</h2>
          <span className="text-sm text-gray-500">막대 위 숫자로 확인</span>
        </div>
        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={fourBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={percentTick} domain={[0, "dataMax+5"]} />
              <Tooltip formatter={percentTooltip} />
              <Bar dataKey="value" fill="#3b82f6" barSize={16} radius={[4, 4, 0, 0]}>
                <LabelList dataKey="value" position="top" formatter={(v) => `${v}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
