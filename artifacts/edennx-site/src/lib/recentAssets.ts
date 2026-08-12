// Real EdenRadar new-arrivals snapshot, captured 2026-08-12 from
// edenradar.com/api/browse/new-arrivals?window=30d, newest first. Every row is
// a genuine indexed asset: nothing here is invented.
//
// Why a snapshot and not a live call: that endpoint sends
// Cross-Origin-Resource-Policy: same-origin with no Access-Control-Allow-Origin,
// so a browser fetch from edennx.com is blocked. RecentlyIndexed tries the live
// endpoint first and falls back to this file, so the moment EdenRadar allows
// edennx.com as an origin the section goes live with no further change here.
//
// Refresh periodically: these carry real timestamps and the card shows the age,
// so a stale file reads as "24d ago" under a "Recently indexed" heading.

export type IndexedAsset = {
  id: number;
  institution: string;
  modality: string | null;
  indication: string | null;
  developmentStage: string | null;
  mechanismOfAction: string | null;
  firstSeenAt: string;
};

export const RECENT_ASSETS: IndexedAsset[] = [
    {
        "id":  115701,
        "institution":  "Emory University",
        "modality":  "peptide",
        "indication":  "chronic obstructive pulmonary disease (copd)",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Inhibition of MUC1-C/EGFR-dependent MUC5AC expression to reduce mucus secretion.",
        "firstSeenAt":  "2026-08-12 18:00:57.299796"
    },
    {
        "id":  115696,
        "institution":  "University of Pennsylvania",
        "modality":  "medical device",
        "indication":  "severe arrhythmia",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-12 17:48:47.700165"
    },
    {
        "id":  115697,
        "institution":  "University of Pennsylvania",
        "modality":  "diagnostic",
        "indication":  "tumor imaging",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-12 17:48:47.700165"
    },
    {
        "id":  115695,
        "institution":  "University of Pennsylvania",
        "modality":  "small molecule",
        "indication":  "cancer",
        "developmentStage":  "preclinical",
        "mechanismOfAction":  "Alpha-emitting astatine-211 labeled sigma-2 ligands provide cytotoxicity and chemosensitization.",
        "firstSeenAt":  "2026-08-12 17:48:47.700165"
    },
    {
        "id":  115694,
        "institution":  "TechLink (VA Technology Transfer)",
        "modality":  "medical device",
        "indication":  "amputation",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-11 22:35:10.307406"
    },
    {
        "id":  115692,
        "institution":  "Cancer Research Horizons",
        "modality":  "diagnostic",
        "indication":  "bladder cancer",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-11 22:32:01.05482"
    },
    {
        "id":  115690,
        "institution":  "University of Southern Mississippi",
        "modality":  "gene therapy",
        "indication":  "tick-borne diseases",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-11 21:46:03.893408"
    },
    {
        "id":  115689,
        "institution":  "UC Davis",
        "modality":  "peptide",
        "indication":  "neurodegenerative diseases",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Enhances kinesin-3 motor activity to bias intracellular transport toward anterograde direction.",
        "firstSeenAt":  "2026-08-11 21:45:26.043979"
    },
    {
        "id":  115687,
        "institution":  "University at Buffalo",
        "modality":  "nanoparticle",
        "indication":  "osteoarthritis",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Sustained local delivery of therapeutics via a hydrogel depot to modify disease progression in osteoarthritis.",
        "firstSeenAt":  "2026-08-11 21:27:51.387519"
    },
    {
        "id":  115682,
        "institution":  "Stanford University",
        "modality":  "antibody",
        "indication":  "graft-versus-host disease",
        "developmentStage":  "preclinical",
        "mechanismOfAction":  "Anti-idiotypic antibodies bind and neutralize anti-CD3 antibodies, allowing controlled reversal of T cell depletion.",
        "firstSeenAt":  "2026-08-11 21:10:24.183059"
    },
    {
        "id":  115683,
        "institution":  "Stanford University",
        "modality":  "antibody",
        "indication":  "type 1 diabetes",
        "developmentStage":  "preclinical",
        "mechanismOfAction":  "Selective depletion of pathogenic autoreactive T cells via CD38 targeting, preserving regulatory T cells and modulating local NAD/adenosine signaling.",
        "firstSeenAt":  "2026-08-11 21:10:24.183059"
    },
    {
        "id":  115681,
        "institution":  "Stanford University",
        "modality":  "diagnostic",
        "indication":  "covid-19",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-11 21:10:24.183059"
    },
    {
        "id":  115680,
        "institution":  "Technion – Israel Institute of Technology",
        "modality":  "nanoparticle",
        "indication":  "cancer",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Biomimetic nanoparticles mimic tumor cell surface to enhance selective drug delivery to cancer cells.",
        "firstSeenAt":  "2026-08-11 20:57:32.663804"
    },
    {
        "id":  115679,
        "institution":  "University of Waterloo",
        "modality":  "diagnostic",
        "indication":  "eye disease",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-11 20:57:14.141582"
    },
    {
        "id":  115678,
        "institution":  "University of Arizona",
        "modality":  "diagnostic",
        "indication":  "heart failure",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-11 20:57:09.350563"
    },
    {
        "id":  115677,
        "institution":  "NCI Technology Transfer Center",
        "modality":  "car-t",
        "indication":  "recurrent respiratory papillomatosis (rrp) and anogenital condyloma",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Engineered T cells with TCRs recognize and eliminate HPV 6/11-infected cells.",
        "firstSeenAt":  "2026-08-11 20:57:00.657009"
    },
    {
        "id":  115676,
        "institution":  "NCI Technology Transfer Center",
        "modality":  "research tool",
        "indication":  "glioma",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-11 20:57:00.657009"
    },
    {
        "id":  115675,
        "institution":  "Arizona State University",
        "modality":  "diagnostic",
        "indication":  "multidrug-resistant bacterial infections",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-11 19:06:36.909576"
    },
    {
        "id":  115673,
        "institution":  "University of Notre Dame",
        "modality":  "small molecule",
        "indication":  "clostridioides difficile infection",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Inhibits spore germination by targeting SleC and CspB/CspC proteins, while killing vegetative cells.",
        "firstSeenAt":  "2026-08-11 18:51:03.091881"
    },
    {
        "id":  115674,
        "institution":  "University of Notre Dame",
        "modality":  "nanoparticle",
        "indication":  "multidrug-resistant infections",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Sustained release of antibiotics to maintain local antibacterial activity.",
        "firstSeenAt":  "2026-08-11 18:51:03.091881"
    },
    {
        "id":  115672,
        "institution":  "University of Chicago",
        "modality":  "research tool",
        "indication":  "pancreatic cancer",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-08 19:32:19.026699"
    },
    {
        "id":  115669,
        "institution":  "Gladstone Institutes",
        "modality":  "small molecule",
        "indication":  "neurological disorders",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-08 00:59:35.013788"
    },
    {
        "id":  115668,
        "institution":  "Virginia Tech",
        "modality":  "antibody",
        "indication":  "traumatic brain injury",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Blocks angiopoietin-2 to restore vascular stability and reduce brain swelling.",
        "firstSeenAt":  "2026-08-08 00:58:57.955485"
    },
    {
        "id":  115667,
        "institution":  "University of Wyoming",
        "modality":  "diagnostic",
        "indication":  "influenza",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-08 00:58:51.109885"
    },
    {
        "id":  115666,
        "institution":  "University of Michigan",
        "modality":  "platform technology",
        "indication":  "tendinopathy",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:24:26.324137"
    },
    {
        "id":  115665,
        "institution":  "Baylor College of Medicine",
        "modality":  "gene therapy",
        "indication":  "rett syndrome",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Modulation of MECP2 alternative splicing to increase MeCP2 protein levels.",
        "firstSeenAt":  "2026-08-07 01:24:20.774193"
    },
    {
        "id":  115664,
        "institution":  "Boston Children\u0027s Hospital",
        "modality":  "medical device",
        "indication":  "urinary incontinence",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:24:11.966847"
    },
    {
        "id":  115663,
        "institution":  "NYU Langone",
        "modality":  "small molecule",
        "indication":  "squamous cancers",
        "developmentStage":  "preclinical",
        "mechanismOfAction":  "Dual inhibition of mTOR and RAS pathways to exploit KMT2D loss as a therapeutic vulnerability.",
        "firstSeenAt":  "2026-08-07 01:24:06.064416"
    },
    {
        "id":  115662,
        "institution":  "Stellenbosch University",
        "modality":  "small molecule",
        "indication":  "snakebite envenoming",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Inhibition of secretory phospholipase A2 to neutralize venom toxicity.",
        "firstSeenAt":  "2026-08-07 01:23:54.779499"
    },
    {
        "id":  115661,
        "institution":  "Boston University",
        "modality":  "gene therapy",
        "indication":  "gene and cell therapy research",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Engineered zinc finger regulators bind small-molecule inducers (abscisic acid, tamoxifen, grazoprevir) to conditionally switch target gene expression in a tunable, dose- and time-dependent manner.",
        "firstSeenAt":  "2026-08-07 01:23:51.313193"
    },
    {
        "id":  115659,
        "institution":  "Edinburgh Innovations",
        "modality":  "extracellular vesicle",
        "indication":  "acute liver injury",
        "developmentStage":  "preclinical",
        "mechanismOfAction":  "Extracellular vesicles from alternatively activated macrophages deliver proteins and small RNAs that reprogram macrophages to an anti-inflammatory, pro-repair state, reducing hepatic necrosis and neutrophil influx while boosting hepatocyte regeneration.",
        "firstSeenAt":  "2026-08-07 01:23:38.430776"
    },
    {
        "id":  115658,
        "institution":  "NOVA University Lisbon",
        "modality":  "diagnostic",
        "indication":  "breast cancer",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:23:35.151487"
    },
    {
        "id":  115657,
        "institution":  "Yissum (Hebrew University of Jerusalem)",
        "modality":  "diagnostic",
        "indication":  "parkinson\u0027s disease",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:23:28.997828"
    },
    {
        "id":  115655,
        "institution":  "UMass Amherst",
        "modality":  "protac",
        "indication":  "cancer",
        "developmentStage":  "unknown",
        "mechanismOfAction":  "PROTAC remains inactive until two orthogonal stimuli are both present (AND-logic gating), then induces targeted protein degradation selectively in the diseased microenvironment.",
        "firstSeenAt":  "2026-08-07 01:23:14.094341"
    },
    {
        "id":  115654,
        "institution":  "NCATS (NIH)",
        "modality":  "small molecule",
        "indication":  "parkinson\u0027s disease",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Selective activation of the D3 dopamine receptor to provide therapeutic effects without D2-driven side effects.",
        "firstSeenAt":  "2026-08-07 01:22:54.141757"
    },
    {
        "id":  115653,
        "institution":  "University of South Florida",
        "modality":  "cell therapy",
        "indication":  "glaucoma",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Restoration of trabecular meshwork and Schlemm\u0027s canal function via secretomes.",
        "firstSeenAt":  "2026-08-07 01:22:44.127162"
    },
    {
        "id":  115650,
        "institution":  "UC Davis",
        "modality":  "protein biologic",
        "indication":  "diabetes, cancer",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Single-chain insulin fusion links the A and B chains via an IGF integrin-binding domain, engaging both the insulin receptor and integrins as an agonist or antagonist.",
        "firstSeenAt":  "2026-08-07 01:22:26.811779"
    },
    {
        "id":  115649,
        "institution":  "Hokkaido University",
        "modality":  "medical device",
        "indication":  "interstitial lung disease",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:22:17.960367"
    },
    {
        "id":  115648,
        "institution":  "Hokkaido University",
        "modality":  "peptide",
        "indication":  "glaucoma",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Restores BDNF secretion by correcting OPTN-E50K-mediated intracellular trafficking defects.",
        "firstSeenAt":  "2026-08-07 01:22:17.960367"
    },
    {
        "id":  115644,
        "institution":  "Ohio State University",
        "modality":  "medical device",
        "indication":  "point-of-care diagnostics",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:19:51.544358"
    },
    {
        "id":  115643,
        "institution":  "Penn State University",
        "modality":  "small molecule",
        "indication":  "cancer",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Inhibition of hyperactivated survival pathways including Akt3, STAT3, MAPK, and IGF1-R.",
        "firstSeenAt":  "2026-08-07 01:19:42.868025"
    },
    {
        "id":  115641,
        "institution":  "Penn State University",
        "modality":  "diagnostic",
        "indication":  "concussion and head injury",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:19:42.868025"
    },
    {
        "id":  115638,
        "institution":  "Rice University",
        "modality":  "medical device",
        "indication":  "bioprosthetic heart valve replacements",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:18:48.020139"
    },
    {
        "id":  115633,
        "institution":  "Rice University",
        "modality":  "diagnostic",
        "indication":  "point-of-care diagnostics",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:18:48.020139"
    },
    {
        "id":  115605,
        "institution":  "FLC (Federal Laboratory Consortium)",
        "modality":  "medical device",
        "indication":  "concussion prevention",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:17:25.406737"
    },
    {
        "id":  115620,
        "institution":  "FLC (Federal Laboratory Consortium)",
        "modality":  "medical device",
        "indication":  "bacterial infection",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-07 01:17:25.406737"
    },
    {
        "id":  115601,
        "institution":  "Boston Children\u0027s Hospital",
        "modality":  "diagnostic",
        "indication":  "live-cell cancer diagnostics",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-05 03:58:11.214031"
    },
    {
        "id":  115599,
        "institution":  "NIH Office of Technology Transfer",
        "modality":  "vaccine",
        "indication":  "ebola virus disease",
        "developmentStage":  "preclinical",
        "mechanismOfAction":  "Stimulates immune response by expressing BDBV glycoprotein to initiate antiviral defenses.",
        "firstSeenAt":  "2026-08-05 00:43:22.894059"
    },
    {
        "id":  115598,
        "institution":  "UWM Research Foundation (UWMRF)",
        "modality":  "medical device",
        "indication":  "rehabilitation",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-05 00:43:18.812803"
    },
    {
        "id":  115597,
        "institution":  "University of Burgos",
        "modality":  "small molecule",
        "indication":  "cancer",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Generates reactive oxygen species upon light activation to induce cancer cell death.",
        "firstSeenAt":  "2026-08-05 00:43:15.561121"
    },
    {
        "id":  115594,
        "institution":  "University of Cincinnati",
        "modality":  "peptide",
        "indication":  "corneal scarring and fibrosis",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "A natural peptide applied topically promotes corneal wound-healing pathways that suppress scar formation and fibrosis.",
        "firstSeenAt":  "2026-08-05 00:43:04.32382"
    },
    {
        "id":  115593,
        "institution":  "Nova Southeastern University",
        "modality":  "antibody",
        "indication":  "osteolytic disorders",
        "developmentStage":  "early stage",
        "mechanismOfAction":  "Inhibition of OC-STAMP to prevent pathological bone resorption while preserving physiological bone remodeling.",
        "firstSeenAt":  "2026-08-05 00:42:58.244284"
    },
    {
        "id":  115592,
        "institution":  "NASA TechPort",
        "modality":  "medical device",
        "indication":  "respiratory distress",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-05 00:42:52.182798"
    },
    {
        "id":  115591,
        "institution":  "Virginia Tech",
        "modality":  "medical device",
        "indication":  "point-of-care diagnostics",
        "developmentStage":  "early stage",
        "mechanismOfAction":  null,
        "firstSeenAt":  "2026-08-05 00:42:48.256055"
    }
];
