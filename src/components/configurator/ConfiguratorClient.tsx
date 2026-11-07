"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { RangeAccent } from "@/data/ranges";
import { translateConfigurator } from "@/data/configurator-i18n";
import { SITE_URL } from "@/lib/seo";
import {
  engineSelector,
  readEngineState,
  type Catalog,
  type EngineState,
  type Swatch,
} from "@/lib/configurator/catalog";
import { engineUrl, hasLayouts, type ConfiguratorVariant } from "@/lib/configurator/variants";

type Props = {
  variant: ConfiguratorVariant;
  catalog: Catalog;
  modelName: string;
  accent: RangeAccent;
  /** Whitelisted query string (options + colour choices) to restore a shared configuration. */
  initialSearch: string;
};

const accentButton: Record<RangeAccent, string> = {
  golden: "bg-golden text-golden-contrast",
  silver: "bg-silver text-silver-contrast",
  drive: "bg-drive text-drive-contrast",
};

const accentBar: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive: "bg-drive",
};

const EMPTY: EngineState = { active: new Set(), disabled: new Set() };

const sameSet = (a: Set<string>, b: Set<string>) => a.size === b.size && [...a].every((x) => b.has(x));

function swatchBackground(s: Swatch): string {
  return s.color2 ? `linear-gradient(135deg, ${s.color} 50%, ${s.color2} 50%)` : s.color;
}

