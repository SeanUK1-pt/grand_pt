import { extras } from "@/data/extras";

export type DecodeResult = {
  extrasDecoded: { partNumber: string; name: string }[];
  /** Colour choices exactly as Grand's configurator words them, e.g. "Tube | Tube Color: Ice White". */
  coloursDecoded: string[];
  decodeSucceeded: boolean;
  builderLinkRaw: string | null;
};

const COLOUR_PARAM = /^tab-(\d+)-color-(\d+)$/;

function failed(builderLink: string | null): DecodeResult {
  return { extrasDecoded: [], coloursDecoded: [], decodeSucceeded: false, builderLinkRaw: builderLink };
}

export function decodeBuilderLink(builderLink: string | null): DecodeResult {
  if (!builderLink) return failed(builderLink);

  try {
    const url = new URL(builderLink);
    const optionsParam = url.searchParams.get("options");

    const coloursDecoded = [...url.searchParams.entries()]
      .flatMap(([key, value]) => {
        const m = key.match(COLOUR_PARAM);
        return m && value ? [{ tab: Number(m[1]), slot: Number(m[2]), value }] : [];
      })
      .sort((a, b) => a.tab - b.tab || a.slot - b.slot)
      .map((c) => c.value);

    // A configuration with no extras has no (or an empty) options param, so
    // only treat the link as undecodable when it carries neither.
    if (optionsParam === null && coloursDecoded.length === 0) return failed(builderLink);

    // handles trailing/leading dashes and empty segments in options param
    const partNumbers = (optionsParam ?? "").split("-").filter(Boolean);
    const extrasDecoded = partNumbers
      .map((partNumber) => extras.find((e) => e.partNumber === partNumber))
      .filter((e): e is (typeof extras)[number] => e !== undefined)
      .map(({ partNumber, name }) => ({ partNumber, name }));

    return { extrasDecoded, coloursDecoded, decodeSucceeded: true, builderLinkRaw: builderLink };
  } catch {
    return failed(builderLink);
  }
}
