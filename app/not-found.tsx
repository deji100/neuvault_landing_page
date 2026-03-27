import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07101c] px-6 text-white">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9dd9ff]">
          Page not found
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          This page does not exist.
        </h1>
        <p className="mt-4 text-base leading-8 text-white/68">
          The link may be outdated, or the page may have moved. Return to the
          NeuVault homepage to keep exploring.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#3F8CFF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#60aaff]"
        >
          Go to homepage
        </Link>
      </div>
    </main>
  );
}
