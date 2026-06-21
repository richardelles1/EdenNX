import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  /** Path-relative or absolute image for social cards. Defaults to /og-image.png */
  image?: string;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

// Note: social crawlers (LinkedIn, Slack, X) do not execute JS, so the static
// tags in index.html cover link-preview defaults. This hook keeps the browser
// title, canonical, and per-route meta accurate for users and JS-aware tools.
export function useSEO({ title, description, image = "/og-image.png" }: SEOOptions) {
  useEffect(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://edennx.com";
    const url = origin + window.location.pathname;
    const absImage = image.startsWith("http") ? image : origin + image;

    document.title = title;
    setMeta("name", "description", description);
    setLink("canonical", url);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", absImage);
    setMeta("property", "og:site_name", "EdenNX");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", absImage);
  }, [title, description, image]);
}
