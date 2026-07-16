export type LocalizedText = { en: string; pt?: string };

export function resolveText(text: LocalizedText, locale: string): string {
  return locale === "pt" && text.pt ? text.pt : text.en;
}
