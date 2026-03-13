"use client";

export default function FloatingBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute right-[-8%] top-[10%] h-[320px] w-[320px] rounded-full bg-[#3F8CFF]/10 blur-[120px] sm:h-[420px] sm:w-[420px]" />
      <div className="pointer-events-none absolute bottom-[16%] left-[-8%] h-[260px] w-[260px] rounded-full bg-[#6DD1FF]/10 blur-[120px] sm:h-[360px] sm:w-[360px]" />
      <div className="pointer-events-none absolute left-[6%] top-[46%] h-[220px] w-[220px] rounded-full bg-[#6ce6b3]/8 blur-[120px] sm:h-[300px] sm:w-[300px]" />
      <div className="pointer-events-none absolute bottom-[5%] right-[4%] h-[200px] w-[200px] rounded-full bg-[#ffd36c]/8 blur-[120px] sm:h-[260px] sm:w-[260px]" />
    </>
  );
}
