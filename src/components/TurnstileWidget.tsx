"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: { sitekey: string; appearance?: string; theme?: string }
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// Cloudflare Turnstile. "interaction-only" keeps it invisible unless
// Cloudflare wants the visitor to do something, so normal visitors see no
// change. Renders nothing (and loads no script) when no site key is
// configured, so local dev and un-keyed deploys keep working.
//
// Inside a <form>, Turnstile adds a hidden `cf-turnstile-response` input that
// the server action verifies. Tokens are single-use and React resets the form
// after every action, so the widget is reset on form reset to get a fresh
// token for a retry.
export default function TurnstileWidget() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // Idempotent: called from both onReady (script just loaded) and the mount
  // effect (script already loaded, e.g. after client-side navigation).
  const renderWidget = () => {
    const container = containerRef.current;
    if (!siteKey || !container || widgetId.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(container, {
      sitekey: siteKey,
      appearance: "interaction-only",
      theme: "auto",
    });
  };

  useEffect(() => {
    renderWidget();

    const form = containerRef.current?.closest("form");
    const onFormReset = () => {
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    };
    form?.addEventListener("reset", onFormReset);

    return () => {
      form?.removeEventListener("reset", onFormReset);
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} />
    </>
  );
}
