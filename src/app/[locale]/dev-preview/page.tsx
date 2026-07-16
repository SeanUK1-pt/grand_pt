import RangeBadge from "@/components/RangeBadge";
import SpecStrip from "@/components/SpecStrip";
import RangeHero from "@/components/RangeHero";
import SpecSheet from "@/components/SpecSheet";
import FeatureList from "@/components/FeatureList";
import EnquireForm from "@/components/EnquireForm";
import { ranges } from "@/data/ranges";
import { getModelBySlug } from "@/data/models";
import { resolveText } from "@/data/localized-text";
import type { RangeAccent } from "@/data/ranges";

const demoExtras = [
  { partNumber: "3508", name: "Teak deck inlay" },
  { partNumber: "1200", name: "Bow thruster" },
];

const enquireFormDemos: {
  range: RangeAccent;
  modelName: string;
  layoutName?: string;
}[] = [
  { range: "golden", modelName: "G680" },
  { range: "silver", modelName: "S520", layoutName: "Lux" },
  { range: "drive", modelName: "D400" },
];

const demoFeaturesWithImages: { title: string; description: string; image?: string }[] = [
  {
    title: "Centre console helm",
    description: "Protected instrumentation bay with ergonomic layout for extended passages.",
    image: "/images/lifestyle/g680-morning.jpg",
  },
  {
    title: "Convertible bow sundeck",
    description: "Forward seating converts to a full sundeck in under a minute.",
    image: "/images/lifestyle/g680-morning.jpg",
  },
  {
    title: "Fridge-freezer & sink",
    description: "Galley unit built into the console for full-day trips.",
    image: "/images/lifestyle/g680-morning.jpg",
  },
];

const accents: RangeAccent[] = ["golden", "silver", "drive"];

const demoSpecs = [
  { value: "6.80m", label: "LOA" },
  { value: "2.90m", label: "Beam" },
  { value: "200 hp", label: "Max power" },
];

const demoModel = getModelBySlug("g680")!;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DevPreview({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="bg-surface-muted">

      {/* ── RangeBadge ── */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          RangeBadge
        </h2>
        <div className="flex flex-wrap gap-6 items-start">
          {accents.map((accent) => (
            <div key={accent} className="flex flex-col gap-3">
              <RangeBadge accent={accent} variant="soft">
                {accent.charAt(0).toUpperCase() + accent.slice(1)} Line — soft
              </RangeBadge>
              <RangeBadge accent={accent} variant="solid">
                {accent.charAt(0).toUpperCase() + accent.slice(1)} Line — solid
              </RangeBadge>
            </div>
          ))}
        </div>
      </section>

      {/* ── SpecStrip — light surface ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          SpecStrip — light
        </h2>
        <div className="rounded-2xl bg-surface p-8 shadow-sm">
          <SpecStrip specs={demoSpecs} surface="light" />
        </div>
      </section>

      {/* ── SpecStrip — dark surface ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          SpecStrip — dark
        </h2>
        <div className="rounded-2xl bg-grand-blue p-8">
          <SpecStrip specs={demoSpecs} surface="dark" />
        </div>
      </section>

      {/* ── RangeHero — all three accents ── */}
      <section className="pb-4">
        <h2 className="mx-auto max-w-5xl px-6 pb-8 pt-4 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          RangeHero
        </h2>
        {ranges.map((range) => (
          <div key={range.slug} className="mb-2">
            <RangeHero
              accent={range.accent}
              name={range.name}
              tagline={resolveText(range.tagline, locale)}
              voiceLine={resolveText(range.voiceLine, locale)}
            />
          </div>
        ))}
      </section>

      {/* ── SpecSheet ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          SpecSheet
        </h2>
        <div className="rounded-2xl bg-surface p-8 shadow-sm">
          <SpecSheet specs={demoModel.fullSpecs} accent={demoModel.range} />
        </div>
      </section>

      {/* ── FeatureList — with images ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          FeatureList — with images
        </h2>
        <div className="rounded-2xl bg-surface p-8 shadow-sm">
          <FeatureList features={demoFeaturesWithImages} accent={demoModel.range} />
        </div>
      </section>

      {/* ── FeatureList — text-only (no images) ── */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          FeatureList — text-only
        </h2>
        <div className="rounded-2xl bg-surface p-8 shadow-sm">
          <FeatureList
            features={demoModel.features.map((f) => ({
              title: resolveText(f.title, locale),
              description: resolveText(f.description, locale),
              image: f.image,
            }))}
            accent={demoModel.range}
          />
        </div>
      </section>

      {/* ── EnquireForm — all three range skins side by side ── */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-ink-subtle">
          EnquireForm — golden / silver / drive
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {enquireFormDemos.map((demo) => (
            <EnquireForm
              key={demo.range}
              range={demo.range}
              modelName={demo.modelName}
              layoutName={demo.layoutName}
              decodedExtras={demoExtras}
              locale={locale}
              decodeSucceeded
              builderLinkRaw={`https://builder.grandboats.example/${demo.modelName.toLowerCase()}?options=3508-1200`}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
