#!/usr/bin/env node
// Syncs Grand's 3D configurator onto this site so grandboats.pt can run it
// under its own domain, language and design.
//
//   node scripts/sync-3d.mjs            download anything missing, rebuild generated data
//   node scripts/sync-3d.mjs --force    re-download everything
//   node scripts/sync-3d.mjs --check    compare upstream with the local copy; change nothing, exit 1 on drift
//   node scripts/sync-3d.mjs --only g680,s300   limit to certain scene folders
//
// What it produces (see README section in docs/3d-configurator.md):
//   public/3d/<scene>/          scene files + patched engine page (git-ignored, ~150 MB)
//   public/3d/_shared/          shared engine UI code, fonts, vendor libs (git-ignored)
//   src/data/configurator.manifest.json   models/variants + upstream hashes (committed)
//   src/data/extras.catalog.json          option code -> name (committed)
//
// Grand's engine page is Webflow UI + a Verge3D scene that reads the page's
// buttons. We keep that page as a hidden "engine" and drive its buttons from our
// own interface, so the patches below are deliberately strict: if Grand changes
// the files so a patch no longer applies, this script fails loudly instead of
// shipping a half-working copy.

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, stat, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "3d");
const SHARED = path.join(OUT, "_shared");
const DATA = path.join(ROOT, "src", "data");

const INDEX_PAGE = "https://grandboats.com/en/info/3D-8";
const APP_ORIGIN = "https://3d.grandboats.com";
const FRONT_ORIGIN = "https://grandboats3d.github.io/frontend-files";
const API_ORIGIN = "https://js.grandboats.com/api";
const SHARED_URL = "/3d/_shared";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const CHECK = args.includes("--check");
const onlyArg = args.find((a) => a.startsWith("--only="))?.slice(7) ?? (args.includes("--only") ? args[args.indexOf("--only") + 1] : null);
const ONLY = onlyArg ? new Set(onlyArg.split(",")) : null;

const sha = (buf) => createHash("sha256").update(buf).digest("hex");
const exists = (p) => stat(p).then(() => true, () => false);

async function get(url, { text = false } = {}) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(120_000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return text ? res.text() : Buffer.from(await res.arrayBuffer());
}

async function save(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, data);
}

// Download unless we already have it (or --force). Returns the bytes.
async function fetchTo(url, file) {
  if (!FORCE && !CHECK && (await exists(file))) return readFile(file);
  const buf = await get(url);
  if (!CHECK) await save(file, buf);
  return buf;
}

async function pool(items, limit, fn) {
  const results = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (i < items.length) {
        const idx = i++;
        results[idx] = await fn(items[idx], idx);
      }
    })
  );
  return results;
}

// Replace exactly one occurrence or fail: a silent no-op patch would ship a broken engine.
function patch(source, from, to, label) {
  const hit = typeof from === "string" ? source.includes(from) : from.test(source);
  if (!hit) throw new Error(`Upstream changed: patch "${label}" no longer applies`);
  return source.replace(from, to);
}

function patchMainJs(src) {
  let s = src;
  s = patch(s, 'const apiOrigin = "https://backend-stage.grandboats.com/api";', 'const apiOrigin = location.pathname.replace(/\\/[^/]*$/, "") + "/api";', "main.js apiOrigin");
  s = patch(s, 'const frontOrigin = "https://grandboats3d.github.io/frontend-files";', `const frontOrigin = "${SHARED_URL}/frontend-files";`, "main.js frontOrigin");
  s = patch(s, "fetch(`${apiOrigin}/cms/boats/${boatId}`, {", "fetch(`${apiOrigin}/cms/boats/${boatId}.json`, {", "main.js boat fetch");
  return s;
}

