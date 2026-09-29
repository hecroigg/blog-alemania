import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const targets = ["es", "de", "fr", "it", "pt", "pl", "uk"];
const sourceDirs = ["app", "components", "lib/content"];
const ignored = /^(?:[a-z0-9-]+|#[0-9a-f]{3,8}|https?:\/\/\S+|\/\S*|[A-Z_]+)$/;
const protectedGermanTerms = [
  "Abmeldung",
  "Anmeldung",
  "Ausbildung",
  "Ausländerbehörde",
  "Beitragsservice",
  "Bürgeramt",
  "Bürgergeld",
  "Deutschlandsemesterticket",
  "Deutschlandticket",
  "Finanzamt",
  "Hausarzt",
  "Kaltmiete",
  "Kindergeld",
  "Kündigungsfrist",
  "Krankenkasse",
  "Midijob",
  "Minijob",
  "Nebenkosten",
  "Probezeit",
  "Rundfunkbeitrag",
  "SCHUFA",
  "Sozialversicherungsnummer",
  "Steuernummer",
  "Steuer-ID",
  "Ummeldung",
  "Warmmiete",
  "Werkstudent",
  "Wohngeld",
  "Wohnungsgeberbestätigung",
];
const protectedTermPattern = new RegExp(protectedGermanTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "gi");
const translationOverrides = {
  es: {
    Live: "Disponible",
    "Personal Germany plan": "Plan personal para Alemania",
    "Check official 2026 ticket prices, registration deadlines, fees, tax thresholds and insurance rates.": "Consulta los precios oficiales de los billetes de 2026, los plazos de registro, las tasas, los umbrales fiscales y las cotizaciones del seguro.",
  },
  de: { Live: "Verfügbar" },
  fr: { Live: "Disponible" },
  it: { Live: "Disponibile" },
  pt: { Live: "Disponível" },
  pl: { Live: "Dostępne" },
  uk: { Live: "Доступно" },
};
const nonTranslatableJsxAttributes = new Set([
  "action", "autoComplete", "className", "dateTime", "download", "form", "href", "id", "inputMode", "key", "lang", "method", "name", "pattern", "rel", "role", "src", "target", "type", "value",
]);

async function filesUnder(dir) {
  const entries = await fs.readdir(path.join(root, dir), { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const relative = path.join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(relative) : /\.(?:ts|tsx)$/.test(entry.name) ? [relative] : [];
  }));
  return nested.flat();
}

function clean(value) {
  return value.replace(/\s+/g, " ").trim();
}

function collect(source, fileName, output) {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, fileName.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const isContent = fileName.startsWith("lib/content/") || fileName === "lib/platform-data.ts" || fileName === "lib/employment-data.ts";
  const publicCollections = new Set(["english", "metadata", "trustLinks", "scamSignals", "arrivalTasks", "universal", "routeItems", "purposeItems", "rows", "groups", "deductions", "employmentAnswers", "faq", "exampleInputs"]);
  const renderedCollections = new Set();
  const collectRenderedCollections = (node) => {
    if (ts.isJsxExpression(node) && node.expression) {
      const collectIdentifiers = (child) => {
        if (ts.isIdentifier(child)) renderedCollections.add(child.text);
        ts.forEachChild(child, collectIdentifiers);
      };
      collectIdentifiers(node.expression);
    }
    ts.forEachChild(node, collectRenderedCollections);
  };
  collectRenderedCollections(sourceFile);
  const hasPublicAncestor = (node) => {
    let current = node.parent;
    while (current) {
      if (ts.isJsxExpression(current)) return true;
      if (ts.isVariableDeclaration(current) && ts.isIdentifier(current.name)) {
        return publicCollections.has(current.name.text) || renderedCollections.has(current.name.text);
      }
      current = current.parent;
    }
    return false;
  };
  const visit = (node) => {
    let value = null;
    if (ts.isJsxText(node)) value = node.text;
    const isTranslatableAttribute = ts.isStringLiteralLike(node) && ts.isJsxAttribute(node.parent) && !nonTranslatableJsxAttributes.has(node.parent.name.getText(sourceFile));
    if (ts.isStringLiteralLike(node) && (isContent || hasPublicAncestor(node) || isTranslatableAttribute)) value = node.text;
    if (value) {
      const normalized = clean(value);
      if (normalized.length > 1 && /[A-Za-z]/.test(normalized) && !ignored.test(normalized)) output.add(normalized);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
}

function chunks(values, maxLength = 3200) {
  const result = [];
  let current = [];
  let length = 0;
  for (const value of values) {
    if (current.length && length + value.length > maxLength) {
      result.push(current);
      current = [];
      length = 0;
    }
    current.push(value);
    length += value.length + 24;
  }
  if (current.length) result.push(current);
  return result;
}

async function translateBatch(values, locale) {
  const preserved = [];
  const maskedValues = values.map((value, valueIndex) => value.replace(protectedTermPattern, (term) => {
    const token = `ZXQKEEP${valueIndex}X${preserved.length}QXZ`;
    preserved.push([token, term]);
    return token;
  }));
  const markers = values.slice(1).map((_, index) => `[[[LGSEP${index + 1}]]]`);
  const joined = maskedValues.map((value, index) => index ? `${markers[index - 1]}\n${value}` : value).join("\n");
  const params = new URLSearchParams({ client: "gtx", sl: "en", tl: locale, dt: "t", q: joined });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!response.ok) throw new Error(`Translation failed (${locale}): ${response.status}`);
  const data = await response.json();
  const translated = data[0].map((part) => part[0]).join("");
  const restoreTerms = (value) => preserved.reduce((result, [token, term]) => result.replaceAll(token, term), value);
  if (values.length === 1) return [restoreTerms(clean(translated))];
  const splitter = new RegExp(`\\s*${markers.map((marker) => marker.replace(/[\[\]]/g, "\\$&")).join("|\\s*")}\\s*`);
  const parts = translated.split(splitter).map(clean);
  if (parts.length !== values.length) throw new Error(`Translation split mismatch (${locale}): ${parts.length}/${values.length}`);
  return parts.map(restoreTerms);
}

const files = [...(await Promise.all(sourceDirs.map(filesUnder))).flat(), "lib/platform-data.ts", "lib/employment-data.ts"];
const strings = new Set();
for (const file of files) collect(await fs.readFile(path.join(root, file), "utf8"), file, strings);
const values = [...strings].sort((a, b) => a.localeCompare(b));
await fs.mkdir(path.join(root, "lib/translations"), { recursive: true });
for (const locale of targets) {
  const outputPath = path.join(root, `lib/translations/${locale}.json`);
  let existing = {};
  try { existing = JSON.parse(await fs.readFile(outputPath, "utf8")); } catch { existing = {}; }
  const translated = Object.fromEntries(Object.entries(existing).filter(([source]) => strings.has(source)));
  const missing = values.filter((value) => !translated[value] || protectedGermanTerms.some((term) => value.toLocaleLowerCase().includes(term.toLocaleLowerCase())));
  for (const batch of chunks(missing)) {
    const results = await translateBatch(batch, locale);
    batch.forEach((source, index) => { translated[source] = results[index]; });
  }
  Object.assign(translated, translationOverrides[locale]);
  await fs.writeFile(outputPath, `${JSON.stringify(translated, null, 2)}\n`);
  console.log(`${locale}: ${Object.keys(translated).length} strings`);
}
