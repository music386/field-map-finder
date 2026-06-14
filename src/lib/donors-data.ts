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
  ticketSize: string;
  contact: string;
  recentlyFunded: number;
};

// Mock donors for demo purposes — fictional names spanning every funder archetype.
export const donors: Donor[] = [
  // ── Foundations ─────────────────────────────────────────────
  {
    id: "d-northlight",
    name: "Northlight Foundation",
    type: "Foundation",
    location: "Stockholm, Sweden",
    about:
      "Nordic family foundation funding climate-resilient shelter and clean energy access for displaced communities across the Global South.",
    interests: ["energy", "shelter", "water/WASH"],
    regions: ["East Africa", "Middle East", "South Asia"],
    ticketSize: "$250k – $5M",
    contact: "partnerships@northlight.example",
    recentlyFunded: 14,
  },
  {
    id: "d-open-horizons",
    name: "Open Horizons Trust",
    type: "Foundation",
    location: "New York, USA",
    about:
      "Backs justice, education, public-interest media and legal aid for refugees and host communities worldwide.",
    interests: ["education", "legal aid", "protection"],
    regions: ["Global"],
    ticketSize: "$50k – $1M",
    contact: "grants@openhorizons.example",
    recentlyFunded: 9,
  },
  {
    id: "d-cedarwood",
    name: "Cedarwood Family Foundation",
    type: "Foundation",
    location: "Toronto, Canada",
    about:
      "Multi-generational family philanthropy focused on dignified work for refugee youth and women across Africa.",
    interests: ["livelihoods", "education"],
    regions: ["Sub-Saharan Africa", "East Africa", "West Africa"],
    ticketSize: "$500k – $10M",
    contact: "info@cedarwoodfdn.example",
    recentlyFunded: 18,
  },
  {
    id: "d-mirador",
    name: "Mirador Philanthropies",
    type: "Foundation",
    location: "Madrid, Spain",
    about:
      "Funds grassroots Latin American organisations responding to displacement, gender-based violence and food insecurity.",
    interests: ["food security", "protection", "healthcare"],
    regions: ["Latin America"],
    ticketSize: "€80k – €1.5M",
    contact: "hola@mirador.example",
    recentlyFunded: 10,
  },
  {
    id: "d-sable-river",
    name: "Sable River Foundation",
    type: "Foundation",
    location: "Cape Town, South Africa",
    about:
      "Pan-African foundation supporting refugee-led organisations, mental health services and youth livelihoods.",
    interests: ["healthcare", "livelihoods", "protection"],
    regions: ["Sub-Saharan Africa"],
    ticketSize: "$25k – $500k",
    contact: "team@sableriver.example",
    recentlyFunded: 12,
  },

  // ── Governments / Multilaterals ─────────────────────────────
  {
    id: "d-bundeswerk",
    name: "Bundeswerk Development Agency",
    type: "Government",
    location: "Berlin, Germany",
    about:
      "Bilateral donor prioritising climate-resilient infrastructure, vocational training and refugee self-reliance.",
    interests: ["energy", "water/WASH", "livelihoods"],
    regions: ["East Africa", "MENA", "Western Balkans"],
    ticketSize: "€100k – €10M",
    contact: "info@bundeswerk.example",
    recentlyFunded: 22,
  },
  {
    id: "d-europa-aid",
    name: "Europa Humanitarian Office",
    type: "Government",
    location: "Brussels, Belgium",
    about:
      "European civil protection and humanitarian aid mechanism. Funds life-saving assistance and resilience programmes.",
    interests: ["food security", "shelter", "healthcare", "water/WASH"],
    regions: ["MENA", "Sahel", "East Africa", "Ukraine"],
    ticketSize: "€250k – €15M",
    contact: "echo@europaaid.example",
    recentlyFunded: 31,
  },
  {
    id: "d-libertas",
    name: "Libertas Humanitarian Bureau",
    type: "Government",
    location: "Washington D.C., USA",
    about:
      "Federal bureau providing life-saving humanitarian assistance, protection and livelihood recovery globally.",
    interests: ["food security", "water/WASH", "protection", "shelter", "healthcare"],
    regions: ["Global", "Sub-Saharan Africa", "Middle East", "Latin America"],
    ticketSize: "$500k – $15M",
    contact: "inquiries@libertas.example",
    recentlyFunded: 45,
  },
  {
    id: "d-refugia-innovation",
    name: "Refugia Innovation Fund",
    type: "Government",
    location: "Geneva, Switzerland",
    about:
      "Multilateral fund for creative, localised and tech-driven solutions designed by refugee-led organisations.",
    interests: ["energy", "protection", "livelihoods", "education"],
    regions: ["Global"],
    ticketSize: "$10k – $150k",
    contact: "innovation@refugia.example",
    recentlyFunded: 24,
  },
  {
    id: "d-maple-aid",
    name: "Maple Global Affairs",
    type: "Government",
    location: "Ottawa, Canada",
    about:
      "National development agency funding gender equality, education and crisis response in fragile contexts.",
    interests: ["education", "protection", "healthcare"],
    regions: ["Global", "Sahel", "Middle East"],
    ticketSize: "CA$200k – CA$8M",
    contact: "contact@mapleaffairs.example",
    recentlyFunded: 17,
  },
  {
    id: "d-tasman",
    name: "Tasman Foreign Affairs",
    type: "Government",
    location: "Wellington, New Zealand",
    about:
      "Pacific-focused development funder backing climate adaptation, displacement preparedness and community resilience.",
    interests: ["water/WASH", "shelter", "food security"],
    regions: ["Pacific", "Southeast Asia"],
    ticketSize: "NZ$100k – NZ$3M",
    contact: "pacific@tasman.example",
    recentlyFunded: 8,
  },

  // ── Corporates ──────────────────────────────────────────────
  {
    id: "d-helixsoft",
    name: "Helixsoft Impact",
    type: "Corporate",
    location: "Mountain View, USA",
    about:
      "Tech company philanthropy backing AI, connectivity and crisis-response tools for displaced people.",
    interests: ["education", "livelihoods", "protection"],
    regions: ["Global"],
    ticketSize: "$100k – $2M + in-kind",
    contact: "impact@helixsoft.example",
    recentlyFunded: 11,
  },
  {
    id: "d-orbital-energy",
    name: "Orbital Energy Foundation",
    type: "Corporate",
    location: "London, UK",
    about:
      "Corporate charity scaling early-stage energy and mobility enterprises serving low-income and displaced communities.",
    interests: ["energy", "livelihoods"],
    regions: ["Sub-Saharan Africa", "South Asia"],
    ticketSize: "$200k – $2M",
    contact: "info@orbitalenergy.example",
    recentlyFunded: 5,
  },
  {
    id: "d-meridian-bank",
    name: "Meridian Bank Foundation",
    type: "Corporate",
    location: "Singapore",
    about:
      "Financial-services foundation investing in financial inclusion, refugee entrepreneurship and digital ID.",
    interests: ["livelihoods", "education"],
    regions: ["Southeast Asia", "South Asia", "East Africa"],
    ticketSize: "$150k – $1.5M",
    contact: "foundation@meridianbank.example",
    recentlyFunded: 9,
  },
  {
    id: "d-arctura-pharma",
    name: "Arctura Pharma Cares",
    type: "Corporate",
    location: "Basel, Switzerland",
    about:
      "Pharma corporate giving focused on primary healthcare, maternal health and disease outbreak response in camps.",
    interests: ["healthcare", "water/WASH"],
    regions: ["Global", "East Africa", "MENA"],
    ticketSize: "$250k – $3M + medicines",
    contact: "cares@arctura.example",
    recentlyFunded: 13,
  },
  {
    id: "d-greendrop-logistics",
    name: "GreenDrop Logistics Foundation",
    type: "Corporate",
    location: "Rotterdam, Netherlands",
    about:
      "Logistics-sector foundation donating freight, warehousing and last-mile delivery for humanitarian operations.",
    interests: ["food security", "shelter"],
    regions: ["Global"],
    ticketSize: "$50k – $750k (in-kind heavy)",
    contact: "foundation@greendrop.example",
    recentlyFunded: 7,
  },

  // ── Individuals / Family offices ────────────────────────────
  {
    id: "d-iris-yield",
    name: "Iris Halden Yield Giving",
    type: "Individual",
    location: "Seattle, USA",
    about:
      "Unrestricted, trust-based grants to high-impact organisations led by people closest to the problem.",
    interests: ["livelihoods", "education", "healthcare", "protection"],
    regions: ["Global"],
    ticketSize: "$1M – $20M (unrestricted)",
    contact: "open call",
    recentlyFunded: 6,
  },
  {
    id: "d-patel-trust",
    name: "Patel Family Trust",
    type: "Individual",
    location: "London, UK",
    about:
      "Private family office focused on water access, community energy and nutrition for displaced families.",
    interests: ["water/WASH", "energy", "food security"],
    regions: ["East Africa", "South Asia"],
    ticketSize: "$25k – $200k",
    contact: "grants@patelfamily.example",
    recentlyFunded: 4,
  },
  {
    id: "d-schwarz-syndicate",
    name: "Schwarz & Partner Syndicate",
    type: "Individual",
    location: "Zurich, Switzerland",
    about:
      "Private donor syndicate funding legal empowerment, local integration and refugee-led micro-livelihoods.",
    interests: ["legal aid", "livelihoods", "protection"],
    regions: ["Western Balkans", "Middle East"],
    ticketSize: "$30k – $150k",
    contact: "syndicate@schwarzpartner.example",
    recentlyFunded: 5,
  },
  {
    id: "d-nomad-circle",
    name: "Nomad Giving Circle",
    type: "Individual",
    location: "Berlin, Germany",
    about:
      "Pooled fund of 40+ individual donors making small, fast, flexible grants to refugee-led community projects.",
    interests: ["protection", "education", "livelihoods"],
    regions: ["Europe", "MENA"],
    ticketSize: "€2k – €25k (rapid)",
    contact: "hello@nomadcircle.example",
    recentlyFunded: 28,
  },
  {
    id: "d-okafor-legacy",
    name: "Okafor Legacy Fund",
    type: "Individual",
    location: "Lagos, Nigeria",
    about:
      "Diaspora-led legacy fund channelling individual gifts into West African refugee education and entrepreneurship.",
    interests: ["education", "livelihoods"],
    regions: ["West Africa"],
    ticketSize: "$5k – $75k",
    contact: "legacy@okaforfund.example",
    recentlyFunded: 11,
  },
  {
    id: "d-tanaka-private",
    name: "Tanaka Private Office",
    type: "Individual",
    location: "Tokyo, Japan",
    about:
      "Single-family office quietly funding disaster recovery, child protection and mental health programmes in Asia.",
    interests: ["protection", "healthcare", "shelter"],
    regions: ["Southeast Asia", "South Asia", "Pacific"],
    ticketSize: "¥10M – ¥150M",
    contact: "office@tanakaprivate.example",
    recentlyFunded: 6,
  },
];

