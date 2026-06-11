import React from "react";

export default function Card({
  text1,
  text2,
  text3,
}: {
  text1: string;
  text2: string;
  text3: string;
}) {
  return (
    <div
      className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-[0_22px_70px_-52px_rgba(37,99,235,0.45)]"
      style={{
        borderColor: "var(--line)",
      }}
    >
      <h3
        className="mb-8 text-lg"
        style={{ color: "var(--muted)", letterSpacing: "0.128px" }}
      >
        {text1}
      </h3>

      <div
        className="mb-8 flex items-center justify-center gap-2 text-5xl font-bold"
        style={{ color: "var(--foreground)" }}
      >
        <span>{text2}</span>
      </div>

      <p
        className="text-xl tracking-wide"
        style={{ color: "var(--muted)", letterSpacing: "0.128px" }}
      >
        {text3}
      </p>
    </div>
  );
}
