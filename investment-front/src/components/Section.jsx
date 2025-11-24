import React from "react";

// 간단한 섹션 래퍼: 기존 페이지에 영향 없이 원하는 곳에 감싸서 사용
export default function Section({ title, children }) {
  return (
    <section className="bg-white rounded-xl shadow p-4 space-y-3">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {children}
    </section>
  );
}
