import type {
  EventItem,
  FeatureBlock,
  HeroSlide,
  NavItem,
  NewsPost,
  SiteMeta,
  SitePage
} from "@/types/content";

const uploads = "https://eu-softcomp.net/wp-content/uploads";

export const siteMeta: SiteMeta = {
  name: "SoftComp",
  description:
    "The SoftComp Network of Excellence aims to establish a knowledge base for the intelligent design of functional and nanoscale soft matter composites.",
  email: "softcomp@fz-juelich.de",
  logoUrl: `${uploads}/2017/01/Logo.png`,
  researchGateUrl: "https://www.researchgate.net/project/SoftComp-Network-of-Excellence",
  socials: [
    { label: "LinkedIn: SoftComp Consortium", href: "https://www.linkedin.com/company/softcomp-consortium/" },
    { label: "X: SoftComp", href: "https://x.com/SoftCompNetwork" },
    { label: "Bluesky: SoftComp", href: "https://bsky.app/profile/softcompnetwork.bsky.social" }
  ]
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "about-us",
    label: "About Us",
    href: "/about-us/mission",
    children: [
      { id: "mission", label: "Mission", href: "/about-us/mission" },
      { id: "partners", label: "Partners", href: "/about-us/partners" },
      { id: "organization", label: "Organization", href: "/about-us/organization" },
      { id: "members", label: "Members", href: "/about-us/members" },
      { id: "officers", label: "Officers", href: "/about-us/officers" }
    ]
  },
  {
    id: "news",
    label: "News",
    href: "/news",
    children: [
      { id: "focus-articles", label: "Focus Articles", href: "/news/focus-articles" },
      { id: "scientific-highlights", label: "Scientific Highlights", href: "/news/scientific-highlights" },
      { id: "meetings", label: "Meetings", href: "/news/meetings" },
      { id: "events", label: "Events", href: "/events" },
      { id: "job-opportunities", label: "Job Opportunities", href: "/news/job-opportunities" },
      { id: "newsletters", label: "Newsletters", href: "/download/newsletters" },
      { id: "picture-galleries", label: "Picture Galleries", href: "/news/picture-gallery" },
      { id: "brochures", label: "Brochures", href: "/download/brochures" }
    ]
  },
  {
    id: "research-platforms",
    label: "Research Platforms",
    href: "/research-platforms",
    children: [
      { id: "synthesis", label: "Synthesis", href: "/research-platforms/synthesis" },
      { id: "experimental", label: "Experimental", href: "/research-platforms/experimental" },
      { id: "theory-simulation", label: "Theory & Simulation", href: "/research-platforms/theory-simulation" }
    ]
  },
  {
    id: "network-areas",
    label: "Network Areas",
    href: "/networks_areas",
    children: [
      { id: "na1", label: "Network Area 1", href: "/networks_areas/na1" },
      { id: "na2", label: "Network Area 2", href: "/networks_areas/na2" },
      { id: "na4", label: "Network Area 4", href: "/networks_areas/na4" }
    ]
  },
  {
    id: "downloads",
    label: "Downloads",
    href: "/download",
    children: [
      { id: "download-brochures", label: "Brochures", href: "/download/brochures" },
      { id: "consortium", label: "Consortium Agreement", href: "/download/consortium-agreement" },
      { id: "download-newsletters", label: "Newsletters", href: "/download/newsletters" },
      { id: "download-logo", label: "Logo", href: "/download/logo" },
      { id: "road-map", label: "Research Road Map", href: "/download/research-road-map" }
    ]
  },
  { id: "contact", label: "Contact", href: "/contact" },
  { id: "user-area", label: "User Area", href: "/user-area" }
];

export const heroSlides: HeroSlide[] = [
  {
    title: "Self-assembling & Biomimetic Systems",
    kicker: "Network Area 2",
    description:
      "Self-assembling amphiphilic systems are important for pharmaceutical, biological, cleaning and washing applications.",
    href: "/networks_areas/na2",
    imageUrl: `${uploads}/2017/02/Slider2_RedBloodCells_Shutterstock.jpg`,
    imageAlt: "Microscopic red biological structure",
    credit: "(C) Shutterstock"
  },
  {
    title: "Colloidal Composites, Glasses and Gels",
    kicker: "Network Area 1",
    description:
      "Many industrially and biologically important systems are composites, gels or glasses.",
    href: "/networks_areas/na1",
    imageUrl: `${uploads}/2017/02/Slider1_BubblesInGel_Shutterstock.jpg`,
    imageAlt: "Bubbles suspended in a gel-like material",
    credit: "(C) Shutterstock"
  },
  {
    title: "Polymer-based Complex Systems",
    kicker: "Network Area 4",
    description:
      "Mechanical properties of new polymeric systems have potential applications in elasticity, tackiness and soft materials.",
    href: "/networks_areas/na4",
    imageUrl: `${uploads}/2017/02/Slider3_ChemicalFormula_Shutterstock.jpg`,
    imageAlt: "Chemical formula and polymer structure illustration",
    credit: "(C) Shutterstock"
  }
];

