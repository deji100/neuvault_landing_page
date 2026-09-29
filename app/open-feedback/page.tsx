"use client";

import { useEffect } from "react";
import { MessageSquareText } from "lucide-react";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  MACOS_APP_STORE_URL,
  WINDOWS_MICROSOFT_STORE_URL,
} from "@/lib/seo";

const FEEDBACK_DEEP_LINK =
  "neuvault://settings?feedback=1&feedback_source=inactivity_email";

export default function OpenFeedbackPage() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.href = FEEDBACK_DEEP_LINK;
    }, 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-[72vh] bg-[#f5f5f7] px-5 py-20 text-[#1d1d1f]">
      <section className="mx-auto max-w-xl rounded-[24px] border border-[#d2d2d7] bg-white px-6 py-10 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:px-10">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#e8f2ff] text-[#007aff]">
          <MessageSquareText aria-hidden="true" className="h-6 w-6" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
          Open NeuVault to give feedback
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6e6e73] sm:text-base">
          Sign in if needed. NeuVault will open the feedback form without exposing any vault content.
        </p>
        <a
          href={FEEDBACK_DEEP_LINK}
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#007aff] px-6 text-sm font-semibold text-white hover:bg-[#006ee6]"
        >
          Open NeuVault
        </a>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-[#8e8e93]">
          Don&apos;t have the app on this device?
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {[
            ["iPhone", IOS_APP_STORE_URL],
            ["Android", ANDROID_PLAY_STORE_URL],
            ["Mac", MACOS_APP_STORE_URL],
            ["Windows", WINDOWS_MICROSOFT_STORE_URL],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded-full border border-[#d2d2d7] px-4 py-2 text-sm font-medium text-[#3a3a3c] hover:bg-[#f2f2f7]">
              {label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
