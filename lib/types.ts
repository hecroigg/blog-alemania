export type IconName =
  | "arrow"
  | "building"
  | "briefcase"
  | "home"
  | "document"
  | "wallet"
  | "health"
  | "train"
  | "sun"
  | "city"
  | "book"
  | "search"
  | "check"
  | "clock"
  | "external"
  | "menu"
  | "close"
  | "shield"
  | "mail";

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  intro: string;
  icon: IconName;
  color: string;
  featuredTopics: string[];
};

export type ContentBlock = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: { title: string; text: string; tone?: "note" | "warning" | "success" };
};

export type FAQItem = { question: string; answer: string };
export type Source = { name: string; url: string; note?: string };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  eyebrow: string;
  updated: string;
  readingMinutes: number;
  summary: string;
  takeaways: string[];
  sections: ContentBlock[];
  faqs: FAQItem[];
  sources: Source[];
  related: string[];
  featured?: boolean;
};

export type City = {
  slug: string;
  name: string;
  region: string;
  description: string;
  bestFor: string;
  character: string;
  sections: ContentBlock[];
  sources: Source[];
  featured?: boolean;
};

export type Audience = {
  slug: string;
  name: string;
  description: string;
  priorities: string[];
  guideSlugs: string[];
};
