"use client";

export default function FloatingBlobs() {
  return (
    <>
      {/* Blob 1 - Top Right */}
      <div className="absolute top-[10%] right-[-10%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-[#3F8CFF]/10 blur-3xl pointer-events-none -z-1 lg:z-1" />

      {/* Blob 2 - Bottom Left */}
      <div className="absolute bottom-[15%] left-[-10%] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none -z-1 lg:z-1" />

      {/* Blob 3 - Mid Left */}
      <div className="absolute top-[45%] left-[5%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-green-400/10 blur-3xl pointer-events-none -z-1 lg:z-1" />

      {/* Blob 4 - Bottom Right */}
      <div className="absolute bottom-[5%] right-[5%] w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] rounded-full bg-pink-400/10 blur-3xl pointer-events-none -z-1 lg:z-1" />
    </>
  );
}
