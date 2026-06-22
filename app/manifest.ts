import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NeuVault",
    short_name: "NeuVault",
    description:
      "Scan, organize, retrieve, and get expiry reminders for important documents in a private AI vault with encrypted backup.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7fbff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
