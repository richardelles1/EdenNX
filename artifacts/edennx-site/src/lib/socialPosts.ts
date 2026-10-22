// The latest EdenNX posts for the home page. Copy and images are the published
// assets in RICO marketing/ready/<date>-<slug>/ (caption or post text, and the
// graphic or first carousel card); dates from Taylor's engagement log. Each
// links to the EdenNX LinkedIn page until Taylor logs the post URLs. Only posts
// that went out are listed (the 21 Oct one per Taylor's ACTIONS.md schedule).
export type SocialPost = {
  date: string; // ISO date it went out
  text: string; // the post's opening, word for word
  image: string;
  imageAlt: string;
  product: "EdenRadar" | "EdenCompliance" | "EdenTrials" | "EdenBR";
  url: string;
};

export const LINKEDIN = "https://www.linkedin.com/company/edennx/";
export const INSTAGRAM = "https://www.instagram.com/eden__nx/";

export const SOCIAL_POSTS: SocialPost[] = [
  {
    date: "2026-10-21",
    text: "The system was compliant. The form wasn't. Picture the inspection. The system is validated and every transaction sits in an audit trail. The finding gets written anyway, because the paper change form never asked why the change was made.",
    image: "/images/social/form-wasnt.jpg",
    imageAlt: "The system was compliant. The form wasn't.",
    product: "EdenCompliance",
    url: LINKEDIN,
  },
  {
    date: "2026-10-16",
    text: "New in EdenRadar this week: 18 medical devices, 10 research platforms, 7 diagnostics, 6 small molecules, 3 antibodies.",
    image: "/images/social/field-notes.jpg",
    imageAlt: "EdenRadar field notes: the week's new assets by modality",
    product: "EdenRadar",
    url: LINKEDIN,
  },
  {
    date: "2026-10-15",
    text: "MassBio reports that venture capital funding to Massachusetts biotech was up 25% in the first half of 2026, compared with the same period last year. In our experience, that money arrives before the headcount.",
    image: "/images/social/funded-but-lean.jpg",
    imageAlt: "Funded, but lean: one quality lead holding the file on every vendor",
    product: "EdenCompliance",
    url: LINKEDIN,
  },
  {
    date: "2026-10-14",
    text: "Five steps from an inventor's disclosure to a signed license and the royalties that follow. EdenRadar comes in at the listing.",
    image: "/images/social/technology-transfer.jpg",
    imageAlt: "Technology transfer, the first card of a five-step carousel",
    product: "EdenRadar",
    url: LINKEDIN,
  },
  {
    date: "2026-10-13",
    text: "An auditor asks for one vendor's file. The certificate is sitting in someone's email, the date it lapses is in a spreadsheet, and nobody is quite sure which audit report is the latest.",
    image: "/images/social/pick-five-vendors.jpg",
    imageAlt: "Pick five vendors: a test you can run this week",
    product: "EdenCompliance",
    url: LINKEDIN,
  },
];
