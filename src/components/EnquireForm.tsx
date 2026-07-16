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

// Same -contrast token convention established in RangeBadge.
const accentButton: Record<RangeAccent, string> = {
  golden: "bg-golden text-golden-contrast",
  silver: "bg-silver text-silver-contrast",
  drive: "bg-drive text-drive-contrast",
};

const initialState: EnquiryActionState = { status: "idle" };

function SubmitButton({ accent }: { accent: RangeAccent }) {
  const t = useTranslations("enquireForm");
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-body-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 ${accentButton[accent]}`}
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
      <div className="overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm">
        <div className={`h-1.5 ${accentBar[range]}`} aria-hidden />
        <div className="p-8">
          <h2 className="text-title font-semibold tracking-tight text-text-strong">
            {t("success.heading")}
          </h2>
          <p className="mt-2 text-body text-text-muted">{t("success.body")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm">
      <div className={`h-1.5 ${accentBar[range]}`} aria-hidden />
      <div className="p-8">
        <h2 className="text-title font-semibold tracking-tight text-text-strong">{heading}</h2>
        <p className="mt-2 text-body text-text-muted">
          {t(`intro.${range}`, { modelName })}
        </p>

        {decodedExtras.length > 0 && (
          <div className="mt-6 border-t border-surface-line pt-6">
            <p className="text-caption font-semibold uppercase tracking-[0.12em] text-text-subtle">
              {t("extrasHeading")}
            </p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {decodedExtras.map((extra) => (
                <li
                  key={extra.partNumber}
                  className="flex items-baseline gap-2 text-body-sm text-text-strong"
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
            <label htmlFor="name" className="text-body-sm font-medium text-text-strong">
              {t("fields.name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1.5 w-full rounded-sm border border-surface-line bg-surface px-3 py-2 text-body-sm text-text-strong outline-none focus:border-brand"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-body-sm font-medium text-text-strong">
              {t("fields.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-sm border border-surface-line bg-surface px-3 py-2 text-body-sm text-text-strong outline-none focus:border-brand"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-body-sm font-medium text-text-strong">
              {t("fields.phone")}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1.5 w-full rounded-sm border border-surface-line bg-surface px-3 py-2 text-body-sm text-text-strong outline-none focus:border-brand"
            />
          </div>

          <div>
            <label htmlFor="notes" className="text-body-sm font-medium text-text-strong">
              {t("fields.notes")}
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className="mt-1.5 w-full rounded-sm border border-surface-line bg-surface px-3 py-2 text-body-sm text-text-strong outline-none focus:border-brand"
            />
          </div>

          {state.status === "error" && (
            <p role="alert" className="text-body-sm text-drive">
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
