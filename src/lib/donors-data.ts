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
  {
    id: "d-usaid",
    name: "USAID Bureau for Humanitarian Assistance",
    type: "Government",
    location: "Washington D.C., USA",
    about:
      "The lead US federal government agency that provides life-saving humanitarian assistance, protection, and livelihood recovery resources globally.",
    interests: ["food security", "water/WASH", "protection", "shelter", "healthcare"],
    regions: ["Global", "Sub-Saharan Africa", "Middle East", "Latin America"],
    ticketSize: "$500k – $15M",
    contact: "bha.inquiries@usaid.gov",
    recentlyFunded: 45,
  },
  {
    id: "d-mastercard",
    name: "Mastercard Foundation",
    type: "Foundation",
    location: "Toronto, Canada",
    about:
      "Works to enable young people, particularly young women, displaced populations, and refugees in Africa, to secure dignified and fulfilling work.",
    interests: ["livelihoods", "education"],
    regions: ["Sub-Saharan Africa", "East Africa", "West Africa"],
    ticketSize: "$500k – $10M",
    contact: "info@mastercardfdn.org",
    recentlyFunded: 18,
  },
  {
    id: "d-unhcr-innovation",
    name: "UNHCR Innovation Fund",
    type: "Government",
    location: "Geneva, Switzerland",
    about:
      "UN Refugee Agency's targeted funding for creative, localized, and tech-driven solutions designed and implemented directly by refugee-led organizations.",
    interests: ["energy", "protection", "livelihoods", "education"],
    regions: ["Global"],
    ticketSize: "$10k – $150k",
    contact: "innovation@unhcr.org",
    recentlyFunded: 24,
  },
  {
    id: "d-ford-foundation",
    name: "Ford Foundation",
    type: "Foundation",
    location: "New York, USA",
    about:
      "Global philanthropy focused on reducing inequality, protecting civic space, and supporting legal aid/advocacy organizations representing marginalized groups.",
    interests: ["legal aid", "protection", "livelihoods"],
    regions: ["Global", "Latin America", "Middle East", "Sub-Saharan Africa"],
    ticketSize: "$100k – $2M",
    contact: "officeofgrants@fordfoundation.org",
    recentlyFunded: 13,
  ),
  {
    id: "d-cisco-foundation",
    name: "Cisco Foundation",
    type: "Corporate",
    location: "San Jose, USA",
    about:
      "Cisco's corporate giving. Invests in technology solutions that help underserved and displaced communities access critical resources and shelter.",
    interests: ["shelter", "education", "water/WASH", "energy"],
    regions: ["Global"],
    ticketSize: "$75k – $500k",
    contact: "cisco-foundation@cisco.com",
    recentlyFunded: 8,
  },
  {
    id: "d-alwaleed",
    name: "Alwaleed Philanthropies",
    type: "Foundation",
    location: "Riyadh, Saudi Arabia",
    about:
      "Supports initiatives and organizations working towards disaster relief, community development, and empowering women and youth in the Middle East and globally.",
    interests: ["shelter", "food security", "healthcare", "livelihoods"],
    regions: ["MENA", "East Africa", "South Asia"],
    ticketSize: "$150k – $3M",
    contact: "info@alwaleedphilanthropies.org",
    recentlyFunded: 11,
  },
  {
    id: "d-hpatel",
    name: "H. Patel Family Trust",
    type: "Individual",
    location: "London, UK",
    about:
      "Private family office focused on localized water access, community energy resilience, and immediate nutrition initiatives for displaced families.",
    interests: ["water/WASH", "energy", "food security"],
    regions: ["East Africa", "South Asia"],
    ticketSize: "$25k – $200k",
    contact: "grants@patelfamilytrust.org",
    recentlyFunded: 4,
  },
  {
    id: "d-dr-schwab",
    name: "Dr. Schwab & Partner",
    type: "Individual",
    location: "Zurich, Switzerland",
    about:
      "Private donor syndicate financing legal empowerment, local integration initiatives, and high-impact micro-livelihoods run by refugee communities.",
    interests: ["legal aid", "livelihoods", "protection"],
    regions: ["Western Balkans", "Middle East"],
    ticketSize: "$30k – $150k",
    contact: "schwab-syndicate@swissmail.com",
    recentlyFunded: 5,
  }
];
