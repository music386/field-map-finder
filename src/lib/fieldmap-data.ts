// FieldMap seed data: refugee-led organizations and their projects.
// Static, in-memory dataset — trust-based, no verification, no backend.

export type OrgType =
  | "community-based"
  | "refugee-led"
  | "diaspora-led"
  | "local NGO";

export type OrgStrength =
  | "community trust"
  | "local knowledge"
  | "ground delivery capacity"
  | "established beneficiary relationships"
  | "language/cultural access"
  | "volunteer network";

export type Category =
  | "energy"
  | "water/WASH"
  | "education"
  | "healthcare"
  | "livelihoods"
  | "shelter"
  | "legal aid"
  | "protection"
  | "food security";

export type Expertise =
  | "engineering"
  | "medical"
  | "legal"
  | "agricultural"
  | "IT"
  | "project management";

export type BeneficiaryRange =
  | "under 100"
  | "100–500"
  | "500–2,000"
  | "2,000+";

export type ProjectStatus =
  | "seeking support"
  | "partially supported"
  | "fully supported";

export type ProjectType = "time-bound" | "ongoing";

export type EntityKind = "RLO" | "NGO";

export interface Organization {
  id: string;
  name: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  phone: string;
  description?: string;
  yearFounded?: number;
  orgType: OrgType;
  brings: OrgStrength[];
  entityKind?: EntityKind; // defaults to "RLO"
}


export interface Project {
  id: string;
  orgId: string;
  title: string;
  category: Category;
  type: ProjectType;
  targetDate?: string; // ISO yyyy-mm-dd if time-bound
  locationLabel: string; // human-readable
  lat: number;
  lng: number;
  description: string;
  beneficiaries: BeneficiaryRange;
  needs: {
    funding?: { amount: number; currency: "USD" | "EUR"; raised?: number };
    equipment?: string;
    expertise?: Expertise[];
    training?: string;
    partnership?: boolean;
  };
  status: ProjectStatus;
  photos?: string[];
  partnerOrgIds?: string[]; // co-implementing orgs (NGO↔RLO partnerships)
}


