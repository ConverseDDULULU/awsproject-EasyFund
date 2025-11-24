import client from "./client";

// 실시간 시황 데이터 불러오기
export async function getMarketTickers() {
  try {
    const res = await client.get("/market");
    return res.data;
  } catch (error) {
    console.error("market fetch failed", error);
    return {};
  }
}
