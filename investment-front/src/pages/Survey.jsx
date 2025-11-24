import React, { useState } from "react";
import { submitSurvey } from "../api/survey";

export default function Survey() {
  const questions = [
    {
      q: "투자 경험은 어느 정도인가요?",
      options: [
        { text: "경험 없음", score: 1 },
        { text: "소액으로 조금 해봄", score: 3 },
        { text: "보통", score: 5 },
        { text: "경험 많음", score: 7 },
      ],
    },
    {
      q: "자산이 10% 하락하면 어떻게 하시겠습니까?",
      options: [
        { text: "즉시 매도해 손실 최소화", score: 1 },
        { text: "추세를 보며 일부만 조정", score: 3 },
        { text: "추가 매수 고려", score: 5 },
        { text: "기회라 생각하고 적극 매수", score: 7 },
      ],
    },
    {
      q: "1년에 20% 손실 가능성을 감내할 수 있나요?",
      options: [
        { text: "거의 감내 못한다", score: 1 },
        { text: "조금 힘들다", score: 3 },
        { text: "감내 가능하다", score: 5 },
        { text: "문제 없다", score: 7 },
      ],
    },
    {
      q: "예상 투자 기간은?",
      options: [
        { text: "1년 미만 (단기)", score: 1 },
        { text: "1~3년", score: 3 },
        { text: "3~5년", score: 5 },
        { text: "5년 이상 (장기)", score: 7 },
      ],
    },
    {
      q: "수익보다 안정성이 더 중요하다고 생각하나요?",
      options: [
        { text: "안정 추구", score: 1 },
        { text: "안정 쪽에 조금 더 무게", score: 3 },
        { text: "수익 우선도 괜찮다", score: 5 },
        { text: "고위험 고수익 선호", score: 7 },
      ],
    },
    {
      q: "소득/지출이 안정적인 편인가요?",
      options: [
        { text: "불안정하다", score: 1 },
        { text: "다소 불안정하다", score: 3 },
        { text: "보통이다", score: 5 },
        { text: "매우 안정적이다", score: 7 },
      ],
    },
    {
      q: "투자 목적은 무엇인가요?",
      options: [
        { text: "비상자금 보전", score: 1 },
        { text: "예금보다 조금 높은 수익", score: 3 },
        { text: "중간 정도 수익", score: 5 },
        { text: "높은 수익 최우선", score: 7 },
      ],
    },
    {
      q: "높은 수익을 위해 변동성을 감수할 수 있나요?",
      options: [
        { text: "거의 감수 못한다", score: 1 },
        { text: "조금 감수한다", score: 3 },
        { text: "감수할 수 있다", score: 5 },
        { text: "매우 감수한다", score: 7 },
      ],
    },
    {
      q: "변동성 큰 상품에 투자하는 것이 괜찮나요?",
      options: [
        { text: "불편하다", score: 1 },
        { text: "약간 불편하다", score: 3 },
        { text: "용인 가능하다", score: 5 },
        { text: "매우 괜찮다", score: 7 },
      ],
    },
    {
      q: "투자에서 가장 중요하게 생각하는 요소는?",
      options: [
        { text: "원금 보전", score: 1 },
        { text: "안정적인 수익", score: 3 },
        { text: "위험/수익 균형", score: 5 },
        { text: "높은 수익", score: 7 },
      ],
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitting, setSubmitting] = useState(false);

  function choose(questionIndex, score) {
    const newArr = [...answers];
    newArr[questionIndex] = score;
    setAnswers(newArr);
  }

  async function handleSubmit() {
    if (answers.some((v) => v === null)) {
      alert("모든 문항을 선택해 주세요!");
      return;
    }
    try {
      setSubmitting(true);
      const res = await submitSurvey(answers);
      if (res?.risk_class) {
        window.location.href = `/result?risk_class=${encodeURIComponent(res.risk_class)}`;
      } else {
        alert("결과를 불러오지 못했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      alert("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">투자 성향 설문</h1>

      {questions.map((item, i) => (
        <div key={i} className="p-4 bg-white shadow rounded-lg">
          <p className="mb-3 font-semibold">
            {i + 1}. {item.q}
          </p>

          <div className="flex flex-col gap-2">
            {item.options.map((opt, j) => (
              <button
                key={j}
                onClick={() => choose(i, opt.score)}
                className={
                  "px-4 py-3 rounded border text-left " +
                  (answers[i] === opt.score
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 hover:bg-gray-200")
                }
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
        disabled={submitting}
      >
        {submitting ? "제출 중..." : "제출하기"}
      </button>
    </div>
  );
}
