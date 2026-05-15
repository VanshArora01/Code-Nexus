import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Code Nexus",
    short_name: "CodeNexus",
    description: "AI Automation & Web Development Agency in Ludhiana",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#ff008a",
    icons: [
      {
        src: "/image.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
