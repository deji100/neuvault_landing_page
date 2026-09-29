import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "NeuVault: five apps to keep your life in order, made into one private app";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const sources = ["Notes", "Screenshots", "Scans", "Recordings", "Links"];

// The social card mirrors the home hero: same headline, same five sources, a real vault screen.
export default async function OpenGraphImage() {
  const phone = await readFile(join(process.cwd(), "public/mobile-images/vault-m.png"));
  const phoneSrc = `data:image/png;base64,${phone.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          backgroundColor: "#f5f5f7",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, rgba(0,122,255,0.20), transparent 42%), radial-gradient(circle at 0% 100%, rgba(94,92,230,0.10), transparent 40%)",
          color: "#1d1d1f",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 760, padding: "0 0 0 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: 15,
                background: "#ffffff",
                boxShadow: "0 8px 20px rgba(0,30,80,0.14)",
              }}
            >
              <svg viewBox="470 458 560 584" width="40" height="40">
                <path
                  fill="#2563eb"
                  d="M642.67,692.22h0c-19.24,.21-28.57,23.62-14.75,37.01l83.74,81.1v196.36s-206.42,.17-206.42,.17l.17-393.66,205.09-.1,1.16,1.08,79.65,76.39-148.64,1.64Z"
                />
                <path
                  fill="#2563eb"
                  d="M857.33,807.78h0c19.24-.21,28.57-23.62,14.75-37.01l-83.74-81.1v-196.36s206.42-.17,206.42-.17l-.17,393.66-205.09,.1-1.16-1.08-79.65-76.39,148.64-1.64Z"
                />
              </svg>
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>NeuVault</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 30, fontSize: 50, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            <span>Five apps to keep</span>
            <span>your life in order.</span>
            <span style={{ color: "#007aff" }}>NeuVault makes it one, and does the organizing.</span>
          </div>

          <div style={{ marginTop: 24, fontSize: 25, lineHeight: 1.4, color: "#6e6e73", maxWidth: 600 }}>
            Your notes, scans, recordings and links, sorted and remembered in one private app.
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 34 }}>
            {sources.map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "#ffffff",
                  border: "1px solid #d2d2d7",
                  fontSize: 21,
                  fontWeight: 600,
                  color: "#1d1d1f",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, justifyContent: "center", paddingTop: 70 }}>
          <div
            style={{
              display: "flex",
              width: 330,
              height: 717,
              padding: 11,
              borderRadius: 54,
              background: "#1d1d1f",
              boxShadow: "0 40px 80px rgba(0,30,80,0.30)",
            }}
          >
            <img src={phoneSrc} width={308} height={669} style={{ borderRadius: 44 }} alt="" />
          </div>
        </div>
      </div>
    ),
    size
  );
}
