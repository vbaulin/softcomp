export type NavItem = {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
};

export type HeroSlide = {
  title: string;
  kicker: string;
  description: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  credit: string;
};

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  categoryLabel: string;
  imageUrl?: string;
  imageAlt?: string;
  likes?: number;
};

export type EventItem = {
  slug: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  venue?: string;
  venueAddress?: string;
  organizer?: {
    name: string;
    phone?: string;
    email?: string;
    url?: string;
  };
  websiteUrl?: string;
  contentHtml?: string;
  excerpt: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type FeatureBlock = {
  title: string;
  body: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
};

export type RichBlock =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "image";
      url: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "html";
      html: string;
    };

export type SitePage = {
  slug: string;
  title: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  blocks: RichBlock[];
};

export type SiteMeta = {
  name: string;
  description: string;
  email: string;
  logoUrl: string;
  researchGateUrl: string;
  socials: Array<{ label: string; href: string }>;
};
