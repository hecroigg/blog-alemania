import type { City } from "@/lib/types";
import type { EditorialLocale } from "@/lib/content/localized-general-guides";
import esCatalog from "@/lib/translations/es.json";
import deCatalog from "@/lib/translations/de.json";

type CityTranslation = readonly [string, string, string, string, string, string, string, string];
type CityLanguages = Record<"es" | "de", CityTranslation>;

// Each tuple translates the eight new, municipality-specific fields omitted
// by the original JSON catalogs: heading, 2 paragraphs, 3 checklist bullets,
// municipal source label and its review note. Everything else is translated
// with the existing editorial catalogs. Official URLs and place names remain intact.
const cityRegistrationCopy: Record<string, CityLanguages> = {
  mannheim: {
    es: [
      "Empadronarse y elegir domicilio en Mannheim",
      "Mannheim permite registrar o cambiar el domicilio en las oficinas Bürgerservice. También ofrece una opción digital en su portal ciudadano para quienes cumplan los requisitos electrónicos. La página oficial facilita formularios, una plantilla de Wohnungsgeberbestätigung y un formulario de registro en inglés. Tener pasaporte de la UE no basta por sí solo para usar todas las opciones digitales: verifica qué identificación electrónica se admite.",
      "En la región Rin-Neckar, el municipio donde debes empadronarte depende de la dirección de tu vivienda, no de tu universidad ni de tu empresa. Si alquilas en Ludwigshafen o Heidelberg, debes dirigirte a la Meldebehörde correspondiente. La ciudad indica que las personas de un mismo hogar pueden usar un formulario conjunto y, en determinadas condiciones, un representante puede presentar documentación. Guarda la Meldebestätigung: pueden pedírtela en el banco o en el trabajo.",
      "Acude al municipio donde está situada realmente la vivienda.",
      "Pide al propietario o inquilino principal una Wohnungsgeberbestätigung firmada.",
      "Utiliza los formularios oficiales de Mannheim y comprueba si puedes identificarte en línea.",
      "Mannheim Bürgerdienste: registro y cambio de domicilio",
      "Fuente municipal oficial; comprobada el 20 de octubre de 2026. Los requisitos pueden cambiar.",
    ],
    de: [
      "Anmeldung und Wohnortwahl in Mannheim",
      "Mannheim ermöglicht die An- und Ummeldung bei den Bürgerservice-Stellen. Über das Bürgerportal gibt es für Personen, die die elektronischen Voraussetzungen erfüllen, auch einen digitalen Weg. Die offizielle Serviceseite verlinkt Formulare sowie eine Vorlage für die Wohnungsgeberbestätigung; unter den Downloads befindet sich auch ein englisches Anmeldeformular. Ein EU-Pass allein berechtigt nicht automatisch zur digitalen Anmeldung: Prüfen Sie zunächst die zulässigen elektronischen Identitätsnachweise.",
      "Bei einem Umzug in der Rhein-Neckar-Region richtet sich die Meldebehörde nach der tatsächlichen Wohnadresse, nicht nach der Universität oder dem Arbeitgeber. Wer in Ludwigshafen oder Heidelberg wohnt, muss sich dort melden. Laut Stadt können gemeinsam umziehende Haushaltsmitglieder ein gemeinsames Formular verwenden; unter bestimmten Voraussetzungen darf eine bevollmächtigte Person Unterlagen einreichen. Bewahren Sie Ihre Meldebestätigung auf, da Banken oder Arbeitgeber sie verlangen können.",
      "Wählen Sie die Meldebehörde am tatsächlichen Wohnort.",
      "Fordern Sie vom Vermieter oder Hauptmieter eine unterschriebene Wohnungsgeberbestätigung an.",
      "Verwenden Sie Mannheims amtliche Formulare und prüfen Sie Ihre E-ID-Berechtigung.",
      "Mannheim Bürgerdienste: An- und Ummeldung",
      "Amtliche kommunale Quelle; geprüft am 20. Oktober 2026. Anforderungen können sich ändern.",
    ],
  },
  berlin: {
    es: [
      "Registrar tu domicilio en Berlín: elige el procedimiento correcto",
      "Berlín dispone de un trámite específico para registrar la residencia principal o única. Normalmente debes hacerlo dentro de los 14 días posteriores a la mudanza, con las excepciones previstas por la ley. Puedes solicitar cita en un Bürgeramt o utilizar el procedimiento digital si cumples los requisitos de identidad electrónica. Llegar desde el extranjero no implica poder realizarlo automáticamente en línea.",
      "Antes de optar por el trámite digital, revisa los criterios oficiales y prepara una identificación válida, la confirmación firmada del proveedor de vivienda y la fecha real de entrada. El contrato de alquiler no sustituye la Wohnungsgeberbestätigung. Si no puedes hacerlo en línea, consulta cómo pedir una cita presencial o cómo utilizar un representante autorizado.",
      "Comprueba si el registro digital admite tu nacionalidad y modalidad de traslado.",
      "Consigue la Wohnungsgeberbestätigung del propietario o proveedor de alojamiento.",
      "Confirma la cita, los documentos y los cambios en la página oficial del Bürgeramt.",
      "Servicio oficial de Anmeldung de Berlín y documentos",
      "Requisitos, documentos y modalidades de registro; revisado el 19 de octubre de 2026.",
    ],
    de: [
      "Wohnsitz in Berlin anmelden: den richtigen Weg wählen",
      "Berlin bietet einen eigenen Dienst zur Anmeldung einer Haupt- oder alleinigen Wohnung. Nach dem Einzug gilt normalerweise eine Frist von 14 Tagen, vorbehaltlich gesetzlicher Ausnahmen. Möglich sind Termine beim Bürgeramt oder die elektronische Wohnsitzanmeldung, sofern die Voraussetzungen für den Online-Identitätsnachweis erfüllt sind. Ein Zuzug aus dem Ausland berechtigt nicht automatisch zum digitalen Verfahren.",
      "Prüfen Sie vor der digitalen Anmeldung die amtlichen Voraussetzungen und bereiten Sie einen gültigen Ausweis, die unterschriebene Wohnungsgeberbestätigung und das tatsächliche Einzugsdatum vor. Der Mietvertrag ersetzt diese Bestätigung nicht. Wenn die digitale Anmeldung nicht möglich ist, folgen Sie den Hinweisen zu persönlichen Terminen oder einer zulässigen Vertretung.",
      "Prüfen Sie, ob die Online-Anmeldung für Ihre Staatsangehörigkeit und Umzugsart zulässig ist.",
      "Besorgen Sie die Wohnungsgeberbestätigung vom Wohnungsgeber.",
      "Kontrollieren Sie Termin, Unterlagen und Änderungen auf der offiziellen Bürgeramt-Seite.",
      "Berlin: offizieller Anmeldedienst und Formulare",
      "Voraussetzungen, erforderliche Nachweise und Anmeldewege; geprüft am 19. Oktober 2026.",
    ],
  },
  munich: {
    es: [
      "Empadronarse en Múnich: en línea o en el Bürgerbüro",
      "El Bürgerbüro de Múnich explica que, normalmente, los nuevos residentes deben registrar su domicilio en los 14 días posteriores a la mudanza. Según los requisitos, el trámite puede hacerse en línea o presencialmente. La inscripción electrónica está prevista para la vivienda principal, no para una residencia secundaria: si tienes más de un domicilio, comprueba cuál es tu procedimiento.",
      "La mudanza debe haberse producido: no puedes registrar por adelantado una fecha futura de entrada. El municipio solicita documentos de identidad y la confirmación del proveedor de vivienda. Las familias pueden tener requisitos específicos; consulta las instrucciones para mudanzas con niños en lugar de dar por hecho que una única cita sirve para todos.",
      "No solicites el Anmeldung con una fecha de entrada que todavía no ha llegado.",
      "Confirma si registras una vivienda principal o secundaria.",
      "Consulta los documentos aceptados y los requisitos para familias en la web municipal.",
      "Instrucciones oficiales de Wohnsitzanmeldung de Múnich",
      "Trámite municipal y alcance del servicio digital; revisado el 19 de octubre de 2026.",
    ],
    de: [
      "Wohnsitzanmeldung in München: online oder im Bürgerbüro",
      "Laut Münchner Bürgerbüro müssen neue Einwohner ihre Wohnung normalerweise innerhalb von 14 Tagen nach dem Einzug anmelden. Je nach Voraussetzungen ist die Anmeldung online oder persönlich möglich. Die elektronische Wohnsitzanmeldung betrifft die Hauptwohnung und nicht eine Nebenwohnung. Wer mehrere Wohnsitze hat, sollte den passenden Vorgang vorab prüfen.",
      "Ein künftiger Einzug kann nicht vorab angemeldet werden; Sie müssen tatsächlich eingezogen sein. Die Stadt verlangt Ausweisdokumente und die Wohnungsgeberbestätigung. Für Familien können besondere Vorgaben gelten. Prüfen Sie bei einem Umzug mit Kindern die entsprechenden städtischen Hinweise statt sich auf einen Einzelpersonentermin zu verlassen.",
      "Vereinbaren Sie keine Anmeldung für ein erst zukünftiges Einzugsdatum.",
      "Klären Sie, ob es sich um eine Haupt- oder Nebenwohnung handelt.",
      "Prüfen Sie aktuelle Dokumentenlisten und Familienvorgaben beim Bürgerbüro.",
      "München: amtliche Hinweise zur Wohnsitzanmeldung",
      "Kommunale Hinweise und Umfang des Onlinedienstes; geprüft am 19. Oktober 2026.",
    ],
  },
  hamburg: {
    es: [
      "Empadronamiento en Hamburgo: identifica primero de dónde vienes",
      "Hamburgo distingue varios trámites de registro según te mudes dentro de la ciudad, desde otro estado federado o desde el extranjero. Esta diferencia puede afectar las instrucciones y los documentos necesarios. Consulta primero el servicio oficial de Hamburg Service y evita aplicar una lista genérica de otra ciudad.",
      "Para el trámite presencial, Hamburgo ofrece reserva de citas en las distintas oficinas de Hamburg Service. Antes de elegir barrio, comprueba si tu trabajo y vivienda están separados por grandes vías de agua: una distancia corta en línea recta puede implicar transbordos o cruces largos. Calcula el trayecto real según tus turnos o el horario universitario.",
      "Elige el servicio oficial según vengas de Hamburgo, otro estado o el extranjero.",
      "Consulta las oficinas, citas, horarios y documentos actuales.",
      "Compara desplazamientos puerta a puerta en hora punta y por la noche, no solo kilómetros.",
      "Hamburg Service: registrar tu domicilio",
      "Servicios según procedencia y cita previa; revisado el 19 de octubre de 2026.",
    ],
    de: [
      "Wohnsitz in Hamburg anmelden: zuerst die Umzugsart klären",
      "Hamburg unterscheidet bei der Wohnsitzanmeldung zwischen Umzügen innerhalb Hamburgs, aus einem anderen Bundesland und aus dem Ausland. Davon können die erforderlichen Nachweise und die genaue Vorgehensweise abhängen. Beginnen Sie deshalb bei der offiziellen Seite von Hamburg Service und übernehmen Sie keine allgemeine Checkliste aus einer anderen Stadt.",
      "Für die persönliche Anmeldung bietet die Stadt eine Online-Terminvereinbarung bei den Hamburg-Service-Standorten an. Bei der Wohnungssuche sollten Sie große Wasserwege beachten: Eine kurze Luftlinie kann in der Praxis lange Umwege oder Umstiege bedeuten. Prüfen Sie die tatsächlichen Verbindungen passend zu Arbeitszeiten oder Stundenplan.",
      "Wählen Sie den passenden Service für innerstädtische, innerdeutsche oder internationale Umzüge.",
      "Prüfen Sie Standort, Termine, Öffnungszeiten und notwendige Unterlagen.",
      "Vergleichen Sie echte Wege zu Stoßzeiten und spätabends statt bloßer Kilometerangaben.",
      "Hamburg Service: Wohnsitz anmelden",
      "Verweise auf Umzugskategorien und Terminvergabe; geprüft am 19. Oktober 2026.",
    ],
  },
};
