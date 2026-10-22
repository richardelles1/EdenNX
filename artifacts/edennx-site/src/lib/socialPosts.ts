// The latest EdenNX posts for the home page's field notes. Titles and dates are
// from Taylor's engagement log (RICO marketing/social/ENGAGEMENT.md). Each links
// to the EdenNX page until Taylor logs the post URLs; `line` is the post's
// opening line, to be filled from the published copy.
export type SocialPost = {
  date: string; // ISO date it went out
  title: string;
  line?: string;
  product: "EdenRadar" | "EdenCompliance" | "EdenTrials" | "EdenBR" | "EdenNX";
  url: string;
};

export const LINKEDIN = "https://www.linkedin.com/company/edennx/";
export const INSTAGRAM = "https://www.instagram.com/eden__nx/";

export const SOCIAL_POSTS: SocialPost[] = [
  { date: "2026-10-16", title: "Field notes", product: "EdenCompliance", url: LINKEDIN },
  { date: "2026-10-15", title: "Funded, but lean", product: "EdenCompliance", url: LINKEDIN },
  { date: "2026-10-14", title: "Technology transfer", product: "EdenRadar", url: LINKEDIN },
  { date: "2026-10-13", title: "Pick five vendors", product: "EdenCompliance", url: LINKEDIN },
];
