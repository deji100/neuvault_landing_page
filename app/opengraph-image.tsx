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
            "radial-gradient(circle at 20% 20%, rgba(63,140,255,0.35), transparent 30%), radial-gradient(circle at 85% 70%, rgba(109,209,255,0.18), transparent 28%), linear-gradient(180deg, #07101c 0%, #091321 100%)",
          color: "white",
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
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "32px",
            padding: "44px",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: 28,
                color: "#dff2ff",
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
            <div style={{ fontSize: 28, lineHeight: 1.4, color: "rgba(255,255,255,0.74)", maxWidth: 860 }}>
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
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.05)",
                    fontSize: 22,
                    color: "rgba(255,255,255,0.88)",
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
