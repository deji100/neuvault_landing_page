import Link from "next/link";

const SUPPORT_EMAIL = "support@neuvault.app";
const EFFECTIVE_DATE = "February 23, 2026";

export default function AccountDeletionPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0F19] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#121c2b] to-[#203B6E] -z-10" />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition">
            Back to Home
          </Link>
          <span className="text-xs text-gray-400">Effective date: {EFFECTIVE_DATE}</span>
        </div>

        <div className="mt-8">
          <p className="text-sm md:text-base text-[#6DD1FF] tracking-wide uppercase mb-3">
            NeuVault Account Deletion
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Delete Your Account and Data
          </h1>
          <p className="text-gray-300 mt-5 leading-relaxed">
            This page explains how to request deletion of your NeuVault account and what
            data is deleted or retained.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-2xl font-semibold">How to delete your account in the app</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Open the NeuVault app and sign in.</li>
            <li>Go to Settings.</li>
            <li>Tap Delete Account.</li>
            <li>Confirm the deletion prompt.</li>
          </ol>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Alternative request method</h2>
          <p className="text-gray-300 leading-relaxed">
            If you cannot access the app, email{" "}
            <a className="text-[#6DD1FF] hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>{" "}
            from your account email with the subject line: Account Deletion Request.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-2xl font-semibold">What data is deleted</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Account profile data (email, username, account identifiers).</li>
            <li>Authentication and session records (OTP and refresh token records).</li>
            <li>Server-side billing/subscription linkage records tied to your account.</li>
            <li>Server-side notification and reminder records tied to your account.</li>
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-2xl font-semibold">What is not deleted by server account deletion</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              Your vault files and notes stored locally on your device are not removed by the
              server endpoint.
            </li>
            <li>
              Any encrypted backups you exported to your own cloud storage remain in that cloud
              account until you delete them there.
            </li>
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Retention</h2>
          <p className="text-gray-300 leading-relaxed">
            Account deletion is processed as soon as the request is confirmed. NeuVault does
            not keep active account records after deletion, except where retention is required
            by law or for legitimate security/compliance obligations.
          </p>
        </section>

      </div>
    </main>
  );
}
