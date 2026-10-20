/** Municipality-specific notes manually checked against public portals on 20 October 2026. */
export type RegistrationLocale = "en" | "es" | "de";
export type RegistrationCity = {
  slug: string;
  name: string;
  officialUrl: string;
  note: Record<RegistrationLocale,string>;
};
export const registrationCities: RegistrationCity[] = [
  {
    "slug": "mannheim",
    "name": "Mannheim",
    "officialUrl": "https://www.mannheim.de/de/service-bieten/buergerdienste/buergerservice/dienstleistungen/meldeangelegenheiten/an-und-ummeldung-eines-wohnsitzes",
    "note": {
      "en": "Mannheim has BürgerService offices and a digital application for eligible residents. The city publishes an English form. Confirm your identity requirements first.",
      "es": "Mannheim dispone de BürgerService y de trámite digital para personas que cumplan los requisitos. Hay formulario en inglés. Comprueba primero la identificación exigida.",
      "de": "In Mannheim sind Bürgerservice-Stellen und für Berechtigte auch die digitale Anmeldung möglich. Die Stadt bietet ein englisches Formular an."
    }
  },
  {
    "slug": "berlin",
    "name": "Berlin",
    "officialUrl": "https://service.berlin.de/dienstleistung/120686/",
    "note": {
      "en": "Berlin has Bürgeramt appointments and a conditional online service. Check online eligibility carefully, particularly when arriving from abroad.",
      "es": "Berlín ofrece citas en Bürgeramt y un trámite online con requisitos específicos. Comprueba la elegibilidad, sobre todo si llegas del extranjero.",
      "de": "Berlin bietet Bürgeramt-Termine und unter bestimmten Voraussetzungen eine Online-Anmeldung. Bei Zuzug aus dem Ausland Bedingungen genau prüfen."
    }
  },
  {
    "slug": "munich",
    "name": "Munich",
    "officialUrl": "https://stadt.muenchen.de/service/info/burgerburo-orleansplatz/1064395/",
    "note": {
      "en": "Munich separates registration of a main residence from other situations. Check eligibility for online registration and the correct Bürgerbüro route.",
      "es": "Múnich distingue el domicilio principal de otras situaciones. Verifica si puedes registrarte online o si necesitas Bürgerbüro.",
      "de": "München unterscheidet Hauptwohnsitz und andere Fälle. Prüfe die Online-Voraussetzungen und das zuständige Bürgerbüro."
    }
  },
  {
    "slug": "hamburg",
    "name": "Hamburg",
    "officialUrl": "https://www.hamburg.de/service/info/111202484/",
    "note": {
      "en": "Hamburg publishes different resident services depending on whether you moved within Germany, within Hamburg or from abroad. Choose your case first.",
      "es": "Hamburgo ofrece trámites distintos según llegues del extranjero, desde otra ciudad o te mudes dentro de Hamburgo. Selecciona tu caso.",
      "de": "Hamburg unterscheidet Zuzug aus dem Ausland, Umzug innerhalb Deutschlands und Umzug innerhalb Hamburgs. Wähle den passenden Fall."
    }
  },
  {
    "slug": "frankfurt",
    "name": "Frankfurt",
    "officialUrl": "https://frankfurt.de/leistungen/Umzug-8958631/Abmeldungen-Ummeldungen-Anmeldungen-8958634/Anmeldung-einer-Wohnung",
    "note": {
      "en": "Residents with a Frankfurt address can use Frankfurt Bürgerämter; eligible main or sole residences may use the electronic option. Secondary residences differ.",
      "es": "Con dirección en Frankfurt puedes acudir a sus Bürgerämter; el registro digital del domicilio principal depende de requisitos. El secundario es diferente.",
      "de": "Für Adressen in Frankfurt stehen Bürgerämter zur Verfügung; die digitale Anmeldung von Haupt- oder alleiniger Wohnung ist an Bedingungen geknüpft."
    }
  },
  {
    "slug": "cologne",
    "name": "Cologne",
    "officialUrl": "https://www.stadt-koeln.de/service/produkte/00415/index.html",
    "note": {
      "en": "Cologne offers in-person service and online registration for eligible cases. A rental contract alone is not the required Wohnungsgeberbescheinigung.",
      "es": "Colonia ofrece atención presencial y registro online si cumples requisitos. El contrato de alquiler no sustituye a la Wohnungsgeberbescheinigung.",
      "de": "Köln ermöglicht je nach Fall Anmeldung vor Ort oder online. Der Mietvertrag ersetzt nicht die Wohnungsgeberbescheinigung."
    }
  },
  {
    "slug": "dusseldorf",
    "name": "Düsseldorf",
    "officialUrl": "https://service.duesseldorf.de/suche/-/vr-bis-detail/dienstleistung/227/show",
    "note": {
      "en": "Düsseldorf has Bürgerbüro appointments and conditional electronic registration. The city distinguishes main and secondary residence.",
      "es": "Düsseldorf permite cita presencial y ciertos registros electrónicos. Distingue entre domicilio principal y secundario.",
      "de": "Düsseldorf bietet Bürgerbüro-Termine und unter Voraussetzungen elektronische Anmeldung. Haupt- und Nebenwohnsitz sind zu unterscheiden."
    }
  },
  {
    "slug": "stuttgart",
    "name": "Stuttgart",
    "officialUrl": "https://welcome.stuttgart.de/ankommen/anmelden",
    "note": {
      "en": "Stuttgart allows in-person registration at its Bürgerbüros and describes online options. Residence registration and immigration procedures are separate.",
      "es": "Stuttgart permite registrarse en Bürgerbüros y dispone de opciones digitales. Anmeldung y trámites de extranjería son procesos distintos.",
      "de": "Stuttgart bietet Anmeldung im Bürgerbüro und Online-Optionen. Meldeangelegenheiten und Ausländerrecht sind getrennte Verfahren."
    }
  },
  {
    "slug": "heidelberg",
    "name": "Heidelberg",
    "officialUrl": "https://www.heidelberg.de/-/Verfahrensbeschreibung/wohnsitz-anmelden/vbid6020109",
    "note": {
      "en": "Heidelberg publishes registration forms and the landlord confirmation. Electronic services depend on live municipal availability and eligibility.",
      "es": "Heidelberg publica formularios y confirmación del arrendador. El registro electrónico depende de disponibilidad y requisitos.",
      "de": "Heidelberg stellt Meldeformulare und Wohnungsgeberbestätigung bereit. Online-Angebot und Voraussetzungen bitte aktuell prüfen."
    }
  },
  {
    "slug": "freiburg",
    "name": "Freiburg",
    "officialUrl": "https://www.freiburg.de/pb/%2CLde_DE/-/205332/wohnsitz-anmelden/vbid6020109",
    "note": {
      "en": "Freiburg has citizen-service appointments and a digital residence service subject to eligibility. Check the city's live portal.",
      "es": "Freiburg ofrece atención presencial y registro digital sujeto a requisitos. Consulta su portal oficial actualizado.",
      "de": "Freiburg bietet Bürgertermine und bedingt auch eine digitale Wohnsitzanmeldung. Aktuelle Voraussetzungen im Portal prüfen."
    }
  },
  {
    "slug": "karlsruhe",
    "name": "Karlsruhe",
    "officialUrl": "https://www1.karlsruhe.de/service/Buergerdienste/leistung.php?id=6021867",
    "note": {
      "en": "For a first move from abroad, Karlsruhe's official page directs residents to an in-person Bürgerbüro appointment: its online and virtual routes are not available for that case.",
      "es": "Si te mudas por primera vez desde el extranjero, Karlsruhe exige acudir a un Bürgerbüro; sus vías online y virtual no sirven para ese caso.",
      "de": "Bei erstmaligem Zuzug aus dem Ausland verlangt Karlsruhe die Anmeldung vor Ort; Online-Anmeldung und virtuelles Amt sind dafür nicht verfügbar."
    }
  },
  {
    "slug": "leipzig",
    "name": "Leipzig",
    "officialUrl": "https://www.leipzig.de/service-portal/dienstleistung/wohnung-an-oder-ummelden-5333e768c725b",
    "note": {
      "en": "Leipzig offers Bürgerbüro registration and an electronic service for eligible applicants. Check the current registration category and booking options.",
      "es": "Leipzig dispone de Bürgerbüros y registro electrónico para personas elegibles. Revisa el tipo de trámite y las citas.",
      "de": "Leipzig bietet Bürgerbüro-Termine und für Berechtigte elektronische Anmeldung. Meldekategorie und Buchung prüfen."
    }
  },
  {
    "slug": "dresden",
    "name": "Dresden",
    "officialUrl": "https://www.dresden.de/de/rathaus/dienstleistungen/meldestellen.php",
    "note": {
      "en": "Dresden's Meldestellen publish office information and confirm that a signed housing-provider statement is required when registering an address.",
      "es": "Las oficinas de Dresden publican sus trámites y exigen la confirmación escrita del proveedor de vivienda para el registro.",
      "de": "Die Dresdner Meldestellen informieren über Termine; eine schriftliche Wohnungsgeberbestätigung ist bei der Anmeldung erforderlich."
    }
  },
  {
    "slug": "nuremberg",
    "name": "Nuremberg",
    "officialUrl": "https://www.nuernberg.de/internet/stadtportal/behoerdenwegweiser/dienstleistung/wohnungswechsel.html",
    "note": {
      "en": "Nuremberg allows eligible online registration of a main residence. Its official service says secondary-residence registration requires an appointment in person.",
      "es": "Núremberg admite registro online del domicilio principal si cumples los requisitos. Para el domicilio secundario debes acudir presencialmente.",
      "de": "Nürnberg ermöglicht unter Bedingungen die Hauptwohnungsanmeldung online; für Nebenwohnungen ist eine persönliche Vorsprache nötig."
    }
  },
  {
    "slug": "hannover",
    "name": "Hannover",
    "officialUrl": "https://www.hannover.de/Leben-in-der-Region-Hannover/B%C3%BCrger-Service/B%C3%BCrger-Service-in-der-Landeshauptstadt-Hannover/Termine-bei-Beh%C3%B6rden-buchen/Terminvereinbarung-in-den-B%C3%BCrger%C3%A4mtern",
    "note": {
      "en": "Hannover residents can book Bürgeramt services across the city. An electronic registration exists for eligible main-residence moves with supported online ID.",
      "es": "En Hannover puedes pedir cita en los Bürgerämter de la ciudad. Hay vía electrónica para algunos cambios de domicilio principal con identificación online.",
      "de": "In Hannover sind Bürgeramt-Termine stadtweit möglich; für bestimmte Hauptwohnungswechsel gibt es die elektronische Anmeldung mit Online-Ausweis."
    }
  },
  {
    "slug": "bremen",
    "name": "Bremen",
    "officialUrl": "https://www.service.bremen.de/dienstleistungen/registering-your-place-of-residence-when-moving-from-abroad-145790",
    "note": {
      "en": "Bremen explicitly requires in-person registration when arriving from abroad; its online service is for eligible domestic moves, not this situation.",
      "es": "Bremen exige inscripción presencial si llegas del extranjero; su trámite online se aplica a algunas mudanzas dentro de Alemania.",
      "de": "Bremen verlangt bei Zuzug aus dem Ausland eine persönliche Anmeldung; der Online-Dienst gilt für geeignete Umzüge innerhalb Deutschlands."
    }
  }
];
