import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const targets = ["es", "de", "fr", "it", "pt", "pl", "uk"];
const sourceDirs = ["app", "components", "lib/content"];
const ignored = /^(?:[a-z0-9-]+|#[0-9a-f]{3,8}|https?:\/\/\S+|\/\S*|[A-Z_]+)$/;

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
  const isContent = fileName.startsWith("lib/content/") || fileName === "lib/platform-data.ts";
  const publicCollections = new Set(["trustLinks", "scamSignals", "arrivalTasks", "universal", "routeItems", "purposeItems", "rows", "groups"]);
  const hasPublicAncestor = (node) => {
    let current = node.parent;
    while (current) {
      if (ts.isJsxExpression(current)) return true;
      if (ts.isVariableDeclaration(current) && ts.isIdentifier(current.name)) return publicCollections.has(current.name.text);
      current = current.parent;
    }
    return false;
  };
  const visit = (node) => {
    let value = null;
    if (ts.isJsxText(node)) value = node.text;
    if (ts.isStringLiteralLike(node) && (isContent || hasPublicAncestor(node))) value = node.text;
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
  const markers = values.slice(1).map((_, index) => `[[[LGSEP${index + 1}]]]`);
  const joined = values.map((value, index) => index ? `${markers[index - 1]}\n${value}` : value).join("\n");
  const params = new URLSearchParams({ client: "gtx", sl: "en", tl: locale, dt: "t", q: joined });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!response.ok) throw new Error(`Translation failed (${locale}): ${response.status}`);
  const data = await response.json();
  const translated = data[0].map((part) => part[0]).join("");
  if (values.length === 1) return [clean(translated)];
  const splitter = new RegExp(`\\s*${markers.map((marker) => marker.replace(/[\[\]]/g, "\\$&")).join("|\\s*")}\\s*`);
  const parts = translated.split(splitter).map(clean);
  if (parts.length !== values.length) throw new Error(`Translation split mismatch (${locale}): ${parts.length}/${values.length}`);
  return parts;
}

const files = [...(await Promise.all(sourceDirs.map(filesUnder))).flat(), "lib/platform-data.ts"];
const strings = new Set();
for (const file of files) collect(await fs.readFile(path.join(root, file), "utf8"), file, strings);
const values = [...strings].sort((a, b) => a.localeCompare(b));
await fs.mkdir(path.join(root, "lib/translations"), { recursive: true });
for (const locale of targets) {
  const outputPath = path.join(root, `lib/translations/${locale}.json`);
  let translated = {};
  try { translated = JSON.parse(await fs.readFile(outputPath, "utf8")); } catch { translated = {}; }
  const missing = values.filter((value) => !translated[value]);
  for (const batch of chunks(missing)) {
    const results = await translateBatch(batch, locale);
    batch.forEach((source, index) => { translated[source] = results[index]; });
  }
  await fs.writeFile(outputPath, `${JSON.stringify(translated, null, 2)}\n`);
  console.log(`${locale}: ${Object.keys(translated).length} strings`);
}
