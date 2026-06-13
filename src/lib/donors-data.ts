import type { Category } from "./fieldmap-data";

export type DonorType = "Foundation" | "Individual" | "Corporate" | "Government";

export type Donor = {
  id: string;
  name: string;
  type: DonorType;
  location: string;
  about: string;
  interests: Category[];
  regions: string[];
  ticketSize: string; // e.g. "$10k – $100k"
  contact: string;
  recentlyFunded: number;
};

export const donors: Donor[] = [
  {
    id: "d-ikea",
    name: "IKEA Foundation",
    type: "Foundation",
    location: "Leiden, Netherlands",
    about:
      "Philanthropic arm of INGKA Foundation. Long-standing backer of refugee livelihoods and renewable energy access in displacement settings.",
    interests: ["energy", "livelihoods", "shelter"],
    regions: ["East Africa", "Middle East", "South Asia"],
    ticketSize: "$250k – $5M",
    contact: "partnerships@ikeafoundation.org",
    recentlyFunded: 14,
  },
  {
    id: "d-open-society",
    name: "Open Society Foundations",
    type: "Foundation",
    location: "New York, USA",
    about:
      "Funds initiatives advancing justice, education, public health and independent media for refugee and host communities.",
    interests: ["education", "legal aid", "protection"],
    regions: ["Global"],
    ticketSize: "$50k – $1M",
    contact: "grants@opensocietyfoundations.org",
    recentlyFunded: 9,
  },
  {
    id: "d-bmz",
    name: "BMZ (German Development)",
    type: "Government",
    location: "Berlin, Germany",
    about:
      "German Federal Ministry for Economic Cooperation and Development. Prioritises climate-resilient infrastructure and refugee self-reliance.",
    interests: ["energy", "water/WASH", "livelihoods"],
    regions: ["East Africa", "MENA", "Western Balkans"],
    ticketSize: "€100k – €10M",
    contact: "info@bmz.bund.de",
    recentlyFunded: 22,
  },
  {
    id: "d-google-org",
    name: "Google.org",
    type: "Corporate",
    location: "Mountain View, USA",
    about:
      "Google's philanthropic arm. Supports tech-enabled solutions in education, crisis response, and economic opportunity for displaced people.",
    interests: ["education", "livelihoods", "protection"],
    regions: ["Global"],
    ticketSize: "$100k – $2M + in-kind",
    contact: "google.org-team@google.com",
    recentlyFunded: 11,
  },
  {
    id: "d-echo",
    name: "EU Humanitarian Aid (ECHO)",
    type: "Government",
    location: "Brussels, Belgium",
    about:
      "European Civil Protection and Humanitarian Aid Operations. Funds life-saving assistance and resilience programmes in crisis-affected regions.",
    interests: ["food security", "shelter", "healthcare", "water/WASH"],
    regions: ["MENA", "Sahel", "East Africa", "Ukraine"],
    ticketSize: "€250k – €15M",
    contact: "echo-info@ec.europa.eu",
    recentlyFunded: 31,
  },
  {
    id: "d-conrad-hilton",
    name: "Conrad N. Hilton Foundation",
    type: "Foundation",
    location: "Los Angeles, USA",
    about:
      "Backs Catholic sisters and grassroots organisations delivering safe water, education and protection to vulnerable populations.",
    interests: ["water/WASH", "education", "protection"],
    regions: ["East Africa", "West Africa", "Latin America"],
    ticketSize: "$100k – $3M",
    contact: "info@hiltonfoundation.org",
    recentlyFunded: 7,
  },
  {
    id: "d-shell",
    name: "Shell Foundation",
    type: "Corporate",
    location: "London, UK",
    about:
      "Independent charity that scales early-stage energy and mobility enterprises serving low-income and displaced communities.",
    interests: ["energy", "livelihoods"],
    regions: ["Sub-Saharan Africa", "South Asia"],
    ticketSize: "$200k – $2M",
    contact: "info@shellfoundation.org",
    recentlyFunded: 5,
  },
  {
    id: "d-mackenzie",
    name: "MacKenzie Scott / Yield Giving",
    type: "Individual",
    location: "Seattle, USA",
    about:
      "Unrestricted, trust-based grants to high-impact organisations led by people closest to the problem — including refugee-led organisations.",
    interests: ["livelihoods", "education", "healthcare", "protection"],
    regions: ["Global"],
    ticketSize: "$1M – $20M (unrestricted)",
    contact: "via Yield Giving open call",
    recentlyFunded: 6,
  },
];
