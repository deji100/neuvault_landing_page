import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NeuVault",
    short_name: "NeuVault",
    description:
      "Private mobile document vault for organization, reminders, backup, scans, notes, and voice capture.",
    start_url: "/",
    display: "standalone",
    background_color: "#07101c",
    theme_color: "#07101c",
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
