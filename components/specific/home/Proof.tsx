import { Monitor, Play } from "lucide-react";

const youtubeVideos = [
  {
    title: "Capture and organize a document",
    summary: "Show the full flow from scan or upload to an organized vault record.",
    videoId: "",
  },
  {
    title: "Ask Nova about saved records",
    summary: "Show how NeuVault answers questions from document context.",
    videoId: "",
  },
  {
    title: "Back up and restore the vault",
    summary: "Show encrypted backup, storage choice, and restore on another device.",
    videoId: "",
  },
];

export default function SeeItInAction() {
  return (
    <section id="see-it-in-action" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div id="youtube-videos">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              YouTube walkthroughs
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
              Product videos belong beside the features.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Short walkthroughs can show the core product moments: capture,
              organization, Nova search, reminders, linked records, and private
              backup.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {youtubeVideos.map((video) => (
              <article
                key={video.title}
                className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_22px_70px_-52px_rgba(15,23,42,0.5)]"
              >
                <div className="aspect-video bg-slate-950">
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
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    <Monitor size={13} />
                    YouTube
                  </div>
                  <h3 className="text-lg font-semibold leading-tight text-slate-950">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
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
