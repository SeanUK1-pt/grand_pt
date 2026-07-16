"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import type { RangeAccent } from "@/data/ranges";
import {
  submitEnquiryAction,
  type EnquiryActionState,
} from "@/lib/actions/submitEnquiry";

type EnquireFormProps = {
  range: RangeAccent;
  modelName: string;
  layoutName?: string;
  decodedExtras: { partNumber: string; name: string }[];
  // Accepted for interface completeness / future locale-aware formatting
  // (e.g. the confirmation timestamp). useTranslations() below already
  // resolves strings from the ambient NextIntlClientProvider set up in the
  // root layout, so this prop isn't required for translation lookup today.
  locale: string;
  // Not part of the originally spec'd prop list — added because the Server
  // Action's payload (per spec) must include decodeSucceeded and
  // builderLinkRaw, and there was no other way for those values to reach the
  // action. Both default to safe values when the caller doesn't have a real
  // builderLink to decode.
  decodeSucceeded?: boolean;
  builderLinkRaw?: string | null;
};

const accentBar: Record<RangeAccent, string> = {
  golden: "bg-golden",
  silver: "bg-silver",
  drive: "bg-drive",
};

// Same contrast-safe solid-button convention established in RangeBadge:
// golden's mid-tone needs text-ink, silver/drive are dark enough for text-surface.
const accentButton: Record<RangeAccent, string> = {
  golden: "bg-golden text-ink",
  silver: "bg-silver text-surface",
  drive: "bg-drive text-surface",
};

const initialState: EnquiryActionState = { status: "idle" };

function SubmitButton({ accent }: { accent: RangeAccent }) {
  const t = useTranslations("enquireForm");
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 ${accentButton[accent]}`}
    >
      {pending ? t("submitting") : t("submit")}
    </button>
  );
}

export default function EnquireForm({
  range,
  modelName,
  layoutName,
  decodedExtras,
  decodeSucceeded = false,
  builderLinkRaw = null,
}: EnquireFormProps) {
  const t = useTranslations("enquireForm");

  const boundAction = submitEnquiryAction.bind(null, {
    range,
    modelName,
    layoutName,
    decodedExtras,
    decodeSucceeded,
    builderLinkRaw,
  });
  const [state, formAction] = useActionState(boundAction, initialState);

  const heading = layoutName ? `${modelName} — ${layoutName}` : modelName;

  if (state.status === "success") {
    return (
      <div className="overflow-hidden rounded-2xl bg-surface-muted">
        <div className={`h-1.5 ${accentBar[range]}`} aria-hidden />
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-ink">
            {t("success.heading")}
          </h2>
          <p className="mt-2 text-base text-ink-subtle">{t("success.body")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-surface-muted">
      <div className={`h-1.5 ${accentBar[range]}`} aria-hidden />
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-ink">{heading}</h2>
        <p className="mt-2 text-base text-ink-subtle">
          {t(`intro.${range}`, { modelName })}
        </p>

        {decodedExtras.length > 0 && (
          <div className="mt-6 border-t border-ink/10 pt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-subtle">
              {t("extrasHeading")}
            </p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {decodedExtras.map((extra) => (
                <li
                  key={extra.partNumber}
                  className="flex items-baseline gap-2 text-sm text-ink"
                >
                  <span aria-hidden className={`h-1 w-1 rounded-full ${accentBar[range]}`} />
                  {extra.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form action={formAction} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-ink">
              {t("fields.name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1.5 w-full rounded-lg border border-ink/15 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-ink">
              {t("fields.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-lg border border-ink/15 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-ink">
              {t("fields.phone")}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1.5 w-full rounded-lg border border-ink/15 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
            />
          </div>

          <div>
            <label htmlFor="notes" className="text-sm font-medium text-ink">
              {t("fields.notes")}
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className="mt-1.5 w-full rounded-lg border border-ink/15 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-ink/40"
            />
          </div>

          {state.status === "error" && (
            <p role="alert" className="text-sm text-drive">
              {state.message ?? t("errors.required")}
            </p>
          )}

          <div className="mt-2">
            <SubmitButton accent={range} />
          </div>
        </form>
      </div>
    </div>
  );
}
