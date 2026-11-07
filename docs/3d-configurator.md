# 3D configurator

grandboats.pt runs Grand's own 3D configurator under its own domain, language and
design. Grand's engine does the 3D and all the rules; we supply the interface.

## How it fits together

```
/[locale]/configurator/[variant]      our page (Next.js)
  └─ ConfiguratorClient               our interface: colours, equipment, enquiry (EN/PT)
       └─ <iframe /3d/<scene>/index.html>     Grand's page, kept as a hidden "engine"
            └─ <iframe grand-boats-configurator.html>   the Verge3D scene (WebGL)
```

- **Engine page** — Grand's Webflow interface + `main.js`, copied to `public/3d/`
  and hidden by `scripts/3d/engine.css`. It stays alive in the DOM because the 3D
  scene reads and clicks its buttons by id.
- **Our interface** — reads the engine's button state (`is-active` / `is-disabled`
  classes; ids toggle `d_<id>` ↔ `e_<id>`) with a MutationObserver and drives it by
  clicking those buttons. We never re-implement Grand's rules (exclusions,
  dependent colours); the engine applies them and we mirror the result.
- **State in the URL** — the engine writes `options=<part numbers>` and
  `tab-N-color-M=<readable choice>` to its URL; we mirror those onto our own URL, so
  a configuration is a shareable link. Only those params are accepted back in
  (`src/lib/configurator/search.ts`).
- **Enquiry** — "Enquire" passes the link as `builderLink` to the existing enquiry
  form. `decodeBuilderLink` turns `options=` into real extras names (via
  `src/data/extras.catalog.json`) and the colour params into readable choices; both
  go into the sales email and the ABG lead tracker.
- **Portuguese** — Grand's feed is English only. `src/data/configurator-i18n.ts` is a
  closed-vocabulary lookup; a test fails if the feed contains a string it doesn't
  cover.

## Keeping the copy in sync

`public/3d/` is large and git-ignored. Generate it with:

```bash
npm run sync:3d            # download anything missing, rebuild src/data/configurator.manifest.json + extras.catalog.json
node scripts/sync-3d.mjs --force   # re-download everything
npm run check:3d           # compare with Grand's live files; exit 1 if anything changed
```

The sync patches Grand's files (`main.js` API addresses, external CDNs and Google
Fonts removed, analytics removed). Each patch is strict: if Grand changes a file so
a patch no longer applies, the script fails instead of shipping a half-working copy.
`check:3d` compares hashes of the scene logic, scene model and engine UI code, so
run it occasionally (or when Grand mentions an update).

After a sync: run `npm test` (the Portuguese coverage test reads the synced data),
and re-test one model in the browser. If Grand adds options/colours, add their
Portuguese to `configurator-i18n.ts`.

## Deploying

`public/3d/` is not in git, so on the server run `npm run sync:3d` once (needs
outbound internet), then the usual `git pull && rm -rf .next && npm run build &&
pm2 restart grand-pt`. The pages show a fallback link to Grand's own configurator
if the synced data is missing.

## Things to know

- The Verge3D viewer library is Grand's commercial licence; hosting it here relies on
  Grand's permission.
- Grand's `main.js` (as published) points at a `backend-stage` API address; we point
  it at our local snapshot instead, so the engine's own "send info" form is unused.
- The 3D canvas can't be read back as an image (the engine clears it between
  frames), so there's no screenshot-in-enquiry feature yet.
- `/3d/` is `noindex` and disallowed in `robots.txt`.
