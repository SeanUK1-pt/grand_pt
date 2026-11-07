"use client";

import { useSyncExternalStore } from "react";
import { HONEYPOT_FIELD, RENDERED_AT_FIELD } from "@/lib/spamGuard";
import TurnstileWidget from "@/components/TurnstileWidget";

// Invisible spam traps for a form (see lib/spamGuard.ts), plus the Cloudflare
// Turnstile widget. Drop inside any
// <form> whose server action calls screenSubmission().

// Client load time for the fill-time check, via useSyncExternalStore so the
// server render and hydration agree ("") with no setState-in-effect. Captured
// once per page load, so it can only ever be older than the true render time,
// which makes the "too fast" check more lenient, never stricter.
let clientLoadTime: string | null = null;
const subscribeNoop = () => () => {};
const getClientLoadTime = () => (clientLoadTime ??= String(Date.now()));
const getServerLoadTime = () => "";

export default function SpamTraps() {
  // Rendered as the input's value (not a bare DOM write) because React resets
  // the form to its defaults after each action and would otherwise blank it.
  const renderedAt = useSyncExternalStore(subscribeNoop, getClientLoadTime, getServerLoadTime);

  return (
    <>
      {/* Honeypot: invisible to people, tempting to bots. Off-screen rather
          than display:none, which some bots skip. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input type="hidden" name={RENDERED_AT_FIELD} value={renderedAt} readOnly />
      <TurnstileWidget />
    </>
  );
}
