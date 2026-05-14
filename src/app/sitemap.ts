import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://codenexus.agency";
  
  const routes = [
    "",
    "/about",
    "/services",
    "/work",
    "/careers",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