export const newsPosts: NewsPost[] = [
  {
    slug: "impact-with-memory-how-soft-materials-bridge-liquids-and-elastics",
    title: "Impact with Memory: How Soft Materials Bridge Liquids and Elastics",
    excerpt:
      "Even a familiar phenomenon like a bounce can reveal new insights into the properties of soft matter, as a new study by researchers from SoftComp partner Durham University demonstrates.",
    publishedAt: "2026-05-12T15:40:16+02:00",
    categoryLabel: "Scientific Highlights",
    imageUrl: `${uploads}/2026/05/cover_v6-480x348.jpg`,
    imageAlt: "Liquid drop and elastic sphere impact comparison",
    likes: 0
  },
  {
    slug: "waters-hidden-switch-how-ferroelectricity-may-trigger-phase-transitions",
    title: "Water's Hidden Switch: How Ferroelectricity May Trigger Its Mysterious Phase Transitions",
    excerpt:
      "A study led by SoftComp partner Ca Foscari University of Venice reveals a surprising route toward understanding water anomalies.",
    publishedAt: "2025-12-17T15:45:51+01:00",
    categoryLabel: "Scientific Highlights",
    imageUrl: `${uploads}/2025/12/Grafik2-cropped-480x317.jpg`,
    imageAlt: "Polarization-density phase diagram",
    likes: 0
  },
  {
    slug: "annual-meeting-2025-venice-mestre",
    title: "140 participants attended the SoftComp/EUSMI Annual Meeting 2025 in Venice-Mestre",
    excerpt:
      "The SoftComp/EUSMI Annual Meeting 2025 took place in Venice-Mestre with participants from SoftComp groups and external speakers.",
    publishedAt: "2025-09-10T12:00:00+02:00",
    categoryLabel: "Meetings",
    imageUrl: `${uploads}/2026/05/IMG_20260519_125416921_HDR-480x360.jpg`,
    imageAlt: "SoftComp Annual Meeting group photo",
    likes: 0
  },
  {
    slug: "softcomp-webinar-series-2025",
    title: "SoftComp webinar series 2025",
    excerpt:
      "Reports and announcements from the SoftComp webinar series featuring invited talks from the soft matter community.",
    publishedAt: "2025-06-25T12:00:00+02:00",
    categoryLabel: "Webinars",
    likes: 0
  }
];

export const events: EventItem[] = [
  {
    slug: "tasso-springer-fellowships-six-phd-positions-in-neutron-research",
    title: "Tasso Springer Fellowships - Six PhD Positions in Neutron Research",
    startsAt: "2026-03-18T00:00:00+01:00",
    endsAt: "2026-06-18T23:59:59+02:00",
    excerpt:
      "Research opportunities with neutrons and international scientists through the Juelich Centre for Neutron Science."
  },
  {
    slug: "microfluidic-horizons-2026",
    title: "Microfluidic Horizons 2026",
    startsAt: "2026-05-16T00:00:00+02:00",
    endsAt: "2026-05-22T23:59:59+02:00",
    venue: "University of Padova, Dipartimento di Fisica, Padova",
    excerpt:
      "A conference on microfluidic horizons with abstract submission open to SoftComp colleagues."
  },
  {
    slug: "bombannes-summer-school-on-scattering-2026",
    title: "Bombannes summer school on scattering 2026",
    startsAt: "2026-06-09T00:00:00+02:00",
    endsAt: "2026-06-16T23:59:59+02:00",
    venue: "Carcan-Maubuisson, France",
    excerpt:
      "The 17th Bombannes Summer School on scattering methods applied to soft condensed matter."
  },
  {
    slug: "20th-european-student-colloid-conference",
    title: "20th European Student Colloid Conference",
    startsAt: "2026-06-29T00:00:00+02:00",
    excerpt:
      "The 20th European Student Colloid Conference takes place in Donostia / San Sebastian."
  },
  {
    slug: "polysolvat-16-at-jcns",
    title: "Polysolvat 16 at JCNS",
    startsAt: "2026-10-06T00:00:00+02:00",
    endsAt: "2026-10-09T23:59:59+02:00",
    imageUrl: `${uploads}/2017/01/Infrastructure-300x200.jpg`,
    imageAlt: "SoftComp infrastructure",
    excerpt:
      "An international conference in a successful series focused on polymer solvation and soft matter."
  }
];

