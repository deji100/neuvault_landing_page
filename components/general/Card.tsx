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
      className="rounded-2xl text-center px-6 py-8 w-full border shadow-md"
      style={{
        backgroundImage: "linear-gradient(to bottom, #1a1f4b, #000000)",
        borderColor: "var(--border)",
      }}
    >
      <h3
        className="text-lg mb-8"
        style={{ color: "var(--muted-foreground)", letterSpacing: "0.128px" }}
      >
        {text1}
      </h3>

      <div
        className="text-5xl font-bold flex justify-center items-center gap-2 mb-8"
        style={{ color: "white" }}
      >
        <span>{text2}</span>
      </div>

      <p
        className="text-xl tracking-wide"
        style={{ color: "var(--muted-foreground)", letterSpacing: "0.128px" }}
      >
        {text3}
      </p>
    </div>
  );
}