export default function ConfiguratorClient({ variant, catalog, modelName, accent, initialSearch }: Props) {
  const t = useTranslations("configurator");
  const locale = useLocale();
  const tr = (text: string) => translateConfigurator(text, locale);

  const frameRef = useRef<HTMLIFrameElement>(null);
  const teardown = useRef<(() => void) | null>(null);

  const [ready, setReady] = useState(false);
  const [state, setState] = useState<EngineState>(EMPTY);
  const [engineSearch, setEngineSearch] = useState(initialSearch);
  const [panel, setPanel] = useState<"colours" | "options">("colours");
  const [colourTab, setColourTab] = useState(catalog.tabs[0]?.key ?? "");
  const [featuresOn, setFeaturesOn] = useState(false);
  const [copied, setCopied] = useState(false);

  // The engine page (Grand's own UI + 3D scene, hidden by engine.css) is
  // same-origin, so we read its button state and click its buttons. It owns all
  // the rules (exclusions, dependent colours); we only mirror and drive it.
  const onEngineLoad = useCallback(() => {
    teardown.current?.();
    const frame = frameRef.current;
    const win = frame?.contentWindow;
    const doc = frame?.contentDocument;
    if (!frame || !win || !doc) return;

    let raf = 0;
    const sync = () => {
      raf = 0;
      const next = readEngineState(doc);
      setState((prev) => (sameSet(prev.active, next.active) && sameSet(prev.disabled, next.disabled) ? prev : next));

      // Mirror the chosen configuration into our own URL so it can be shared.
      const params = new URLSearchParams(win.location.search);
      params.delete("id");
      const query = params.toString();
      setEngineSearch((prev) => (prev === query ? prev : query));
      window.history.replaceState(null, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);
    };
    const schedule = () => {
      if (!raf) raf = win.requestAnimationFrame(sync);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(doc.body, { subtree: true, attributes: true, attributeFilter: ["class", "id"] });

    const onMessage = (event: MessageEvent) => {
      if ((event.data as { type?: string } | null)?.type === "VERGE3D_LOADED") setReady(true);
    };
    win.addEventListener("message", onMessage);
    // Never leave the visitor staring at a spinner if the signal is missed.
    const fallback = window.setTimeout(() => setReady(true), 45_000);
    schedule();

    teardown.current = () => {
      observer.disconnect();
      win.removeEventListener("message", onMessage);
      window.clearTimeout(fallback);
      if (raf) win.cancelAnimationFrame(raf);
    };
  }, []);

  // The server-rendered iframe can finish loading before React hydrates and
  // attaches onLoad, so also hook up an engine that is already loaded.
  useEffect(() => {
    const frame = frameRef.current;
    if (frame?.contentWindow?.location.pathname.startsWith("/3d/") && frame.contentDocument?.readyState === "complete") {
      onEngineLoad();
    }
    return () => teardown.current?.();
  }, [onEngineLoad]);

  const press = (selector: string) => {
    const el = frameRef.current?.contentDocument?.querySelector<HTMLElement>(selector);
    if (el && !el.classList.contains("is-disabled")) el.click();
  };

  const chooseColour = (s: Swatch) => {
    if (!state.active.has(s.id)) press(engineSelector(s.id));
  };
  const toggleOption = (id: string) => press(engineSelector(id));
  const defaultView = () => press("#defaul_view_desktop");
  const toggleFeatures = () => {
    press("#toggle_features");
    setFeaturesOn((v) => !v);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address bar already holds the link.
    }
  };

  const selectedExtras = catalog.options.filter((o) => state.active.has(o.id)).length;

  // Hand the configuration to the enquiry form as a "builder link" — the same
  // contract that form already decodes (options part numbers + colour choices).
  const builderLink = `${SITE_URL}/${locale}/configurator/${variant.key}${engineSearch ? `?${engineSearch}` : ""}`;
  const enquireParams = new URLSearchParams({ bm: variant.modelSlug, builderLink });
  if (hasLayouts(variant)) enquireParams.set("layout", variant.title);
  const enquireHref = `/ranges/${variant.range}/enquire/?${enquireParams.toString()}`;

  const activeTab = catalog.tabs.find((tab) => tab.key === colourTab) ?? catalog.tabs[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start">
      {/* 3D view */}
      <div className="lg:sticky lg:top-6">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-surface-line bg-surface-sunken lg:aspect-auto lg:h-[min(72vh,44rem)]">
          <iframe
            ref={frameRef}
            title={t("iframeTitle", { model: modelName })}
            src={engineUrl(variant, initialSearch)}
            onLoad={onEngineLoad}
            className="absolute inset-0 h-full w-full border-0"
            allow="fullscreen"
          />

          {!ready && (
            <div
              role="status"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface-sunken/90 px-6 text-center"
            >
              <span
                aria-hidden
                className="h-8 w-8 animate-spin rounded-full border-2 border-surface-line border-t-brand"
              />
              <p className="text-body font-medium text-text-strong">{t("loading")}</p>
              <p className="text-body-sm text-text-subtle">{t("loadingHint")}</p>
            </div>
          )}

          {ready && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={defaultView}
                className="rounded-md border border-surface-line bg-surface/90 px-3 py-1.5 text-caption font-medium text-text-strong backdrop-blur hover:bg-surface"
              >
                {t("defaultView")}
              </button>
              <button
                type="button"
                onClick={toggleFeatures}
                aria-pressed={featuresOn}
                className="rounded-md border border-surface-line bg-surface/90 px-3 py-1.5 text-caption font-medium text-text-strong backdrop-blur hover:bg-surface aria-pressed:border-brand aria-pressed:text-brand"
              >
                {featuresOn ? t("hideFeatures") : t("showFeatures")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm">
        <div className={`h-1.5 ${accentBar[accent]}`} aria-hidden />

        <div role="tablist" aria-label={t("eyebrow")} className="grid grid-cols-2 border-b border-surface-line">
          {(["colours", "options"] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              id={`cfg-tab-${p}`}
              aria-selected={panel === p}
              aria-controls={`cfg-panel-${p}`}
              onClick={() => setPanel(p)}
              className={`px-4 py-3 text-body-sm font-semibold transition-colors ${
                panel === p ? "text-text-strong shadow-[inset_0_-2px_0_var(--color-brand)]" : "text-text-subtle hover:text-text-strong"
              }`}
            >
              {t(`tabs.${p}`)}
            </button>
          ))}
        </div>

        <div className="max-h-[28rem] overflow-y-auto p-5 lg:max-h-[min(52vh,32rem)]">
          {panel === "colours" && activeTab && (
            <div role="tabpanel" id="cfg-panel-colours" aria-labelledby="cfg-tab-colours">
              <div role="group" aria-label={t("colourGroupsLabel")} className="flex flex-wrap gap-2">
                {catalog.tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    aria-pressed={tab.key === activeTab.key}
                    onClick={() => setColourTab(tab.key)}
                    className={`rounded-full border px-3 py-1 text-caption font-medium transition-colors ${
                      tab.key === activeTab.key
                        ? "border-brand bg-brand text-brand-contrast"
                        : "border-surface-line text-text-muted hover:border-brand hover:text-text-strong"
                    }`}
                  >
                    {tr(tab.title)}
                  </button>
                ))}
              </div>

              {activeTab.groups.map((group, gi) => (
                <fieldset key={`${activeTab.key}-${gi}`} className="mt-5">
                  {group.title && (
                    <legend className="text-caption font-semibold uppercase tracking-[0.12em] text-text-subtle">
                      {tr(group.title)}
                    </legend>
                  )}
                  <ul className="mt-3 grid grid-cols-4 gap-x-2 gap-y-3 sm:grid-cols-5 lg:grid-cols-4">
                    {group.swatches.map((s) => {
                      const selected = state.active.has(s.id);
                      const disabled = state.disabled.has(s.id);
                      const label = tr(s.name);
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => chooseColour(s)}
                            disabled={disabled}
                            aria-pressed={selected}
                            title={s.material ? `${label} (${s.material})` : label}
                            className="group flex w-full flex-col items-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <span
                              aria-hidden
                              style={{ background: swatchBackground(s) }}
                              className={`h-10 w-10 rounded-full border border-black/15 transition-shadow group-aria-pressed:ring-2 group-aria-pressed:ring-brand group-aria-pressed:ring-offset-2 group-aria-pressed:ring-offset-surface`}
                            />
                            <span
                              className={`text-center text-caption leading-tight ${
                                selected ? "font-semibold text-text-strong" : "text-text-muted"
                              }`}
                            >
                              {label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </fieldset>
              ))}
            </div>
          )}

          {panel === "options" && (
            <div role="tabpanel" id="cfg-panel-options" aria-labelledby="cfg-tab-options">
              <p className="text-caption font-semibold uppercase tracking-[0.12em] text-text-subtle">
                {t("optionsHeading")}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {catalog.options.map((o) => {
                  const on = state.active.has(o.id);
                  const off = state.disabled.has(o.id);
                  return (
                    <li key={o.id}>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        disabled={off}
                        onClick={() => toggleOption(o.id)}
                        className="flex w-full items-center justify-between gap-3 rounded-md border border-surface-line px-3 py-2.5 text-left text-body-sm text-text-strong transition-colors hover:border-brand disabled:cursor-not-allowed disabled:opacity-40 aria-checked:border-brand aria-checked:bg-surface-muted"
                      >
                        <span>{tr(o.title)}</span>
                        <span
                          aria-hidden
                          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-brand" : "bg-surface-line"}`}
                        >
                          <span
                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-surface shadow transition-all ${on ? "left-[1.1rem]" : "left-0.5"}`}
                          />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-surface-line p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-body-sm text-text-muted" aria-live="polite">
              {t("summary", { count: selectedExtras })}
            </p>
            <button
              type="button"
              onClick={copyLink}
              className="text-caption font-medium text-brand hover:underline"
            >
              {copied ? t("linkCopied") : t("copyLink")}
            </button>
          </div>
          <Link
            href={enquireHref}
            className={`mt-4 inline-flex w-full items-center justify-center rounded-md px-6 py-3 text-body-sm font-semibold transition-opacity hover:opacity-90 ${accentButton[accent]}`}
          >
            {t("enquire")}
          </Link>
        </div>
      </div>
    </div>
  );
}
