import { Brain, Database, LockKeyhole, ShieldCheck } from "lucide-react";

const trustItems = [
  {
    title: "Local-first vault",
    body: "Your vault documents live on your device by default, not as a permanent cloud document store.",
    icon: <Database size={20} />,
  },
  {
    title: "AI only when you ask",
    body: "Content may be processed when you choose OCR, summaries, transcription, Nova, or other intelligent workflows.",
    icon: <Brain size={20} />,
  },
  {
    title: "Encrypted backup",
    body: "Backup and restore use encrypted bundles that you control.",
    icon: <LockKeyhole size={20} />,
  },
  {
    title: "About app-store labels",
    body: "App stores may mention user content because NeuVault can process files you choose to analyze. That does not mean NeuVault permanently stores your vault files.",
    icon: <ShieldCheck size={20} />,
  },
];

export default function TrustExplainer() {
  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
              AI and privacy
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              How NeuVault handles your files.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              NeuVault is built for sensitive documents, so privacy is simple:
              your vault is local-first. Files may only be processed when you
              use features like OCR, summaries, transcription, Nova, or
              document search. Your backups are encrypted and controlled by
              you.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {trustItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-white">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
