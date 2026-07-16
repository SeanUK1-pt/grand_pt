export type Extra = {
  partNumber: string;   // e.g. "3508" — must match what Grand's builder echoes in options=
  name: string;         // e.g. "Teak deck inlay"
};

// PLACEHOLDER — replace with real part numbers from the kiosk pricing system.
// These must match the part number vocabulary already agreed with Grand Boats
// (see kiosk/fully.js integration — same shared part-number schema). This is
// the one dataset in this project that cannot be meaningfully invented: the
// values here are arbitrary and will not decode any real builderLink options=
// param until replaced with the actual Grand Boats part-number list.
export const extras: Extra[] = [
  { partNumber: "0000", name: "PLACEHOLDER EXTRA" },
];
