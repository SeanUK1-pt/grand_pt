"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const label: Record<(typeof routing.locales)[number], string> = {
  en: "EN",
  pt: "PT",
};

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-body-sm font-medium" aria-label="Language">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && (
            <span className={dark ? "text-ink-text-muted/40" : "text-text-subtle/40"} aria-hidden>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale
                ? dark
                  ? "text-ink-text"
                  : "text-text-strong"
                : dark
                  ? "text-ink-text-muted transition-colors hover:text-ink-text"
                  : "text-text-subtle transition-colors hover:text-text-strong"
            }
          >
            {label[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