export const organizations: Organization[] = [
  {
    id: "org-1",
    name: "Kakuma Solar Collective",
    country: "Kenya",
    region: "Turkana County",
    lat: 3.7167,
    lng: 34.8667,
    phone: "+254712000001",
    description:
      "A five-person collective of South Sudanese and Congolese refugees installing small solar systems across Kakuma. Founded by former electricians from Juba.",
    yearFounded: 2019,
    orgType: "refugee-led",
    brings: ["community trust", "ground delivery capacity", "local knowledge"],
  },
  {
    id: "org-2",
    name: "Nakivale Women's Tailoring Group",
    country: "Uganda",
    region: "Isingiro District",
    lat: -0.7833,
    lng: 30.95,
    phone: "+256772000002",
    description:
      "Burundian and Rwandan women running a tailoring cooperative in Nakivale settlement. Training new arrivals in skills that earn income from day one.",
    yearFounded: 2017,
    orgType: "community-based",
    brings: [
      "community trust",
      "established beneficiary relationships",
      "language/cultural access",
    ],
  },
  {
    id: "org-3",
    name: "Adjumani Youth Health Outreach",
    country: "Uganda",
    region: "Adjumani District",
    lat: 3.3772,
    lng: 31.7906,
    phone: "+256772000003",
    description:
      "South Sudanese youth-led group running mobile health awareness sessions across settlements in West Nile.",
    yearFounded: 2020,
    orgType: "refugee-led",
    brings: ["volunteer network", "language/cultural access", "community trust"],
  },
  {
    id: "org-4",
    name: "Dadaab Education Initiative",
    country: "Kenya",
    region: "Garissa County",
    lat: 0.0556,
    lng: 40.305,
    phone: "+254712000004",
    description:
      "Somali refugee teachers running supplementary classes for girls preparing for KCSE exams in Dadaab.",
    yearFounded: 2015,
    orgType: "refugee-led",
    brings: [
      "established beneficiary relationships",
      "language/cultural access",
      "local knowledge",
    ],
  },
  {
    id: "org-5",
    name: "Beirut Syrian Diaspora Network",
    country: "Lebanon",
    region: "Beirut Governorate",
    lat: 33.8938,
    lng: 35.5018,
    phone: "+9613000005",
    description:
      "Syrian professionals in Beirut coordinating legal aid and documentation support for newly displaced families.",
    yearFounded: 2014,
    orgType: "diaspora-led",
    brings: ["language/cultural access", "community trust", "volunteer network"],
  },
  {
    id: "org-6",
    name: "Cox's Bazar Rohingya Women's Circle",
    country: "Bangladesh",
    region: "Chittagong Division",
    lat: 21.2,
    lng: 92.1667,
    phone: "+8801700000006",
    description:
      "Rohingya women running child protection circles and informal learning spaces across the Kutupalong camps.",
    yearFounded: 2018,
    orgType: "refugee-led",
    brings: [
      "community trust",
      "language/cultural access",
      "established beneficiary relationships",
    ],
  },
  {
    id: "org-7",
    name: "Bidi Bidi Farmers Cooperative",
    country: "Uganda",
    region: "Yumbe District",
    lat: 3.4667,
    lng: 31.4,
    phone: "+256772000007",
    description:
      "South Sudanese farmers reviving cassava and groundnut cultivation on plots allocated within Bidi Bidi.",
    yearFounded: 2018,
    orgType: "community-based",
    brings: ["local knowledge", "ground delivery capacity", "volunteer network"],
  },
  {
    id: "org-8",
    name: "Athens Afghan Welcome House",
    country: "Greece",
    region: "Attica",
    lat: 37.9838,
    lng: 23.7275,
    phone: "+306900000008",
    description:
      "Afghan families running a community shelter and orientation hub for new arrivals in central Athens.",
    yearFounded: 2016,
    orgType: "diaspora-led",
    brings: ["language/cultural access", "community trust", "volunteer network"],
  },
  {
    id: "org-9",
    name: "Goma Lake Hygiene Brigade",
    country: "DR Congo",
    region: "North Kivu",
    lat: -1.6792,
    lng: 29.2228,
    phone: "+243800000009",
    description:
      "Internally displaced volunteers maintaining handwashing stations and water points around Goma's IDP sites.",
    yearFounded: 2021,
    orgType: "community-based",
    brings: [
      "ground delivery capacity",
      "volunteer network",
      "established beneficiary relationships",
    ],
  },
  {
    id: "org-10",
    name: "Amman Iraqi Legal Aid Circle",
    country: "Jordan",
    region: "Amman Governorate",
    lat: 31.9539,
    lng: 35.9106,
    phone: "+962790000010",
    description:
      "Iraqi lawyers in exile providing pro-bono case work for refugees navigating UNHCR and resettlement processes.",
    yearFounded: 2013,
    orgType: "diaspora-led",
    brings: ["language/cultural access", "community trust"],
  },
  {
    id: "org-11",
    name: "Kampala Refugee Tech Hub",
    country: "Uganda",
    region: "Kampala",
    lat: 0.3476,
    lng: 32.5825,
    phone: "+256772000011",
    description:
      "Urban refugee youth running a coding and digital literacy space serving Eritrean, Somali and Congolese members.",
    yearFounded: 2019,
    orgType: "refugee-led",
    brings: ["volunteer network", "community trust", "language/cultural access"],
  },
  {
    id: "org-12",
    name: "Maicao Venezuelan Mothers Network",
    country: "Colombia",
    region: "La Guajira",
    lat: 11.3833,
    lng: -72.2333,
    phone: "+573000000012",
    description:
      "Venezuelan mothers organising food kitchens and child feeding programs along the Colombia-Venezuela border.",
    yearFounded: 2019,
    orgType: "refugee-led",
    brings: [
      "community trust",
      "established beneficiary relationships",
      "ground delivery capacity",
    ],
  },
  {
    id: "org-13",
    name: "Mekelle Displaced Families Network",
    country: "Ethiopia",
    region: "Tigray",
    lat: 13.4967,
    lng: 39.4753,
    phone: "+251911000013",
    description:
      "Tigrayan returnees coordinating shelter, water and small livelihoods support across host neighbourhoods in Mekelle.",
    yearFounded: 2022,
    orgType: "community-based",
    brings: ["local knowledge", "volunteer network", "community trust"],
  },
  {
    id: "org-14",
    name: "Gaziantep Syrian Education Circle",
    country: "Türkiye",
    region: "Gaziantep Province",
    lat: 37.0662,
    lng: 37.3833,
    phone: "+905300000014",
    description:
      "Syrian teachers running Turkish-language and catch-up classes for adolescents preparing to enter Turkish public schools.",
    yearFounded: 2018,
    orgType: "refugee-led",
    brings: [
      "language/cultural access",
      "established beneficiary relationships",
      "community trust",
    ],
  },
  {
    id: "org-15",
    name: "White Nile Midwives Collective",
    country: "Sudan",
    region: "White Nile State",
    lat: 12.7,
    lng: 32.55,
    phone: "+249900000015",
    description:
      "Sudanese midwives displaced by the war organising home-based maternal care across host villages.",
    yearFounded: 2023,
    orgType: "refugee-led",
    brings: [
      "community trust",
      "language/cultural access",
      "ground delivery capacity",
    ],
  },
  {
    id: "org-16",
    name: "Tapachula Migrant Defenders",
    country: "Mexico",
    region: "Chiapas",
    lat: 14.9,
    lng: -92.26,
    phone: "+529620000016",
    description:
      "Honduran and Venezuelan paralegals running a 24/7 hotline supporting migrants stranded at Mexico's southern border.",
    yearFounded: 2020,
    orgType: "diaspora-led",
    brings: ["language/cultural access", "volunteer network", "community trust"],
  },
  {
    id: "org-17",
    name: "Islamabad Afghan Women's Circle",
    country: "Pakistan",
    region: "Islamabad Capital Territory",
    lat: 33.6844,
    lng: 73.0479,
    phone: "+923000000017",
    description:
      "Afghan women in Islamabad organising vocational and income-generation activities for newly evacuated families.",
    yearFounded: 2021,
    orgType: "diaspora-led",
    brings: [
      "community trust",
      "language/cultural access",
      "established beneficiary relationships",
    ],
  },
  {
    id: "org-18",
    name: "Gore Refugee Health Volunteers",
    country: "Chad",
    region: "Logone Oriental",
    lat: 7.9,
    lng: 16.6,
    phone: "+235600000018",
    description:
      "Central African refugees trained as community health workers supporting the Gore-area reception clinic.",
    yearFounded: 2019,
    orgType: "refugee-led",
    brings: [
      "ground delivery capacity",
      "language/cultural access",
      "volunteer network",
    ],
  },
  {
    id: "org-19",
    name: "Erbil Displaced Families Council",
    country: "Iraq",
    region: "Kurdistan Region",
    lat: 36.19,
    lng: 44.0,
    phone: "+9647500000019",
    description:
      "Yazidi and Christian community members coordinating winter and shelter response in and around Erbil's informal settlements.",
    yearFounded: 2015,
    orgType: "community-based",
    brings: [
      "community trust",
      "established beneficiary relationships",
      "ground delivery capacity",
    ],
  },
  {
    id: "org-20",
    name: "Cúcuta Border Mothers Collective",
    country: "Colombia",
    region: "Norte de Santander",
    lat: 7.8939,
    lng: -72.5078,
    phone: "+573100000020",
    description:
      "Venezuelan mothers running urban gardens and nutrition workshops in border neighbourhoods of Cúcuta.",
    yearFounded: 2020,
    orgType: "refugee-led",
    brings: [
      "community trust",
      "established beneficiary relationships",
      "volunteer network",
    ],
  },
  {
    id: "org-21",
    name: "Berlin Peer Support House",
    country: "Germany",
    region: "Berlin",
    lat: 52.481,
    lng: 13.4356,
    phone: "+4915200000021",
    description:
      "Syrian and Afghan young men running peer mental-health and orientation circles in Neukölln.",
    yearFounded: 2017,
    orgType: "diaspora-led",
    brings: ["language/cultural access", "community trust", "volunteer network"],
  },
  {
    id: "org-22",
    name: "Kalobeyei Youth Wheels",
    country: "Kenya",
    region: "Turkana County",
    lat: 3.6,
    lng: 34.72,
    phone: "+254712000022",
    description:
      "South Sudanese and Ethiopian youth running a bicycle repair workshop and paid service stand inside Kalobeyei.",
    yearFounded: 2021,
    orgType: "refugee-led",
    brings: [
      "ground delivery capacity",
      "volunteer network",
      "local knowledge",
    ],
  },
  {
    id: "org-ngo-1",
    name: "Horizon Relief International",
    country: "Kenya",
    region: "Nairobi County",
    lat: -1.286389,
    lng: 36.817223,
    phone: "+254712900001",
    description:
      "International NGO partnering with refugee-led groups across East Africa to co-deliver health and livelihoods programmes.",
    yearFounded: 2002,
    orgType: "local NGO",
    brings: ["ground delivery capacity", "established beneficiary relationships"],
    entityKind: "NGO",
  },
  {
    id: "org-ngo-2",
    name: "Mediterranean Shelter Aid",
    country: "Greece",
    region: "Lesvos",
    lat: 39.1,
    lng: 26.55,
    phone: "+306900900002",
    description:
      "Greek NGO operating reception support and winter shelter response across the Aegean islands.",
    yearFounded: 2015,
    orgType: "local NGO",
    brings: ["ground delivery capacity", "volunteer network"],
    entityKind: "NGO",
  },
  {
    id: "org-ngo-3",
    name: "Andes Migration Support",
    country: "Colombia",
    region: "Bogotá",
    lat: 4.711,
    lng: -74.0721,
    phone: "+573000900003",
    description:
      "Colombian NGO running urban integration and case-management services for Venezuelan migrants.",
    yearFounded: 2017,
    orgType: "local NGO",
    brings: ["established beneficiary relationships", "ground delivery capacity"],
    entityKind: "NGO",
  },
  {
    id: "org-ngo-4",
    name: "Levant Health Partners",
    country: "Jordan",
    region: "Mafraq Governorate",
    lat: 32.34,
    lng: 36.21,
    phone: "+962790900004",
    description:
      "Regional NGO running primary healthcare clinics in and around Zaatari and host communities.",
    yearFounded: 2013,
    orgType: "local NGO",
    brings: ["ground delivery capacity", "established beneficiary relationships"],
    entityKind: "NGO",
  },
  {
    id: "org-ngo-5",
    name: "Bay of Bengal Education Trust",
    country: "Bangladesh",
    region: "Chittagong Division",
    lat: 21.43,
    lng: 92.0,
    phone: "+8801700900005",
    description:
      "Bangladeshi NGO running learning centres in the Rohingya response, partnering with refugee-led teaching circles.",
    yearFounded: 2018,
    orgType: "local NGO",
    brings: ["ground delivery capacity", "volunteer network"],
    entityKind: "NGO",
  },
];


