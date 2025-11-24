import MarketTicker from "../components/MarketBar";
import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">환영합니다 👋</h1>

      <div className="p-6 rounded-xl shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">📈 실시간 시장 지표</h2>
        <MarketTicker />
      </div>

      <div className="p-6 rounded-xl shadow bg-white space-y-4">
        <h2 className="text-xl font-semibold">투자 포트폴리오 추천 받기</h2>
        
        <p className="text-gray-600">
          10개의 간단한 설문으로 나의 투자 성향을 분석하고,
          미국 ETF 기반 맞춤형 포트폴리오를 추천받아보세요.
        </p>

        <Link 
          to="/survey"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500"
        >
          투자 성향 테스트 시작하기 →
        </Link>
      </div>
    </div>
  );
}
