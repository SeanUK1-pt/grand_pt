import { rangeConfig, type RangeKey } from "./range-config"

type EnquireFormProps = {
  range: RangeKey
  modelName: string
  /** Optional config read-back. If empty/undefined, the block is not rendered at all. */
  decodedExtras?: string[]
}

function introLine(range: RangeKey, modelName: string): string {
  switch (range) {
    case "golden":
      return `Let's talk about bringing your ${modelName} to life.`
    case "silver":
      return "Tell us about the build you had in mind."
    case "drive":
      return `Configured your ${modelName}. What's next?`
  }
}

const fieldClass =
  "w-full rounded-sm border border-surface-line bg-surface px-3 py-2.5 text-body text-text-strong placeholder:text-text-subtle focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

/**
 * Lead-capture form. Identical field set across ranges, skinned with the range
 * accent (header bar + submit). Shows decoded configuration extras only when
 * present. Never displays a price — this is enquiry capture, not a quote.
 */
export function EnquireForm({ range, modelName, decodedExtras }: EnquireFormProps) {
  const style = rangeConfig[range]
  const hasExtras = Array.isArray(decodedExtras) && decodedExtras.length > 0

  return (
    <div className="overflow-hidden rounded-lg border border-surface-line bg-surface">
      {/* Range-accent header bar */}
      <div className={`px-6 py-4 ${style.solidBg}`}>
        <p className={`text-caption font-semibold uppercase tracking-[0.14em] ${style.solidText}`}>
          {style.label} enquiry
        </p>
        <h3 className={`mt-1 text-title font-semibold tracking-tight ${style.solidText}`}>
          {modelName}
        </h3>
      </div>

      <div className="p-6">
        <p className="text-body text-text-muted text-pretty">
          {introLine(range, modelName)}
        </p>

        {hasExtras && (
          <div className="mt-5 rounded-md border border-surface-line bg-surface-muted p-4">
            <p className="text-caption font-semibold uppercase tracking-[0.12em] text-text-subtle">
              Based on your configuration:
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {decodedExtras!.map((extra) => (
                <li
                  key={extra}
                  className="flex items-center gap-2 text-body-sm text-text-strong"
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.solidBg}`} />
                  {extra}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${range}-name`} className="text-body-sm font-medium text-text-strong">
              Name
            </label>
            <input id={`${range}-name`} name="name" type="text" autoComplete="name" placeholder="Your full name" className={fieldClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${range}-email`} className="text-body-sm font-medium text-text-strong">
              Email
            </label>
            <input id={`${range}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" className={fieldClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${range}-phone`} className="text-body-sm font-medium text-text-strong">
              Phone
            </label>
            <input id={`${range}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+44 …" className={fieldClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${range}-notes`} className="text-body-sm font-medium text-text-strong">
              Notes
            </label>
            <textarea id={`${range}-notes`} name="notes" rows={4} placeholder="Anything you'd like us to know" className={`${fieldClass} resize-y`} />
          </div>

          <button
            type="submit"
            className={`mt-2 inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-body-sm font-semibold transition-colors ${style.solidBg} ${style.solidHoverBg} ${style.solidText} ${style.focusRing} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
          >
            Send enquiry
          </button>
        </form>
      </div>
    </div>
  )
}
