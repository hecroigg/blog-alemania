export type TrustPage = { slug: string; title: string; eyebrow: string; description: string; sections: { heading: string; paragraphs: string[]; bullets?: string[] }[] };

export const trustPages: TrustPage[] = [
  { slug: "about", title: "Clarity for building a life in Germany", eyebrow: "About us", description: "GermanyBase is an independent editorial platform for people moving to Germany and the people already making a life here.", sections: [
    { heading: "Why this exists", paragraphs: ["Important information about Germany is often scattered across authorities, providers, German-language pages, and outdated personal accounts. We connect the steps without pretending every situation has one universal answer.", "GermanyBase is edited from Germany. We use first-hand checks of everyday processes where useful, then verify time-sensitive rules, prices and deadlines against the responsible official or primary source."] },
    { heading: "Who we write for", paragraphs: ["Workers, students, families, partners, freelancers, EU citizens, non-EU citizens, and anyone trying to understand everyday systems in Germany. We do not treat one arrival route as the default." ] },
    { heading: "Who reviews the guides", paragraphs: ["Guides are published under GermanyBase Editorial. Each practical guide shows a review date, links the sources used, and distinguishes national rules from city-specific or personal-status questions. We do not invent personal case studies or present one experience as a universal rule." ] },
    { heading: "What we are not", paragraphs: ["We are not a German government body, law firm, tax practice, medical provider, financial adviser, immigration service, or relocation agency. Our information is general and educational." ] },
  ] },
  { slug: "editorial-policy", title: "Editorial policy", eyebrow: "Trust", description: "How we choose, structure, review, label, and update GermanyBase content.", sections: [
    { heading: "Utility comes first", paragraphs: ["We publish when a page helps a reader understand a real decision or complete a real task. Search demand may reveal a question, but it does not determine the answer or justify a thin page." ] },
    { heading: "Evidence and language", paragraphs: ["We prefer primary and official sources for laws, public services, transport, statistics, and regulated systems. We distinguish a confirmed rule from practical advice and avoid invented precision.", "We write in plain English, define German terms once, and preserve nuance when nationality, status, city, or personal circumstances change the result." ] },
    { heading: "Commercial independence", paragraphs: ["Advertising, affiliate links, sponsorships, and lead relationships must be labelled. Commercial relationships do not buy favourable conclusions or prevent us from describing limitations." ] },
    { heading: "Updates", paragraphs: ["Every guide shows a review date. Time-sensitive statements should link to the live source. Material corrections are made promptly and transparently." ] },
  ] },
  { slug: "how-we-research", title: "How we research", eyebrow: "Trust", description: "Our source hierarchy and the checks behind practical guidance about Germany.", sections: [
    { heading: "Source hierarchy", paragraphs: ["For legal and administrative claims, we start with legislation, responsible authorities, federal or municipal service portals, and regulated bodies. For transport and products, we use the operator's current terms. For data, we prefer official statistics and clearly dated datasets." ], bullets: ["Legislation and responsible public authorities", "Municipal service portals", "Regulators and statutory institutions", "Transport and service operators", "Universities and recognised public bodies", "High-quality secondary explanations when primary material needs context"] },
    { heading: "What we verify", paragraphs: ["We check that the source owns the process, the page is current enough for the claim, and local variation is stated. We do not convert one person's experience into a universal rule." ] },
    { heading: "What readers should verify", paragraphs: ["Appointments, prices, thresholds, eligibility, document lists, timetables, and contract terms can change. We link to the live source so readers can confirm before acting." ] },
  ] },
  { slug: "corrections-policy", title: "Corrections policy", eyebrow: "Trust", description: "How to report an error and what we do when published information needs correction.", sections: [
    { heading: "Report a concern", paragraphs: ["Send the page URL, the sentence or section concerned, why it may be wrong, and any authoritative source that supports the correction. We do not require personal details beyond a reply address." ] },
    { heading: "Our process", paragraphs: ["We compare the claim with the responsible source, correct material errors promptly, and update the review date where the page has been substantively reassessed. Style changes do not need a correction note." ] },
    { heading: "Contact", paragraphs: ["Email hello@germanybase.de with the subject ‘Correction’. Include the page URL, the statement you believe is wrong, and the strongest source you have found." ] },
  ] },
  { slug: "affiliate-disclosure", title: "Affiliate disclosure", eyebrow: "Commercial transparency", description: "How future affiliate relationships will be labelled and separated from editorial judgement.", sections: [
    { heading: "No hidden recommendations", paragraphs: ["GermanyBase currently does not publish active affiliate links. If that changes, any link that may earn a commission will be labelled beside the recommendation and the page will include a disclosure." ] },
    { heading: "How products are assessed", paragraphs: ["Commercial availability does not guarantee inclusion. We intend to evaluate suitability, material costs, constraints, support, and the reader's decision—not only conversion value." ] },
    { heading: "Your price and our independence", paragraphs: ["A commission should not change the user's stated price. Partners will not approve editorial conclusions before publication." ] },
  ] },
  { slug: "advertiser-disclosure", title: "Advertiser disclosure", eyebrow: "Commercial transparency", description: "The rules for advertising and sponsored content on GermanyBase.", sections: [
    { heading: "Advertising", paragraphs: ["Advertising may be used to fund GermanyBase. Ads are separated from editorial text and do not determine which topics we cover, which sources we trust, or the conclusions of a guide." ] },
    { heading: "Sponsored content", paragraphs: ["Paid content will be clearly marked as sponsored. The commercial relationship, responsible advertiser, and nature of editorial involvement will be disclosed." ] },
    { heading: "What cannot be bought", paragraphs: ["Advertisers cannot buy an undisclosed recommendation, remove a material limitation, or present paid claims as independent research." ] },
  ] },
  { slug: "privacy-policy", title: "Privacy policy", eyebrow: "Legal", description: "A plain-language explanation of data handling on GermanyBase.", sections: [
    { heading: "Account-free use", paragraphs: ["GermanyBase is designed to work without a user account. Core guides and tools can be used without creating a profile or submitting an email address." ] },
    { heading: "Local preferences", paragraphs: ["Cookie choices are stored in your browser so the site remembers whether optional analytics or advertising is allowed. Necessary preference storage is used for this purpose." ] },
    { heading: "Analytics and advertising", paragraphs: ["Optional analytics and advertising technologies are controlled by the consent choices shown on the site where required. Hosting and security providers may process technical request information needed to deliver and protect the website." ] },
    { heading: "Your rights and contact", paragraphs: ["Data-protection rights depend on the processing and applicable law. Questions about privacy or correction requests can be sent to hello@germanybase.de." ] },
  ] },
  { slug: "cookie-policy", title: "Cookie policy", eyebrow: "Legal", description: "What the site's consent controls do and which optional technologies remain off by default.", sections: [
    { heading: "Necessary preferences", paragraphs: ["A local browser record stores the consent choice. This is used to remember the user's settings and does not create an advertising profile." ] },
    { heading: "Analytics", paragraphs: ["Analytics is optional and disabled by default. When a measurement ID is configured, it can load only after the user enables analytics." ] },
    { heading: "Advertising", paragraphs: ["Advertising technologies are treated as optional where consent is required. The site does not require advertising cookies for access to its guides or tools." ] },
    { heading: "Change your choice", paragraphs: ["Consent preferences are stored locally in the browser so the site can remember the user's choice. Clearing site data resets that local preference." ] },
  ] },
  { slug: "terms", title: "Terms of use", eyebrow: "Legal", description: "The baseline terms for using GermanyBase's public information and tools.", sections: [
    { heading: "Informational purpose", paragraphs: ["Content is general information, not personal legal, immigration, tax, medical, employment, or financial advice. Use the responsible authority or a qualified professional for a decision that depends on your facts." ] },
    { heading: "Accuracy and availability", paragraphs: ["We aim for accurate, current information but cannot guarantee that every external rule, link, appointment system, or product term remains unchanged. Check time-sensitive details before acting." ] },
    { heading: "External links", paragraphs: ["External sites control their own content, privacy practices, and availability. A link does not imply endorsement of every statement or service on that site." ] },
    { heading: "Responsible use", paragraphs: ["Do not rely on a GermanyBase page as the only source for a deadline, eligibility decision, legal dispute, medical decision, tax filing, or immigration application. Use the linked authority or a qualified professional where the consequences are significant." ] },
  ] },
  { slug: "contact", title: "Contact GermanyBase", eyebrow: "Contact", description: "Questions, corrections, and responsible commercial enquiries are welcome.", sections: [
    { heading: "Editorial questions and corrections", paragraphs: ["For a correction, include the page URL, the passage concerned, and an authoritative source where possible. Email hello@germanybase.de with the subject ‘Correction’." ] },
    { heading: "Partnerships", paragraphs: ["Commercial enquiries must identify the organisation and proposed relationship. Payment does not guarantee coverage or editorial approval." ] },
    { heading: "Important note", paragraphs: ["We cannot provide personal legal, immigration, tax, medical, or financial advice. Messages asking for individual professional advice may receive a pointer to the responsible authority instead." ] },
  ] },
];

export const trustPageMap = new Map(trustPages.map((page) => [page.slug, page]));
