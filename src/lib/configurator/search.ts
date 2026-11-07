// The configurator page accepts a shared configuration as query params and
// hands them to Grand's engine. Only the params the engine itself writes are
// passed through — never anything else a visitor (or a crafted link) supplies.

type RawSearch = Record<string, string | string[] | undefined>;

const COLOUR_KEY = /^tab-\d{1,2}-color-\d{1,2}$/;
const OPTIONS_VALUE = /^[0-9-]{0,300}$/;
const MAX_COLOUR_VALUE = 120;

export function sanitizeConfigSearch(raw: RawSearch): string {
  const out = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    const v = Array.isArray(value) ? value[0] : value;
    if (typeof v !== "string") continue;
    if (key === "options" && OPTIONS_VALUE.test(v)) out.set(key, v);
    else if (COLOUR_KEY.test(key) && v.length > 0 && v.length <= MAX_COLOUR_VALUE) out.set(key, v);
  }
  return out.toString();
}
