import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NeuVault private document vault";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.16), transparent 30%), radial-gradient(circle at 85% 70%, rgba(14,165,233,0.12), transparent 28%), linear-gradient(180deg, #ffffff 0%, #eef6ff 100%)",
          color: "#0f172a",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(148,163,184,0.32)",
            borderRadius: "32px",
            padding: "44px",
            background: "rgba(255,255,255,0.82)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: 28,
                color: "#2563eb",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "#3F8CFF",
                }}
              />
              NeuVault
            </div>
            <div style={{ fontSize: 66, lineHeight: 1.08, fontWeight: 700, maxWidth: 860 }}>
              Private document vault for reminders, backup, notes, scans, and smart retrieval
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.4, color: "#475569", maxWidth: 860 }}>
              Organize documents, scans, typed notes, and voice capture in one local-first system
              you can actually find and trust later.
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {["Document organization", "Smart reminders", "Encrypted backup", "Voice to text"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "14px 20px",
                    borderRadius: 999,
                    border: "1px solid rgba(148,163,184,0.32)",
                    background: "#f8fbff",
                    fontSize: 22,
                    color: "#334155",
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}
