import { ReactNode } from "react";

const youtubeVideos = [
  {
    title: "Capture and organize a document",
    summary: "Show the full flow from scan or upload to an organized vault record.",
    videoId: "",
  },
  {
    title: "Ask about saved records",
    summary: "Show how NeuVault answers questions from document context.",
    videoId: "",
  },
  {
    title: "Back up and restore the vault",
    summary: "Show encrypted backup, storage choice, and restore on another device.",
    videoId: "",
  },
];

const IconMonitor = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <path d="M8 21h8M12 17v4"/>
  </svg>
);

const IconPlay = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function SeeItInAction() {
  return (
    <section id="see-it-in-action" className="relative px-6 py-24 bg-[#040810]">
      <div className="mx-auto max-w-6xl">
        <div id="youtube-videos">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              YouTube walkthroughs
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
              See the workflows before you install.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              Short walkthroughs show how documents move from capture to
              organization, answers, reminders, linked records, and
              private backup.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {youtubeVideos.map((video) => (
              <article
                key={video.title}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0a101a] shadow-[0_22px_70px_-52px_rgba(255,255,255,0.05)] transition-all hover:border-white/20"
              >
                <div className="aspect-video bg-[#040810] border-b border-white/5">
                  {video.videoId ? (
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                        <IconPlay />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
                    <IconMonitor />
                    YouTube
                  </div>
                  <h3 className="text-lg font-semibold leading-tight text-white">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {video.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
