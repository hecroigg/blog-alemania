import type { Guide } from "@/lib/types";

export const citiesGuides: Guide[] = [
  {
    slug: "best-cities-germany",
    title: "Best cities to live in Germany: choose by fit, not fame",
    description: "Compare German cities using work, housing, transport, household, and lifestyle criteria—then build a shortlist you can actually test.",
    category: "moving-to-germany",
    eyebrow: "Cities",
    updated: "2026-09-23",
    readingMinutes: 10,
    featured: true,
    summary: "There is no single best German city. The best choice is the place where your income or study plan, realistic housing options, daily journeys, household needs, and preferred scale fit together.",
    takeaways: ["Start with non-negotiable work or study locations.", "Compare available homes, not broad rent rankings.", "Test door-to-door journeys.", "Consider the wider metropolitan region, not only city boundaries."],
    sections: [
      { heading: "Build the shortlist from constraints", paragraphs: ["Write down where you must travel regularly, the housing cost you can sustain, the space your household needs, and any language, school, accessibility, or community priorities. These constraints eliminate unsuitable options more reliably than lifestyle rankings.", "If your role is remote, verify how often presence is actually required and whether the contract permits the proposed residence."], bullets: ["Work or study geography", "Realistic total housing budget", "Household size and care needs", "Transport and travel frequency", "Language and professional network", "Preferred city scale and access to nature"] },
      { heading: "Compare city types", paragraphs: ["Berlin offers scale and international networks but can make housing and cross-city travel difficult. Munich combines a strong economy with significant housing costs. Hamburg has a broad employment base and distinct districts across a large area. Frankfurt is compact and exceptionally connected, with a much wider commuter region.", "Cologne and Düsseldorf sit inside the Rhine-Ruhr network; Stuttgart anchors a high-value engineering region; Mannheim and Heidelberg offer different versions of Rhine-Neckar life. The right comparison is often city-plus-region." ] },
      { heading: "Turn research into evidence", paragraphs: ["Collect a small sample of current jobs or study routes, ten plausible housing listings, three representative commutes, and the municipal pages you would use after arrival. Record dates and sources.", "Visit if the decision is high impact. Travel the commute, walk a potential neighbourhood in daytime and evening, inspect ordinary shops, and test the connection to the main station or airport."], callout: { title: "Rankings are prompts, not answers", text: "A city can score well on average and still be a poor match for your budget, sector, household, or daily route.", tone: "note" } },
      { heading: "Make a reversible first decision", paragraphs: ["If uncertainty is high, consider a lawful and registrable temporary arrangement while learning the market. Avoid paying a large premium indefinitely for flexibility you no longer need.", "Review the choice after real experience. A first city is not a permanent identity, and moving within Germany becomes easier once your documents, income, and local knowledge are established." ] },
    ],
    faqs: [
      { question: "Which German city is best for English speakers?", answer: "Large international labour markets may offer more English-speaking roles, but the answer depends on your profession. German still expands work and daily-life options everywhere." },
      { question: "Which city is most affordable?", answer: "Affordability combines income, available housing, transport, and household needs. Compare current listings and likely net income rather than using a static ranking." },
      { question: "Should I live outside the city?", answer: "It can improve housing options, but test transport frequency, late and weekend service, transfers, and the total monthly cost." },
    ],
    sources: [
      { name: "Federal Statistical Office", url: "https://www.destatis.de/EN/Home/_node.html", note: "Official demographic and economic statistics" },
      { name: "Federal Employment Agency", url: "https://www.arbeitsagentur.de/en", note: "Regional employment information" },
    ],
    related: ["cost-of-living-germany", "finding-housing-germany", "jobs-without-german", "moving-to-germany"],
  },
];