export type Donation = {
  id: string;
  donorId: string;
  projectId: string;
  amount: number;
  currency: "EUR" | "USD" | "GBP";
  date: string;
  note?: string;
};

// Illustrative recent donations from donors to specific NGO/RLO projects.
export const donations: Donation[] = [
  { id: "don-northlight-kakuma", donorId: "d-northlight", projectId: "p-efr-2025-kakuma", amount: 45000, currency: "EUR", date: "2025-07-12", note: "Co-funded solar array and battery storage" },
  { id: "don-bundeswerk-hatay", donorId: "d-bundeswerk", projectId: "p-efr-2024-hatay", amount: 80000, currency: "EUR", date: "2024-11-04", note: "Earthquake recovery energy infrastructure" },
  { id: "don-europa-tripoli", donorId: "d-europa-aid", projectId: "p-efr-2023-tripoli", amount: 120000, currency: "EUR", date: "2023-09-21" },
  { id: "don-cedarwood-katsikas", donorId: "d-cedarwood", projectId: "p-efr-2022-katsikas", amount: 30000, currency: "USD", date: "2022-08-15", note: "Maker space energy upgrade" },
  { id: "don-helixsoft-singa", donorId: "d-helixsoft", projectId: "p-singa-incubator", amount: 95000, currency: "USD", date: "2025-03-02", note: "Refugee-led startup incubator cohort" },
  { id: "don-cedarwood-migrateful", donorId: "d-cedarwood", projectId: "p-migrateful-chefs", amount: 60000, currency: "GBP", date: "2025-01-18" },
  { id: "don-iris-rwit", donorId: "d-iris-yield", projectId: "p-rwit-hosting", amount: 250000, currency: "USD", date: "2024-12-10", note: "Unrestricted multi-year support" },
  { id: "don-openhorizons-wfrw", donorId: "d-open-horizons", projectId: "p-wfrw-london", amount: 85000, currency: "USD", date: "2025-02-22" },
  { id: "don-refugia-rti", donorId: "d-refugia-innovation", projectId: "p-rti-athens", amount: 75000, currency: "EUR", date: "2025-05-08", note: "Trauma-informed care training" },
  { id: "don-orbital-calabar", donorId: "d-orbital-energy", projectId: "p-efr-2020-calabar", amount: 40000, currency: "USD", date: "2020-10-30" },
  { id: "don-mirador-mosaik", donorId: "d-mirador", projectId: "p-mosaik-lesvos", amount: 110000, currency: "USD", date: "2025-04-14", note: "Community centre operations" },
  { id: "don-patel-gsbtb", donorId: "d-patel-trust", projectId: "p-gsbtb-berlin", amount: 20000, currency: "GBP", date: "2024-09-09", note: "Community kitchen nutrition programme" },
  { id: "don-schwarz-svn", donorId: "d-schwarz-syndicate", projectId: "p-svn-amsterdam", amount: 35000, currency: "EUR", date: "2025-06-01" },
  { id: "don-greendrop-moria", donorId: "d-greendrop-logistics", projectId: "p-efr-2020-moria", amount: 50000, currency: "USD", date: "2020-07-19" },
  { id: "don-libertas-guadalajara", donorId: "d-libertas", projectId: "p-efr-2021-guadalajara", amount: 200000, currency: "USD", date: "2021-11-12" },
  { id: "don-arctura-hatay", donorId: "d-arctura-pharma", projectId: "p-efr-2024-hatay", amount: 90000, currency: "USD", date: "2024-12-18", note: "Mobile health clinic supplies" },
  { id: "don-nomad-svn", donorId: "d-nomad-circle", projectId: "p-svn-amsterdam", amount: 8000, currency: "EUR", date: "2025-05-22", note: "Rapid response grant" },
  { id: "don-maple-rti", donorId: "d-maple-aid", projectId: "p-rti-athens", amount: 120000, currency: "USD", date: "2024-10-03" },
  { id: "don-meridian-singa", donorId: "d-meridian-bank", projectId: "p-singa-incubator", amount: 70000, currency: "USD", date: "2025-02-11", note: "Financial inclusion track" },
  { id: "don-okafor-calabar", donorId: "d-okafor-legacy", projectId: "p-efr-2020-calabar", amount: 15000, currency: "USD", date: "2024-08-04" },
  { id: "don-tanaka-mosaik", donorId: "d-tanaka-private", projectId: "p-mosaik-lesvos", amount: 65000, currency: "USD", date: "2025-03-27", note: "Child protection programme" },
  { id: "don-sable-rwit", donorId: "d-sable-river", projectId: "p-rwit-hosting", amount: 28000, currency: "USD", date: "2025-01-09" },
  { id: "don-tasman-gsbtb", donorId: "d-tasman", projectId: "p-gsbtb-berlin", amount: 18000, currency: "GBP", date: "2024-11-30" },
];

export function donorById(id: string) {
  return donors.find((d) => d.id === id);
}