function patchIndexHtml(src) {
  let s = src;
  s = s.replace(/<link href="https:\/\/fonts\.googleapis\.com"[^>]*\/>\s*/g, "");
  s = s.replace(/<link\s+href="https:\/\/fonts\.gstatic\.com"[\s\S]*?\/>\s*/g, "");
  s = patch(s, /<script\s+src="https:\/\/ajax\.googleapis\.com[\s\S]*?<\/script>\s*/, "", "webfont loader");
  s = patch(s, /<script type="text\/javascript">\s*WebFont\.load[\s\S]*?<\/script>\s*/, "", "WebFont.load call");
  s = patch(s, /<script\s+src="https:\/\/d3e54v103j8qbb\.cloudfront\.net[\s\S]*?<\/script>/, `<script src="${SHARED_URL}/vendor/jquery.min.js"></script>`, "jquery");
  s = patch(s, '<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>', `<script src="${SHARED_URL}/vendor/gsap.min.js"></script>`, "gsap");
  s = patch(s, '<script src="js/webflow.js" type="text/javascript"></script>', `<script src="${SHARED_URL}/vendor/webflow.js" type="text/javascript"></script>`, "webflow.js");
  s = s.replace(/<script src="(?:https:\/\/grandboats3d\.github\.io\/)?frontend-files\/config\.js"><\/script>\s*/, "");
  s = s.replace(/<script[^>]*grand-analytics[^>]*><\/script>\s*/g, "");
  s = s.replace(/<link\s+href="https:\/\/cdn\.prod\.website-files\.com[^>]*\/>\s*/g, "");
  s = s.replaceAll(`${FRONT_ORIGIN}/`, `${SHARED_URL}/frontend-files/`);
  s = s.replaceAll('href="frontend-files/', `href="${SHARED_URL}/frontend-files/`);
  s = s.replaceAll('src="frontend-files/', `src="${SHARED_URL}/frontend-files/`);
  s = s.replaceAll('src="images/', `src="${SHARED_URL}/images/`);
  s = patch(s, "</head>", `<meta name="robots" content="noindex, nofollow" />\n<link rel="stylesheet" href="${SHARED_URL}/engine.css" />\n</head>`, "head injection");
  const leftovers = [...s.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)].map((m) => m[1]).filter((u) => !/^https?:\/\/(localhost|grandboats\.pt)/.test(u));
  return { html: s, leftovers };
}

async function discoverVariants() {
  const html = await get(INDEX_PAGE, { text: true });
  const seen = new Map();
  for (const m of html.matchAll(/https:\/\/3d\.grandboats\.com\/([a-z0-9-]+)\/\?id=([a-f0-9]{24})/g)) seen.set(m[2], { dir: m[1], id: m[2] });
  const variants = [...seen.values()].filter((v) => !ONLY || ONLY.has(v.dir));
  if (variants.length === 0) throw new Error("No 3D models found on the index page — upstream layout changed?");
  return variants;
}

const SCENE_FILES = [
  "grand-boats-configurator.html",
  "grand-boats-configurator.js",
  "grand-boats-configurator.css",
  "grand-boats-configurator.gltf",
  "grand-boats-configurator.bin",
  "v3d.js",
  "visual_logic.js",
  "basis_transcoder.js",
  "basis_transcoder.wasm",
];

async function syncShared(firstDir, firstId) {
  const hashes = {};
  const ff = `${FRONT_ORIGIN}`;
  const main = (await get(`${ff}/main.js`, { text: true }));
  hashes["main.js"] = sha(main);
  const css = {};
  for (const f of ["normalize.css", "webflow.css", "verge3d-boat-ui.webflow.css", "main.css"]) {
    css[f] = await get(`${ff}/css/${f}`, { text: true });
    hashes[`css/${f}`] = sha(css[f]);
  }
  if (CHECK) return hashes;

  await save(path.join(SHARED, "frontend-files/main.js"), patchMainJs(main));
  for (const [f, body] of Object.entries(css)) await save(path.join(SHARED, "frontend-files/css", f), body);
  for (const f of ["boat-options-codes.json", "countries.json"]) await fetchTo(`${ff}/${f}`, path.join(SHARED, "frontend-files", f));

  const fontFiles = new Set();
  const imageFiles = new Set();
  for (const body of Object.values(css)) {
    for (const m of body.matchAll(/fonts\/[A-Za-z0-9_.-]+\.woff2/g)) fontFiles.add(m[0]);
    for (const m of body.matchAll(/images\/[A-Za-z0-9_.%-]+\.(?:svg|png|jpg|webp)/g)) imageFiles.add(m[0]);
  }
  await pool([...fontFiles], 6, (f) => fetchTo(`${ff}/${f}`, path.join(SHARED, "frontend-files", f)));
  await pool([...imageFiles], 6, (f) => fetchTo(`${ff}/${f}`, path.join(SHARED, "frontend-files", f)));

  // Page-level images + engine page, taken from the first scene folder.
  const pageHtml = await get(`${APP_ORIGIN}/${firstDir}/?id=${firstId}`, { text: true });
  hashes["engine-page"] = sha(pageHtml);
  const pageImages = [...new Set([...pageHtml.matchAll(/src="(images\/[^"]+)"/g)].map((m) => m[1]))];
  await pool(pageImages, 6, (f) => fetchTo(`${APP_ORIGIN}/${firstDir}/${f}`, path.join(SHARED, f)));
  await fetchTo(`${APP_ORIGIN}/${firstDir}/js/webflow.js`, path.join(SHARED, "vendor/webflow.js"));
  const jq = pageHtml.match(/src="(https:\/\/d3e54v103j8qbb\.cloudfront\.net[^"]+)"/)?.[1];
  if (!jq) throw new Error("Upstream changed: jQuery script tag not found");
  await fetchTo(jq, path.join(SHARED, "vendor/jquery.min.js"));
  const gsapUrl = pageHtml.match(/src="(https:\/\/cdn\.jsdelivr\.net\/npm\/gsap@[^"]+)"/)?.[1];
  if (!gsapUrl) throw new Error("Upstream changed: gsap script tag not found");
  await fetchTo(gsapUrl, path.join(SHARED, "vendor/gsap.min.js"));
  await copyFile(path.join(ROOT, "scripts/3d/engine.css"), path.join(SHARED, "engine.css"));
  return hashes;
}

async function syncScene(dir, ids) {
  const base = `${APP_ORIGIN}/${dir}`;
  const local = path.join(OUT, dir);
  const hashes = {};

  const page = await get(`${base}/?id=${ids[0]}`, { text: true });
  const { html, leftovers } = patchIndexHtml(page);
  hashes["index.html"] = sha(page);
  if (!CHECK) await save(path.join(local, "index.html"), html);

  const sceneBuffers = {};
  for (const f of SCENE_FILES) {
    const buf = CHECK ? await get(`${base}/${f}`) : await fetchTo(`${base}/${f}`, path.join(local, f));
    sceneBuffers[f] = buf;
    if (f === "visual_logic.js" || f === "grand-boats-configurator.gltf") hashes[f] = sha(buf);
  }
  if (!CHECK) {
    const gltf = JSON.parse(sceneBuffers["grand-boats-configurator.gltf"].toString("utf8"));
    const uris = [...(gltf.images ?? []), ...(gltf.buffers ?? [])].map((x) => x.uri).filter((u) => u && !u.startsWith("data:"));
    await pool(uris, 6, (u) => fetchTo(`${base}/${u}`, path.join(local, u)));
  }
  return { hashes, leftovers };
}

function rangeFromLink(link = "") {
  const m = link.match(/(golden|silver|drive)-line/);
  return m ? `${m[1]}-line` : null;
}

async function main() {
  const variants = await discoverVariants();
  const dirs = [...new Set(variants.map((v) => v.dir))];
  console.log(`${variants.length} variants in ${dirs.length} scene folders${CHECK ? " (check only)" : ""}`);

  const sharedHashes = await syncShared(dirs[0], variants.find((v) => v.dir === dirs[0]).id);

  const sceneHashes = {};
  const leftovers = new Set();
  for (const dir of dirs) {
    process.stdout.write(`  ${dir} … `);
    const r = await syncScene(dir, variants.filter((v) => v.dir === dir).map((v) => v.id));
    sceneHashes[dir] = r.hashes;
    r.leftovers.forEach((l) => leftovers.add(l));
    console.log("ok");
  }

  // Boat data snapshots + manifest + extras catalog.
  const manifestVariants = [];
  const extras = {};
  const conflicts = [];
  for (const v of variants) {
    const raw = await get(`${API_ORIGIN}/cms/boats/${v.id}`, { text: true });
    const data = JSON.parse(raw);
    if (!CHECK) await save(path.join(OUT, v.dir, "api/cms/boats", `${v.id}.json`), raw);
    manifestVariants.push({
      key: data.slug,
      dir: v.dir,
      id: v.id,
      title: data.title,
      range: rangeFromLink(data["model-details-link"]),
      optionCount: (data.options ?? []).length,
    });
    for (const o of data.options ?? []) {
      for (const code of [o["option-code"], o["option-code-second"]]) {
        if (!code || code === "None") continue;
        const name = o.name || o.title;
        if (extras[code] && extras[code] !== name) conflicts.push(`${code}: "${extras[code]}" vs "${name}" (${data.slug})`);
        else extras[code] ??= name;
      }
    }
  }
  manifestVariants.sort((a, b) => a.key.localeCompare(b.key));

  const manifest = { generatedBy: "scripts/sync-3d.mjs", shared: sharedHashes, scenes: sceneHashes, variants: manifestVariants };
  const sortedExtras = Object.fromEntries(Object.entries(extras).sort(([a], [b]) => a.localeCompare(b)));

  if (CHECK) {
    const prev = JSON.parse(await readFile(path.join(DATA, "configurator.manifest.json"), "utf8"));
    const drift = [];
    for (const [k, h] of Object.entries(sharedHashes)) if (prev.shared?.[k] !== h) drift.push(`shared/${k}`);
    for (const [d, hs] of Object.entries(sceneHashes)) for (const [k, h] of Object.entries(hs)) if (prev.scenes?.[d]?.[k] !== h) drift.push(`${d}/${k}`);
    const prevKeys = new Set(prev.variants.map((x) => x.id));
    for (const v of manifestVariants) if (!prevKeys.has(v.id)) drift.push(`new variant ${v.key}`);
    if (drift.length) {
      console.log("\nUpstream has changed since the last sync:\n  " + drift.join("\n  "));
      process.exit(1);
    }
    console.log("\nIn sync with upstream.");
    return;
  }

  await save(path.join(DATA, "configurator.manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  await save(path.join(DATA, "extras.catalog.json"), JSON.stringify(sortedExtras, null, 2) + "\n");
  console.log(`\nManifest: ${manifestVariants.length} variants. Extras catalog: ${Object.keys(sortedExtras).length} option codes.`);
  if (conflicts.length) console.log("Code/name conflicts (first name kept):\n  " + conflicts.join("\n  "));
  const external = [...leftovers].filter((u) => !/^https?:\/\/(www\.)?grandboats\.com/.test(u));
  if (external.length) console.log("External URLs still referenced by the engine page:\n  " + external.join("\n  "));
}

main().catch((err) => {
  console.error("\nSync failed:", err.message);
  process.exit(1);
});
