import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GermanyBase",
    short_name: "GermanyBase",
    description: "Practical guides and tools for life in Germany",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfcff",
    theme_color: "#173f67",
    icons: [
      { src: "/icons/germanybase-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/germanybase-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
