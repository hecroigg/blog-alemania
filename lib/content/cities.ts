import type { City } from "@/lib/types";

const citySources = (url: string, name: string) => [
  { name: `${name} official city portal`, url, note: "Municipal services and local information" },
  { name: "Deutsche Bahn", url: "https://int.bahn.de/en", note: "Current long-distance rail information" },
];

export const cities: City[] = [
  {
    slug: "mannheim",
    name: "Mannheim",
    region: "Baden-Württemberg",
    description: "A well-connected Rhine-Neckar city with a distinctive grid centre, large employers, and a strong student presence.",
    bestFor: "Regional careers, students, and Rhine-Neckar access",
    character: "Practical, diverse, and better connected than its size first suggests.",
    featured: true,
    sections: [
      { heading: "Mannheim at a glance", paragraphs: ["Mannheim sits where the Rhine and Neckar meet. Its central Quadrate street system, major rail station, and position within the wider Rhine-Neckar region make daily life feel regional rather than confined to one municipal boundary.", "The city can suit people who want access to employers and universities without choosing Germany's largest urban centres. Compare neighbourhoods by commute, tram connection, and the side of the rivers you need to reach regularly."], bullets: ["Major interchange for regional and long-distance rail", "University and applied-sciences options in the wider region", "Fast access to Heidelberg, Ludwigshafen, and other Rhine-Neckar locations"] },
      { heading: "Housing and neighbourhood research", paragraphs: ["Do not choose on postcode alone. Mannheim's blocks and neighbouring municipalities can differ in feel and journey time. Check the actual route to work or university at the hours you will travel, then compare warm rent, contract length, deposit, and whether address registration is possible.", "For official housing matters and registration appointments, use Mannheim's municipal portal. Availability, required documents, and appointment systems can change."], callout: { title: "Before transferring money", text: "Verify the landlord, view the property or use a trusted representative, read the contract, and avoid pressure to pay before basic checks are complete.", tone: "warning" } },
      { heading: "Getting around", paragraphs: ["Mannheim is part of the Verkehrsverbund Rhein-Neckar network. Local trams and buses connect across city boundaries, while Mannheim Hauptbahnhof provides long-distance connections. Use the operator's current journey planner because engineering work and timetables change.", "Cycling can cover many central journeys, but inspect a route rather than assuming every major road offers the same comfort level."] },
      { heading: "Your first administrative steps", paragraphs: ["Once you have moved into registrable accommodation, check the city's current Anmeldung process and required documents. Keep the registration confirmation safely: other organisations may ask for it.", "International residents should separate municipal address registration from immigration matters. They are related but handled through different processes and requirements."], bullets: ["Check appointment availability before your move", "Ask the accommodation provider for the Wohnungsgeberbestätigung", "Put your name on the mailbox", "Keep digital and paper copies of important documents"] },
    ],
    sources: [...citySources("https://www.mannheim.de/en", "Mannheim"), { name: "VRN", url: "https://www.vrn.de/", note: "Regional public transport" }],
  },
  {
    slug: "berlin", name: "Berlin", region: "Berlin", description: "Germany's largest city, with an international job market, vast cultural life, and a demanding housing search.", bestFor: "International networks, technology, culture, and variety", character: "Expansive, energetic, and highly neighbourhood-dependent.", featured: true,
    sections: [{ heading: "Plan around distance", paragraphs: ["Berlin is not one experience. Commutes across the city can be long, so compare neighbourhoods using real journeys rather than distance on a map.", "Housing competition can be intense. Prepare a careful application pack, protect personal data, and do not let urgency override fraud checks."] }, { heading: "Administration", paragraphs: ["Berlin publishes multilingual service information through its official portal. Appointment procedures and document lists can change, so use the live service page before attending."] }],
    sources: citySources("https://www.berlin.de/en/", "Berlin"),
  },
  {
    slug: "munich", name: "Munich", region: "Bavaria", description: "A prosperous southern city known for major employers, strong transport, nearby nature, and high housing pressure.", bestFor: "Engineering, technology, established companies, and Alpine access", character: "Polished, orderly, and expensive by German standards.", featured: true,
    sections: [{ heading: "Budget before committing", paragraphs: ["Housing is often the central constraint in a Munich move. Build a complete monthly budget and compare realistic warm-rent scenarios before accepting a salary or study place.", "The wider S-Bahn region may offer alternatives, but reliability and transfer patterns matter. Test the door-to-door journey."] }, { heading: "Settle in", paragraphs: ["Use Munich's official portal for registration and municipal services. Keep employer or university start dates separate from appointment assumptions and allow contingency time."] }],
    sources: citySources("https://stadt.muenchen.de/infos/languages.html", "Munich"),
  },
  {
    slug: "hamburg", name: "Hamburg", region: "Hamburg", description: "A port city with media, logistics, aviation, and technology sectors spread across a large urban area.", bestFor: "Maritime industries, media, logistics, and waterfront city life", character: "Independent, spacious, and shaped by water.",
    sections: [{ heading: "Choose your side of the city", paragraphs: ["Hamburg's waterways and scale affect journeys. Compare actual transit connections and night or weekend frequency when shortlisting homes."] }, { heading: "Local setup", paragraphs: ["Use the Hamburg Welcome Center and city portal for current official information. Processes may differ according to nationality and purpose of stay."] }],
    sources: citySources("https://www.hamburg.com/", "Hamburg"),
  },
  {
    slug: "frankfurt", name: "Frankfurt", region: "Hesse", description: "A compact international business centre with exceptional air and rail connections and a broad commuter region.", bestFor: "Finance, professional services, aviation, and international travel", character: "Global, compact, and more varied than its skyline suggests.",
    sections: [{ heading: "Think regionally", paragraphs: ["Frankfurt's daily labour and housing market extends far beyond the city boundary. A regional rail connection can matter more than the municipality on your address."] }, { heading: "Arrive prepared", paragraphs: ["Check city services for the registration process and use official transport planners for commuting decisions. Airport proximity should not be confused with every neighbourhood having the same connection."] }],
    sources: citySources("https://frankfurt.de/english", "Frankfurt"),
  },
  {
    slug: "cologne", name: "Cologne", region: "North Rhine-Westphalia", description: "A large Rhine city with media, insurance, industry, universities, and a notably social local culture.", bestFor: "Media, insurance, students, and Rhine-Ruhr access", character: "Outgoing, creative, and deeply attached to local identity.",
    sections: [{ heading: "Use the wider network", paragraphs: ["Cologne connects into the Rhine-Ruhr region, but crowded routes and river crossings can affect commutes. Test the journey at your expected time."] }, { heading: "Housing basics", paragraphs: ["Apply with organised documents and compare warm rent rather than headline cold rent. Verify current registration requirements on the city's portal."] }],
    sources: citySources("https://www.stadt-koeln.de/leben-in-koeln/soziales/internationales/english", "Cologne"),
  },
  {
    slug: "dusseldorf", name: "Düsseldorf", region: "North Rhine-Westphalia", description: "A Rhine business hub with fashion, telecommunications, professional services, and strong regional links.", bestFor: "Corporate careers, trade fairs, fashion, and international business", character: "Compact, international, and commercially minded.",
    sections: [{ heading: "City and region", paragraphs: ["Düsseldorf's airport and Rhine-Ruhr links expand work options. Compare local and regional tickets against your actual commute before choosing a home."] }, { heading: "Official steps", paragraphs: ["Use the city portal for appointment and registration information. Preserve your residence documents, rental evidence, and registration confirmations together."] }],
    sources: citySources("https://www.duesseldorf.de/international", "Düsseldorf"),
  },
  {
    slug: "stuttgart", name: "Stuttgart", region: "Baden-Württemberg", description: "An engineering and automotive centre built across hills and connected to a dense surrounding region.", bestFor: "Engineering, automotive, manufacturing, and applied research", character: "Prosperous, hilly, and regionally integrated.",
    sections: [{ heading: "Topography changes the commute", paragraphs: ["A short straight-line distance can involve steep streets or transfers. Evaluate housing with a door-to-door route and consider the wider VVS network."] }, { heading: "Employment and setup", paragraphs: ["Large employers are distributed across the region. Confirm the exact work location before fixing your housing search area, then use the city's official portal for local administration."] }],
    sources: citySources("https://www.stuttgart.de/en/", "Stuttgart"),
  },
  {
    slug: "heidelberg", name: "Heidelberg", region: "Baden-Württemberg", description: "A compact university and research city with an international population and close links across Rhine-Neckar.", bestFor: "Academia, research, life sciences, and a smaller-city setting", character: "Historic, academic, and highly international.",
    sections: [{ heading: "A compact city in a wider region", paragraphs: ["Heidelberg is closely linked to Mannheim and other Rhine-Neckar centres. Housing searches can include nearby municipalities when the transport connection works."] }, { heading: "Academic arrivals", paragraphs: ["University processes do not replace municipal or immigration requirements. Keep enrolment, insurance, housing, address registration, and residence tasks as separate checklist items."] }],
    sources: citySources("https://www.heidelberg.de/english/Home.html", "Heidelberg"),
  },
];

export const cityMap = new Map(cities.map((city) => [city.slug, city]));