export const projects: Project[] = [
  {
    id: "p-1",
    orgId: "org-1",
    title: "Solar lanterns for 60 households",
    category: "energy",
    type: "time-bound",
    targetDate: "2027-03-31",
    locationLabel: "Kakuma Camp Zone 4, Turkana County, Kenya",
    lat: 3.72,
    lng: 34.87,
    description:
      "Households in Zone 4 rely on kerosene for lighting, which is expensive and unsafe. We will assemble and distribute 60 solar lantern kits with phone-charging ports. Beneficiaries are families with school-age children identified through block leaders.",
    beneficiaries: "100–500",
    needs: {
      funding: { amount: 8000, currency: "EUR" },
      equipment: "60 solar panels (10W) and lithium battery packs",
      expertise: ["engineering"],
    },
    status: "seeking support",
  },
  {
    id: "p-2",
    orgId: "org-1",
    title: "Solar mini-grid for primary school",
    category: "energy",
    type: "ongoing",
    locationLabel: "Kakuma 2, Turkana County, Kenya",
    lat: 3.73,
    lng: 34.86,
    description:
      "The primary school has no electricity, which limits evening study and adult literacy classes. We are progressively installing rooftop solar and a small battery bank. The school serves about 800 learners across two shifts.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 15000, currency: "USD" },
      partnership: true,
    },
    status: "partially supported",
    partnerOrgIds: ["org-ngo-1"],
  },
  {
    id: "p-3",
    orgId: "org-2",
    title: "Tailoring apprenticeship for 30 women",
    category: "livelihoods",
    type: "time-bound",
    targetDate: "2026-09-30",
    locationLabel: "Nakivale Settlement, Isingiro District, Uganda",
    lat: -0.78,
    lng: 30.95,
    description:
      "Newly arrived Burundian women have few income options inside the settlement. We will run a six-month tailoring apprenticeship culminating in starter kits. Beneficiaries are 30 women heading households.",
    beneficiaries: "under 100",
    needs: {
      funding: { amount: 4500, currency: "USD" },
      equipment: "6 manual sewing machines, fabric stock",
      training: "Business basics for cooperative members",
    },
    status: "seeking support",
  },
  {
    id: "p-4",
    orgId: "org-3",
    title: "Mobile sexual health outreach",
    category: "healthcare",
    type: "ongoing",
    locationLabel: "Pagirinya Settlement, Adjumani, Uganda",
    lat: 3.38,
    lng: 31.79,
    description:
      "Young people across Adjumani settlements have limited access to sexual and reproductive health information. We run peer-led sessions and refer cases onward. Coverage is roughly 1,500 youth per quarter.",
    beneficiaries: "500–2,000",
    needs: {
      expertise: ["medical"],
      training: "Counsellor refresher training",
      partnership: true,
    },
    status: "partially supported",
  },
  {
    id: "p-5",
    orgId: "org-4",
    title: "KCSE preparation classes for girls",
    category: "education",
    type: "time-bound",
    targetDate: "2026-10-15",
    locationLabel: "Dadaab, Garissa County, Kenya",
    lat: 0.06,
    lng: 40.31,
    description:
      "Somali girls in Dadaab face high dropout rates before national exams. We run weekend revision classes in math, English and biology for 45 candidates. Teachers are qualified refugees living in the camp.",
    beneficiaries: "under 100",
    needs: {
      funding: { amount: 3200, currency: "USD" },
      equipment: "Textbooks and exam past-papers",
    },
    status: "seeking support",
  },
  {
    id: "p-6",
    orgId: "org-5",
    title: "Legal documentation clinic for Syrian families",
    category: "legal aid",
    type: "ongoing",
    locationLabel: "Bourj Hammoud, Beirut, Lebanon",
    lat: 33.89,
    lng: 35.54,
    description:
      "Many Syrian families lack civil documentation after years of displacement. We run a weekly clinic helping with birth registration, residency renewal and UNHCR appointments. Around 40 cases are opened each month.",
    beneficiaries: "500–2,000",
    needs: {
      expertise: ["legal"],
      funding: { amount: 12000, currency: "EUR" },
    },
    status: "partially supported",
  },
  {
    id: "p-7",
    orgId: "org-6",
    title: "Child-friendly learning spaces",
    category: "education",
    type: "ongoing",
    locationLabel: "Kutupalong Camp, Cox's Bazar, Bangladesh",
    lat: 21.2,
    lng: 92.17,
    description:
      "Rohingya children have limited access to structured learning. We run three child-friendly spaces with Burmese-speaking facilitators. Sessions blend literacy, play and psychosocial support.",
    beneficiaries: "2,000+",
    needs: {
      funding: { amount: 22000, currency: "USD" },
      training: "Trauma-informed facilitation training",
      partnership: true,
    },
    status: "seeking support",
  },
  {
    id: "p-8",
    orgId: "org-6",
    title: "Women's protection drop-in centre",
    category: "protection",
    type: "ongoing",
    locationLabel: "Kutupalong Camp, Cox's Bazar, Bangladesh",
    lat: 21.21,
    lng: 92.16,
    description:
      "Rohingya women report gender-based violence with few safe places to seek help. Our drop-in centre offers referrals, counselling and a women-only meeting space. Roughly 80 women visit weekly.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 9000, currency: "USD" },
      expertise: ["medical", "legal"],
    },
    status: "seeking support",
  },
  {
    id: "p-9",
    orgId: "org-7",
    title: "Cassava seed multiplication plots",
    category: "food security",
    type: "time-bound",
    targetDate: "2026-12-15",
    locationLabel: "Bidi Bidi Zone 3, Yumbe District, Uganda",
    lat: 3.47,
    lng: 31.4,
    description:
      "Cassava cuttings of disease-resistant varieties are scarce in West Nile. We will plant seed-multiplication plots on 12 acres and distribute cuttings to 200 households. Yields support household food security.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 6500, currency: "USD" },
      expertise: ["agricultural"],
      equipment: "Disease-resistant cassava cuttings, hand tools",
    },
    status: "seeking support",
  },
  {
    id: "p-10",
    orgId: "org-8",
    title: "Welcome shelter and orientation hub",
    category: "shelter",
    type: "ongoing",
    locationLabel: "Kypseli, Athens, Greece",
    lat: 37.99,
    lng: 23.73,
    description:
      "Afghan families arriving in Athens often spend nights without shelter. Our hub provides short-stay beds, orientation, and referrals to legal aid. We host roughly 25 people at a time.",
    beneficiaries: "100–500",
    needs: {
      funding: { amount: 18000, currency: "EUR" },
      partnership: true,
    },
    status: "partially supported",
  },
  {
    id: "p-11",
    orgId: "org-9",
    title: "Handwashing stations across IDP sites",
    category: "water/WASH",
    type: "ongoing",
    locationLabel: "Kanyaruchinya, North Kivu, DR Congo",
    lat: -1.62,
    lng: 29.27,
    description:
      "Cholera risk is high across displacement sites around Goma. We maintain 40 handwashing stations and run hygiene-promotion sessions. Each station serves around 300 people daily.",
    beneficiaries: "2,000+",
    needs: {
      funding: { amount: 11000, currency: "USD" },
      equipment: "Replacement taps, soap stock",
      expertise: ["engineering"],
    },
    status: "seeking support",
  },
  {
    id: "p-12",
    orgId: "org-10",
    title: "Pro-bono case work for resettlement candidates",
    category: "legal aid",
    type: "ongoing",
    locationLabel: "East Amman, Jordan",
    lat: 31.95,
    lng: 35.93,
    description:
      "Iraqi refugees navigating resettlement face complex paperwork and interview preparation. Our lawyers handle around 60 active cases at any time. Services are free at point of use.",
    beneficiaries: "100–500",
    needs: {
      funding: { amount: 7500, currency: "USD" },
      expertise: ["legal"],
    },
    status: "partially supported",
  },
  {
    id: "p-13",
    orgId: "org-11",
    title: "Coding bootcamp for refugee youth",
    category: "education",
    type: "time-bound",
    targetDate: "2027-06-30",
    locationLabel: "Kisenyi, Kampala, Uganda",
    lat: 0.32,
    lng: 32.57,
    description:
      "Urban refugee youth in Kampala have skills but few entry points to the digital economy. We run a 9-month web development bootcamp for 40 learners. Graduates are placed with local tech employers.",
    beneficiaries: "under 100",
    needs: {
      funding: { amount: 14000, currency: "USD" },
      expertise: ["IT", "project management"],
      equipment: "20 refurbished laptops",
    },
    status: "seeking support",
  },
  {
    id: "p-14",
    orgId: "org-11",
    title: "Digital literacy for refugee mothers",
    category: "education",
    type: "ongoing",
    locationLabel: "Kisenyi, Kampala, Uganda",
    lat: 0.34,
    lng: 32.58,
    description:
      "Refugee mothers often miss out on the basic digital skills their children acquire at school. We run evening drop-in sessions on phones, email and online safety. Around 50 women attend monthly.",
    beneficiaries: "100–500",
    needs: {
      training: "Curriculum on online safety in Swahili",
    },
    status: "fully supported",
  },
  {
    id: "p-15",
    orgId: "org-12",
    title: "Community kitchen for border-crossing families",
    category: "food security",
    type: "ongoing",
    locationLabel: "Maicao, La Guajira, Colombia",
    lat: 11.38,
    lng: -72.23,
    description:
      "Venezuelan families arriving in Maicao often go days without a hot meal. Our kitchen serves 300 meals daily, run entirely by mothers from the community. Operations rely on monthly donations.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 5000, currency: "USD" },
      equipment: "Industrial gas stove, food storage containers",
    },
    status: "partially supported",
  },
  {
    id: "p-16",
    orgId: "org-2",
    title: "Child protection circle for new arrivals",
    category: "protection",
    type: "ongoing",
    locationLabel: "Nakivale Reception Centre, Uganda",
    lat: -0.79,
    lng: 30.96,
    description:
      "Children arriving at the reception centre often wait weeks before formal services begin. Our circle offers structured play, basic counselling and quick referrals. Around 60 children pass through monthly.",
    beneficiaries: "100–500",
    needs: {
      training: "Child safeguarding refresher",
      partnership: true,
    },
    status: "seeking support",
  },
  {
    id: "p-17",
    orgId: "org-13",
    title: "Rooftop water tanks for displaced families",
    category: "water/WASH",
    type: "time-bound",
    targetDate: "2026-11-30",
    locationLabel: "Tigray, Mekelle, Ethiopia",
    lat: 13.4967,
    lng: 39.4753,
    description:
      "Damaged municipal pipes leave many households relying on costly trucked water. We will install 25 rooftop tanks shared between neighbouring families and train caretakers.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 9500, currency: "USD" },
      equipment: "25 polyethylene 1,000L tanks, plumbing fittings",
      expertise: ["engineering"],
    },
    status: "seeking support",
  },
  {
    id: "p-18",
    orgId: "org-14",
    title: "Turkish-language classes for Syrian teens",
    category: "education",
    type: "ongoing",
    locationLabel: "Gaziantep, Türkiye",
    lat: 37.0662,
    lng: 37.3833,
    description:
      "Syrian adolescents arriving after years out of school struggle to enrol in Turkish public schools. Our evening classes prepare 80 teens per term for placement exams.",
    beneficiaries: "100–500",
    needs: {
      funding: { amount: 6800, currency: "EUR" },
      expertise: ["project management"],
      training: "Language teacher mentoring",
    },
    status: "partially supported",
  },
  {
    id: "p-19",
    orgId: "org-15",
    title: "Maternal health home visits",
    category: "healthcare",
    type: "ongoing",
    locationLabel: "White Nile State, Sudan",
    lat: 12.7,
    lng: 32.55,
    description:
      "Pregnant women in surrounding villages rarely reach the nearest clinic. Trained community midwives run weekly home visits and refer high-risk cases. About 120 pregnancies are followed each cycle.",
    beneficiaries: "100–500",
    needs: {
      funding: { amount: 7200, currency: "USD" },
      expertise: ["medical"],
      equipment: "Blood pressure cuffs, basic delivery kits",
    },
    status: "seeking support",
  },
  {
    id: "p-20",
    orgId: "org-16",
    title: "Migrant workers' legal hotline",
    category: "legal aid",
    type: "ongoing",
    locationLabel: "Tapachula, Chiapas, Mexico",
    lat: 14.9,
    lng: -92.26,
    description:
      "Central American migrants face wage theft and document confiscation. Our hotline triages cases and connects callers with pro-bono lawyers. We handle around 200 calls per month.",
    beneficiaries: "2,000+",
    needs: {
      funding: { amount: 4800, currency: "USD" },
      expertise: ["legal"],
      partnership: true,
    },
    status: "partially supported",
  },
  {
    id: "p-21",
    orgId: "org-17",
    title: "Afghan women's vocational kitchen",
    category: "livelihoods",
    type: "time-bound",
    targetDate: "2027-02-28",
    locationLabel: "Islamabad, Pakistan",
    lat: 33.6844,
    lng: 73.0479,
    description:
      "Afghan women in Islamabad have few income options outside the home. Our shared kitchen trains 24 women in catering and supplies a small home-delivery network.",
    beneficiaries: "under 100",
    needs: {
      funding: { amount: 5200, currency: "USD" },
      equipment: "Commercial gas range, refrigeration",
      training: "Food safety certification",
    },
    status: "seeking support",
  },
  {
    id: "p-22",
    orgId: "org-18",
    title: "Solar fridges for community clinic",
    category: "energy",
    type: "time-bound",
    targetDate: "2026-12-15",
    locationLabel: "Gore, Refugee Reception Area, Chad",
    lat: 7.9,
    lng: 16.6,
    description:
      "The community clinic loses vaccines weekly due to unreliable power. We will install two solar-powered medical fridges and panels to cover essential cold chain.",
    beneficiaries: "2,000+",
    needs: {
      funding: { amount: 12500, currency: "EUR" },
      equipment: "2 WHO-prequalified solar fridges",
      expertise: ["engineering", "medical"],
    },
    status: "seeking support",
  },
  {
    id: "p-23",
    orgId: "org-19",
    title: "Winter blankets distribution",
    category: "shelter",
    type: "time-bound",
    targetDate: "2026-12-01",
    locationLabel: "Erbil, Kurdistan Region, Iraq",
    lat: 36.19,
    lng: 44.0,
    description:
      "Displaced families in informal settlements face harsh winters. We will distribute 400 thermal blankets and basic heating fuel vouchers before the cold months.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 8800, currency: "USD" },
      partnership: true,
    },
    status: "seeking support",
  },
  {
    id: "p-24",
    orgId: "org-20",
    title: "Urban gardens for Venezuelan families",
    category: "food security",
    type: "ongoing",
    locationLabel: "Cúcuta, Norte de Santander, Colombia",
    lat: 7.8939,
    lng: -72.5078,
    description:
      "Rented homes leave little room for cooking from scratch. Our shared urban garden plots supply vegetables to 70 families and run weekly nutrition workshops.",
    beneficiaries: "100–500",
    needs: {
      funding: { amount: 3600, currency: "USD" },
      expertise: ["agricultural"],
      equipment: "Seeds, drip-irrigation kits",
    },
    status: "partially supported",
  },
  {
    id: "p-25",
    orgId: "org-21",
    title: "Peer mental-health circles for young men",
    category: "protection",
    type: "ongoing",
    locationLabel: "Berlin-Neukölln, Germany",
    lat: 52.481,
    lng: 13.4356,
    description:
      "Young Syrian and Afghan men in Berlin face isolation and limited access to culturally aware mental-health support. Our weekly peer circles serve about 35 participants.",
    beneficiaries: "under 100",
    needs: {
      expertise: ["medical"],
      training: "Peer-facilitator supervision",
      partnership: true,
    },
    status: "partially supported",
  },
  {
    id: "p-26",
    orgId: "org-22",
    title: "Bicycle repair workshop for youth",
    category: "livelihoods",
    type: "ongoing",
    locationLabel: "Kalobeyei Settlement, Turkana, Kenya",
    lat: 3.6,
    lng: 34.72,
    description:
      "Young people in Kalobeyei lack stable income and reliable transport. Our workshop trains 18 apprentices per cycle in bicycle repair and runs a paid service stand.",
    beneficiaries: "under 100",
    needs: {
      funding: { amount: 4200, currency: "USD" },
      equipment: "Tool sets, spare parts stock",
    },
    status: "fully supported",
  },
  {
    id: "p-27",
    orgId: "org-3",
    title: "Adolescent girls' menstrual health kits",
    category: "healthcare",
    type: "time-bound",
    targetDate: "2026-10-30",
    locationLabel: "Pagirinya Settlement, Adjumani, Uganda",
    lat: 3.39,
    lng: 31.8,
    description:
      "Many adolescent girls miss school during their periods. We will distribute 500 reusable menstrual kits with peer-led education sessions in three secondary schools.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 5400, currency: "USD" },
      equipment: "500 reusable pad kits",
      training: "Peer educator briefing",
    },
    status: "seeking support",
  },
  {
    id: "p-28",
    orgId: "org-9",
    title: "Latrine rehabilitation across IDP camp",
    category: "water/WASH",
    type: "time-bound",
    targetDate: "2026-09-30",
    locationLabel: "Bulengo IDP Camp, North Kivu, DR Congo",
    lat: -1.7,
    lng: 29.18,
    description:
      "Existing latrines are at capacity and pose hygiene risks. We will rehabilitate 40 family latrines and install handwashing points alongside each.",
    beneficiaries: "2,000+",
    needs: {
      funding: { amount: 13500, currency: "USD" },
      equipment: "Concrete slabs, plastic squatting plates",
      expertise: ["engineering"],
      partnership: true,
    },
    status: "seeking support",
  },
  {
    id: "p-ngo-1",
    orgId: "org-ngo-1",
    title: "Mobile maternal health clinic",
    category: "healthcare",
    type: "ongoing",
    locationLabel: "Eastleigh, Nairobi, Kenya",
    lat: -1.276,
    lng: 36.852,
    description:
      "A weekly mobile clinic serving urban refugee mothers in Eastleigh, co-staffed with local refugee-led health volunteers.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 22000, currency: "USD", raised: 9500 },
      partnership: true,
    },
    status: "partially supported",
  },
  {
    id: "p-ngo-2",
    orgId: "org-ngo-2",
    title: "Winter shelter kits for new arrivals",
    category: "shelter",
    type: "time-bound",
    targetDate: "2026-12-15",
    locationLabel: "Mavrovouni site, Lesvos, Greece",
    lat: 39.11,
    lng: 26.56,
    description:
      "Procurement and distribution of 400 winter kits (blankets, thermal mats, heaters) ahead of the cold season.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 18000, currency: "EUR", raised: 4200 },
      equipment: "Thermal blankets, portable heaters",
    },
    status: "seeking support",
  },
  {
    id: "p-ngo-3",
    orgId: "org-ngo-3",
    title: "Urban integration case management",
    category: "legal aid",
    type: "ongoing",
    locationLabel: "Kennedy, Bogotá, Colombia",
    lat: 4.629,
    lng: -74.155,
    description:
      "Caseworkers help Venezuelan families regularise status and access health, schooling and housing in Bogotá.",
    beneficiaries: "2,000+",
    needs: {
      funding: { amount: 30000, currency: "USD", raised: 21000 },
      expertise: ["legal"],
    },
    status: "partially supported",
  },
  {
    id: "p-ngo-4",
    orgId: "org-ngo-4",
    title: "Primary healthcare clinic, Mafraq",
    category: "healthcare",
    type: "ongoing",
    locationLabel: "Mafraq, Jordan",
    lat: 32.343,
    lng: 36.208,
    description:
      "Daily primary care services for Syrian refugees and host community, with referrals into the Jordanian system.",
    beneficiaries: "2,000+",
    needs: {
      funding: { amount: 45000, currency: "USD", raised: 12000 },
      expertise: ["medical"],
      partnership: true,
    },
    status: "partially supported",
    partnerOrgIds: ["org-10"],
  },
  {
    id: "p-ngo-5",
    orgId: "org-ngo-5",
    title: "Learning centres in Camp 4",
    category: "education",
    type: "time-bound",
    targetDate: "2027-06-30",
    locationLabel: "Camp 4, Cox's Bazar, Bangladesh",
    lat: 21.21,
    lng: 92.16,
    description:
      "Operating 6 learning centres co-run with Rohingya teaching circles, serving 1,200 children with daily classes.",
    beneficiaries: "500–2,000",
    needs: {
      funding: { amount: 27000, currency: "USD", raised: 8000 },
      training: "Teacher training for 24 volunteer instructors",
    },
    status: "seeking support",
    partnerOrgIds: ["org-6"],
  },
];


export const categories: Category[] = [
  "energy",
  "water/WASH",
  "education",
  "healthcare",
  "livelihoods",
  "shelter",
  "legal aid",
  "protection",
  "food security",
];

export const needsOptions = [
  "funding",
  "expertise",
  "equipment",
  "partnership",
] as const;
export type NeedFilter = (typeof needsOptions)[number];

export const countries = Array.from(
  new Set(organizations.map((o) => o.country)),
).sort();

export function orgById(id: string) {
  return organizations.find((o) => o.id === id);
}
export function projectsByOrg(orgId: string) {
  return projects.filter((p) => p.orgId === orgId);
}

export function orgKind(o: Organization | undefined | null): EntityKind {
  return o?.entityKind ?? "RLO";
}
