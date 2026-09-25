import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "GermanyBase", short_name: "GermanyBase", description: "Practical guides and tools for life in Germany", start_url: "/", display: "standalone", background_color: "#fbfcff", theme_color: "#173f67", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] }; }
