import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "Living Germany", short_name: "Living Germany", description: "Practical guides for life in Germany", start_url: "/", display: "standalone", background_color: "#fbfcff", theme_color: "#173f67", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] }; }
