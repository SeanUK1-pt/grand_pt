import { createHash } from "crypto";

/**
 * Short content hash for the kiosk app's manifest/version-poll cache
 * pattern (see src/app/api/kiosk-content) — lets it cheaply detect when a
 * model's content actually changed instead of re-fetching on every poll.
 */
export function contentVersion(payload: unknown): string {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex").slice(0, 16);
}
