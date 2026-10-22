// The latest EdenNX LinkedIn posts for the home page, newest first. URLs and
// opening lines are from the EdenNX company page as read on 22 Oct 2026; dates
// from that page's relative ages and Taylor's engagement log. Copy and images
// are the published assets in RICO marketing/ready/<date>-<slug>/ where we hold
// them; a post we hold no graphic for shows as text.
export type SocialPost = {
  date: string; // ISO date it went out
  text: string; // the post's opening, word for word
  image?: string;
  imageAlt?: string;
  product: "EdenRadar" | "EdenCompliance" | "EdenTrials" | "EdenBR" | "EdenNX";
  url: string;
};

export const LINKEDIN = "https://www.linkedin.com/company/edennx/";
export const INSTAGRAM = "https://www.instagram.com/eden__nx/";

const POST = "https://www.linkedin.com/posts/edennx_";

export const SOCIAL_POSTS: SocialPost[] = [
  {
    date: "2026-10-21",
    text: "The system was compliant. The form wasn't. Picture the inspection. The system is validated and every transaction sits in an audit trail. The finding gets written anyway, because the paper change form never asked why the change was made.",
    image: "/images/social/form-wasnt.jpg",
    imageAlt: "The system was compliant. The form wasn't.",
    product: "EdenCompliance",
    url: `${POST}the-system-was-compliant-the-form-wasnt-activity-7518702999708495872-p53E`,
  },
  {
    date: "2026-10-20",
    text: "Four real records from EdenRadar. EdenRadar reads the technology listings universities publish and turns each one into a structured asset record.",
    image: "/images/social/four-records.jpg",
    imageAlt: "Four real records from EdenRadar, the first card",
    product: "EdenRadar",
    url: `${POST}four-real-records-from-edenradar-edenradar-activity-7518341543364186112-zGze`,
  },
  {
    date: "2026-10-19",
    text: "A human-led AI operation is central to delivering on our mission for clients, patients, families as efficiently as possible.",
    product: "EdenNX",
    url: `${POST}agenticai-buildinpublic-lifesciences-activity-7517976313400332290-SwWh`,
  },
  {
    date: "2026-10-16",
    text: "New in EdenRadar this week: 18 medical devices, 10 research platforms, 7 diagnostics, 6 small molecules, 3 antibodies.",
    image: "/images/social/field-notes.jpg",
    imageAlt: "EdenRadar field notes: the week's new assets by modality",
    product: "EdenRadar",
    url: `${POST}new-in-edenradar-this-week-18-medical-activity-7516931323060609024-2LLO`,
  },
  {
    date: "2026-10-15",
    text: "MassBio reports that venture capital funding to Massachusetts biotech was up 25% in the first half of 2026, compared with the same period last year. In our experience, that money arrives before the headcount.",
    image: "/images/social/funded-but-lean.jpg",
    imageAlt: "Funded, but lean: one quality lead holding the file on every vendor",
    product: "EdenCompliance",
    url: `${POST}massbio-reports-that-venture-capital-funding-activity-7516528579736784896-nPj_`,
  },
  {
    date: "2026-10-14",
    text: "Five steps from an inventor's disclosure to a signed license and the royalties that follow. EdenRadar comes in at the listing.",
    image: "/images/social/technology-transfer.jpg",
    imageAlt: "Technology transfer, the first card of a five-step carousel",
    product: "EdenRadar",
    url: `${POST}five-steps-from-an-inventors-disclosure-activity-7516166442132729857-Lc_0`,
  },
  {
    date: "2026-10-13",
    text: "An auditor asks for one vendor's file. The certificate is sitting in someone's email, the date it lapses is in a spreadsheet, and nobody is quite sure which audit report is the latest.",
    image: "/images/social/pick-five-vendors.jpg",
    imageAlt: "Pick five vendors: a test you can run this week",
    product: "EdenCompliance",
    url: `${POST}an-auditor-asks-for-one-vendors-file-the-activity-7515804350263250945-aqPR`,
  },
  {
    date: "2026-10-09",
    text: "Why EdenCompliance Users Call It a Game-Changer?",
    product: "EdenCompliance",
    url: `${POST}why-edencompliance-users-call-it-a-game-changer-activity-7514339767959089156-2kcv`,
  },
  {
    date: "2026-10-05",
    text: "One day after launch, EdenCompliance is making waves by helping our clients simplify their vendor qualification and audit management process.",
    product: "EdenCompliance",
    url: `${POST}one-day-after-launch-edencompliance-is-making-activity-7513268235945914369-2Twh`,
  },
];
