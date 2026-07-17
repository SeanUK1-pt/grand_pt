"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import {
  submitContactAction,
  type ContactActionState,
} from "@/lib/actions/submitContact";

const initialState: ContactActionState = { status: "idle" };

function SubmitButton() {
  const t = useTranslations("contact");
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-body-sm font-semibold text-brand-contrast transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? t("submitting") : t("submit")}
    </button>
  );
}

export default function ContactForm() {
  const t = useTranslations("contact");
  const [state, formAction] = useActionState(submitContactAction, initialState);

  if (state.status === "success") {
    return (
      <div className="overflow-hidden rounded-lg border border-surface-line bg-surface shadow-sm">
        <div className="h-1.5 bg-brand" aria-hidden />
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
      <div className="h-1.5 bg-brand" aria-hidden />
      <div className="p-8">
        <form action={formAction} className="flex flex-col gap-4">
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
            <label htmlFor="message" className="text-body-sm font-medium text-text-strong">
              {t("fields.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-1.5 w-full rounded-sm border border-surface-line bg-surface px-3 py-2 text-body-sm text-text-strong outline-none focus:border-brand"
            />
          </div>

          {state.status === "error" && (
            <p role="alert" className="text-body-sm text-drive">
              {state.message ?? t("errors.required")}
            </p>
          )}

          <div className="mt-2">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
