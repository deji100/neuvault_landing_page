"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2, LogOut, MessagesSquare } from "lucide-react";

import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  MACOS_APP_STORE_URL,
  WINDOWS_MICROSOFT_STORE_URL,
} from "@/lib/seo";
import { BoardError, type Member, onMemberChange, readMember, requestCode, signOut, verifyCode } from "@/lib/community";

import styles from "./Feedback.module.css";

/** The signed-in member, or null. `ready` is false until the browser has been checked. */
export function useMember() {
  const [member, setMember] = useState<Member | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setMember(readMember());
    sync();
    setReady(true);
    return onMemberChange(sync);
  }, []);
  return { member, ready };
}

const STORES = [
  { label: "iPhone", href: IOS_APP_STORE_URL },
  { label: "Android", href: ANDROID_PLAY_STORE_URL },
  { label: "Mac", href: MACOS_APP_STORE_URL },
  { label: "Windows", href: WINDOWS_MICROSOFT_STORE_URL },
];

/**
 * Shown wherever a signed-out visitor would post, vote or comment: the board
 * is for NeuVault members, so it points to the app, and lets people who
 * already have it sign in with the same email.
 */
export function JoinPanel({ action = "post, vote or comment" }: { action?: string }) {
  const [signingIn, setSigningIn] = useState(false);

  return (
    <section id="join" className={styles.join} aria-labelledby="join-title">
      <span className={styles.joinIcon}>
        <MessagesSquare size={22} aria-hidden="true" />
      </span>
      <div className={styles.joinText}>
        <h2 id="join-title">Join the conversation</h2>
        <p>
          To {action}, download the NeuVault app and create your free account. Then sign in here with the same email.
        </p>
        {signingIn ? (
          <SignInForm onCancel={() => setSigningIn(false)} />
        ) : (
          <>
            <div className={styles.stores}>
              {STORES.map((store) => (
                <a key={store.label} href={store.href} target="_blank" rel="noreferrer" className={styles.store}>
                  {store.label}
                </a>
              ))}
            </div>
            <button type="button" className={styles.linkButton} onClick={() => setSigningIn(true)}>
              Already use NeuVault? Sign in <ArrowRight size={14} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function SignInForm({ onCancel }: { onCancel: () => void }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (step === "email") {
        await requestCode(email.trim());
        setStep("code");
      } else {
        await verifyCode(email.trim(), code.trim());
      }
    } catch (err) {
      setError(err instanceof BoardError ? err.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={styles.signIn} onSubmit={submit}>
      {step === "email" ? (
        <label className={styles.field}>
          <span>Your NeuVault email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoFocus
          />
        </label>
      ) : (
        <label className={styles.field}>
          <span>
            Enter the 6-digit code we sent to {email}. No code? That email may not have a NeuVault account yet.
          </span>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            autoFocus
          />
        </label>
      )}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.formRow}>
        <button type="submit" className={styles.primary} disabled={busy}>
          {busy && <Loader2 size={15} className={styles.spin} aria-hidden="true" />}
          {step === "email" ? "Send code" : "Sign in"}
        </button>
        <button
          type="button"
          className={styles.ghost}
          onClick={() => (step === "code" ? (setStep("email"), setCode(""), setError("")) : onCancel())}
        >
          {step === "code" ? "Use a different email" : "Cancel"}
        </button>
      </div>
    </form>
  );
}

export function MemberBar({ member }: { member: Member }) {
  return (
    <p className={styles.memberBar}>
      Signed in as <strong>{member.displayName}</strong>
      <button type="button" className={styles.linkButton} onClick={() => void signOut()}>
        <LogOut size={13} aria-hidden="true" /> Sign out
      </button>
    </p>
  );
}