export const features: FeatureBlock[] = [
  {
    title: "SoftComp Partners",
    body:
      "SoftComp partners share the goal of understanding the physical mechanisms and properties of complex multi-component soft matter composites.",
    href: "/about-us/partners",
    imageUrl: `${uploads}/2017/01/upload.png`,
    imageAlt: "SoftComp partners icon"
  },
  {
    title: "Methods & Instruments",
    body:
      "The joint use of methods and instruments integrates synthesis, experimental techniques and theoretical and numerical methods across the network.",
    href: "/research-platforms",
    imageUrl: `${uploads}/2017/01/download.png`,
    imageAlt: "Methods and instruments icon"
  }
];

export const fallbackPages: Record<string, SitePage> = {
  "about-us/mission": {
    slug: "about-us/mission",
    title: "Mission",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us/mission" },
      { label: "Mission", href: "/about-us/mission" }
    ],
    blocks: [
      {
        type: "paragraph",
        text:
          "The Mission of SoftComp is to provide a sustainable environment for the integration of leading European research groups in the field of soft matter composites."
      },
      {
        type: "paragraph",
        text:
          "The network supports research, dissemination, education and industrial outreach for the medium and long term."
      },
      { type: "heading", level: 3, text: "The main objectives of SoftComp are:" },
      {
        type: "list",
        items: [
          "better science through interdisciplinary communication and joint projects",
          "better science through access to joint infrastructure",
          "interdisciplinary education of the next generation of soft matter scientists",
          "scientific bases for soft matter related technology in industry"
        ]
      },
      { type: "heading", level: 3, text: "Instruments" },
      {
        type: "list",
        items: [
          "access to research platforms",
          "exchange of scientists",
          "web-based communication",
          "joint dissemination and education programmes",
          "industrial and public outreach"
        ]
      }
    ]
  },
  "research-platforms": {
    slug: "research-platforms",
    title: "Research Platforms",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Research Platforms", href: "/research-platforms" }
    ],
    blocks: [
      { type: "heading", level: 3, text: "Strengthening Scientific Excellence" },
      {
        type: "image",
        url: `${uploads}/2017/01/Infrastructure-1024x683.jpg`,
        alt: "SoftComp research infrastructure",
        caption:
          "SoftComp partners can make use of large-scale facilities such as neutron scattering through the network's experimental platform."
      },
      {
        type: "paragraph",
        text:
          "The SoftComp Network has set up an infrastructure aimed at bringing together a critical mass of resources and expertise that underpins European leadership in soft-matter composites."
      },
      {
        type: "paragraph",
        text:
          "Three research platforms assemble the network's abilities: synthesis, experimental techniques, and theoretical and numerical methods."
      },
      {
        type: "list",
        items: ["Synthesis", "Experimental Techniques", "Theoretical and Numerical Methods"]
      },
      { type: "heading", level: 3, text: "How to Proceed" },
      {
        type: "paragraph",
        text:
          "SoftComp members can apply for platform visits, sample exchange and collaboration support through the network systems."
      }
    ]
  },
  networks_areas: {
    slug: "networks_areas",
    title: "Network Areas",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Network Areas", href: "/networks_areas" }
    ],
    blocks: [
      { type: "heading", level: 3, text: "Scientific Aspects Covered by the Network" },
      {
        type: "paragraph",
        text:
          "The SoftComp NoE covers three scientific network areas dealing with different material composites."
      },
      {
        type: "list",
        items: [
          "Network Area 1: Colloidal Composites, Gels and Glasses",
          "Network Area 2: Self-assembling and Biomimetic Systems",
          "Network Area 4: Polymer-based Complex Systems"
        ]
      },
      {
        type: "paragraph",
        text:
          "Former Network Area 5 has merged into Network Area 1, and Network Area 3 has merged into Network Area 2."
      }
    ]
  },
  contact: {
    slug: "contact",
    title: "Contact",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" }
    ],
    blocks: [
      { type: "paragraph", text: "SoftComp Network Office" },
      { type: "paragraph", text: "Email: softcomp@fz-juelich.de" }
    ]
  }
};

