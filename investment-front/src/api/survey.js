import client from "./client";

// 설문 결과 제출: answers 배열을 보냅니다.
export async function submitSurvey(answers) {
  const res = await client.post("/survey/submit", { answers });
  return res.data; // { risk_class: "성장형" }
}
