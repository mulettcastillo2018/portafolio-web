// Revisa que el sitio esté completo en los dos idiomas:
// - messages/es.json y en.json tienen las mismas claves (y listas del mismo largo);
// - cada content/settings/<nombre>-es.json tiene su -en.json con la misma estructura;
// - cada caso de estudio existe en content/projects/es y en content/projects/en.
// Uso: npm run check:content (también corre en GitHub Actions).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const problems = [];

// Ruta de cada valor, con el largo de las listas: { "nav.home": "string", "steps": "array(5)", ... }
function shape(value, prefix = "", out = {}) {
  if (Array.isArray(value)) {
    out[prefix] = `array(${value.length})`;
    value.forEach((item, i) => shape(item, `${prefix}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) shape(child, prefix ? `${prefix}.${key}` : key, out);
  } else {
    out[prefix] = typeof value;
  }
  return out;
}

function compareJson(esFile, enFile) {
  const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));
  const es = shape(read(esFile));
  const en = shape(read(enFile));
  for (const key of new Set([...Object.keys(es), ...Object.keys(en)])) {
    if (es[key] !== en[key]) {
      problems.push(`${esFile} ↔ ${enFile}: "${key}" es ${es[key] ?? "inexistente"} en español y ${en[key] ?? "inexistente"} en inglés`);
    }
  }
}

compareJson("messages/es.json", "messages/en.json");

const settingsDir = path.join(root, "content", "settings");
for (const file of fs.readdirSync(settingsDir).filter((f) => f.endsWith("-es.json"))) {
  const enFile = file.replace(/-es\.json$/, "-en.json");
  if (!fs.existsSync(path.join(settingsDir, enFile))) {
    problems.push(`content/settings/${file} no tiene versión en inglés (${enFile})`);
    continue;
  }
  compareJson(`content/settings/${file}`, `content/settings/${enFile}`);
}

const list = (dir) =>
  fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
const projectsEs = list(path.join(root, "content", "projects", "es"));
const projectsEn = list(path.join(root, "content", "projects", "en"));
for (const f of projectsEs) if (!projectsEn.includes(f)) problems.push(`content/projects/es/${f} no tiene versión en inglés`);
for (const f of projectsEn) if (!projectsEs.includes(f)) problems.push(`content/projects/en/${f} no tiene versión en español`);

if (problems.length) {
  console.error(`El contenido no está igual en los dos idiomas (${problems.length}):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("Contenido completo en español e inglés.");
