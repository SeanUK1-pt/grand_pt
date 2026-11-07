import catalog from "./extras.catalog.json";

export type Extra = {
  partNumber: string;   // Grand's option part number, e.g. "2438" — what the 3D configurator echoes in options=
  name: string;         // e.g. "Swimming platforms w/ ladder & handrail"
};

// Real part numbers and names, generated from Grand's own 3D configurator data
// by scripts/sync-3d.mjs (npm run sync:3d). Do not edit by hand — re-run the
// sync when Grand adds or renames options.
export const extras: Extra[] = Object.entries(catalog as Record<string, string>).map(([partNumber, name]) => ({
  partNumber,
  name,
}));
