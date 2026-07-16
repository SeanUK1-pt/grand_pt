import { extras } from "@/data/extras";

export type DecodeResult = {
  extrasDecoded: { partNumber: string; name: string }[];
  decodeSucceeded: boolean;
  builderLinkRaw: string | null;
};

export function decodeBuilderLink(builderLink: string | null): DecodeResult {
  if (!builderLink) {
    return { extrasDecoded: [], decodeSucceeded: false, builderLinkRaw: builderLink };
  }

  try {
    const url = new URL(builderLink);
    const optionsParam = url.searchParams.get("options");

    if (!optionsParam) {
      return { extrasDecoded: [], decodeSucceeded: false, builderLinkRaw: builderLink };
    }

    // handles trailing/leading dashes and empty segments in options param
    const partNumbers = optionsParam.split("-").filter(Boolean);
    const extrasDecoded = partNumbers
      .map((partNumber) => extras.find((e) => e.partNumber === partNumber))
      .filter((e): e is (typeof extras)[number] => e !== undefined)
      .map(({ partNumber, name }) => ({ partNumber, name }));

    return { extrasDecoded, decodeSucceeded: true, builderLinkRaw: builderLink };
  } catch {
    return { extrasDecoded: [], decodeSucceeded: false, builderLinkRaw: builderLink };
  }
}
