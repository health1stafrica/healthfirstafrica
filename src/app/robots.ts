import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engine crawlers and reputable AI search bots
      {
        userAgent: [
          "*",                   // Fallback for general search crawlers (Googlebot, Bingbot, etc.)
          "Google-Extended",     // Google AI/Gemini crawler
          "GPTBot",              // OpenAI crawler (important for ChatGPT Search)
          "ClaudeBot",           // Anthropic/Claude crawler
          "PerplexityBot",       // Perplexity AI crawler
          "Applebot-Extended",   // Apple Intelligence crawler
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/thanks", // Exclude success/thank you page from indexation
        ],
      },
      // Block known aggressive scrapers, bad bots, and CCBot (Common Crawl)
      {
        userAgent: [
          "CCBot",               // Common Crawl (unauthorized AI training scraping)
          "Bytespider",          // ByteDance scraper (very aggressive)
          "PetalBot",            // Aspigel/Huawei crawler (often aggressive)
          "AhrefsBot",           // SEO Crawler (limits SEO analysis scraping if desired)
          "SemrushBot",          // SEO Crawler
          "DotBot",              // Moz SEO Crawler
          "MJ12bot",             // Majestic SEO Link crawler
          "Rogeebot",            // Spam crawler
          "WebReaper",           // Offline download crawler
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://health1stafrica.org/sitemap.xml",
  };
}
