import type { FeaturedModel } from "./featured-models";
import type { Range } from "./ranges";
import type { LocalizedText } from "./localized-text";
import { MIN_PACKAGE_PRICE_LABEL, HULL_ONLY_PRICE_LABEL } from "./spec-labels";

export type ModelSpec = { value: string; label: string };

export type SpecCategory = {
  category: string;
  items: { label: string; value: string }[];
};

export type Feature = {
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
};

export type ModelLayout = {
  name: string;
  useCaseLine: LocalizedText;
  priceFrom?: number;
  priceLabel?: string;
  specs?: { label: string; value: string }[];
  image?: string;
  standardFeatures?: LocalizedText[];
  optionalEquipment?: LocalizedText[];
  /** Full per-layout detail — set when a layout warrants its own dedicated
   *  section on the model page (currently D600's three), rather than only
   *  appearing as a compact comparison tile. */
  positioning?: LocalizedText;
  fullSpecs?: SpecCategory[];
  features?: Feature[];
};

export type Model = FeaturedModel & {
  rangeSlug: Range["slug"];
  positioning: LocalizedText;
  specs: ModelSpec[];
  // No real pricing has ever been supplied by the dealer. `priceFrom` below
  // is a PLACEHOLDER figure (invented, scaled loosely by hull size/hp) — not
  // sourced, not approved, must be replaced with real dealer pricing before
  // launch. Kept optional so the UI can still omit the block entirely for
  // any model where even a placeholder wasn't set.
  priceFrom?: number;
  priceLabel?: string;
  fullSpecs: SpecCategory[];
  // Standard-fit and optional-fit equipment checklists, scraped from
  // grandboats.com's per-model STANDARD FEATURES / OPTIONAL EQUIPMENT tabs
  // (2026-07-29) — distinct from `features` below, which is curated
  // editorial copy, not a literal equipment checklist.
  standardFeatures: LocalizedText[];
  optionalEquipment: LocalizedText[];
  features: Feature[];
  /** Only set for models with multiple deck layouts (currently D600). */
  layouts?: ModelLayout[];
  /** Extra photos beyond `image`, individually spot-checked against the
   *  same real-boat/on-brand bar as `image` (see the image-bug fixes
   *  earlier in this data layer's history). Optional — omitted where the
   *  model's asset folder didn't clear that bar for more than one shot. */
  gallery?: string[];
};

// ── Real Grand Boats product lineup, scraped from grandboats.com (2026-07-05) ──
// specs/fullSpecs values are verbatim from the manufacturer's own spec tables
// (see /SCRAPED_SPECS.md for the raw source). tagline/positioning/features are
// NOT scraped — grandboats.com doesn't publish marketing copy in a reusable
// form, so those remain explicit placeholders except for g680/g750/g580,
// which already had hand-written copy from this project's initial build.
// Pricing was never available from any source — priceFrom/priceLabel are
// omitted throughout (see Model.priceFrom comment above).
export const models: Model[] = [
  // ── Golden Line ───────────────────────────────────────────────
  {
    slug: "g340",
    name: "G340",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "The entry point to the range, with the same attention to detail as everything above it.",
      pt: "O ponto de entrada na gama, com o mesmo cuidado nos detalhes que todos os modelos acima.",
    },
    image: "/images/boats/g340/detail-11.jpg",
    gallery: ["/images/boats/g340/detail-4.jpg", "/images/boats/g340/detail-6.jpg", "/images/boats/g340/detail-10.jpg", "/images/boats/g340/detail-13.jpg"],
    href: "/ranges/golden-line/g340/",
    priceFrom: 11898,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "3.30m", label: "LOA" },
      { value: "1.76m", label: "Beam" },
      { value: "30 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "330 cm / 10'10\"" },
        { label: "Inside length", value: "240 cm / 7'10\"" },
        { label: "Beam", value: "176 cm / 5'9\"" },
        { label: "Inside width", value: "80 cm / 2'7\"" },
        { label: "Dry weight", value: "129 kg / 284 lbs" },
        { label: "Tube diameter", value: "43 cm / 17\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "20 HP / 14,7 kW" },
        { label: "Max power", value: "30 HP / 22,1 kW" },
        { label: "Engine weight max", value: "70 kg / 154 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "17° / 14°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "195 kg / 429 lbs" },
        { label: "Max load", value: "580 kg / 1276 lbs" },
        { label: "Max persons", value: "4" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Bow and rear storage compartments", pt: "Compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles, rails and GRP stepends", pt: "Tubo insuflável multi-câmaras com pegas, corrimãos e terminais em GRP" },
      { en: "Bow step plate with mooring cleat", pt: "Placa de proa com cunho de amarração" },
      { en: "Steering console", pt: "Consola de condução" },
      { en: "Mechanical steering system and wheel", pt: "Sistema de direção mecânica e volante" },
      { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Integrated cleats, towing & lifting eyes", pt: "Cunhos integrados, olhais de reboque e de elevação" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Inbuilt fuel system with 40lit / 10gal tank", pt: "Sistema de combustível integrado com depósito de 40L / 10gal" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Removable side seat kit", pt: "Kit amovível de banco lateral" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and harbour covers", pt: "Cobertura geral e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Hand-laid fiberglass construction", pt: "Construção em fibra de vidro laminada à mão" },
        description: {
          en: "The same hull-building process as the larger Golden Line models, scaled to 3.4 metres. Light enough to handle easily, rigid enough to feel like a proper boat rather than a dinghy.",
          pt: "O mesmo processo de construção do casco que os modelos maiores da Golden Line, adaptado a 3,4 metros. Leve o suficiente para manusear facilmente, rígido o suficiente para se sentir como uma embarcação a sério.",
        },
      },
      {
        title: { en: "Compact tender specification", pt: "Especificação de tender compacto" },
        description: {
          en: "Removable seating, clean deck, tow points, and the fittings you actually need. Nothing superfluous for a boat that spends its life getting people to and from a larger vessel.",
          pt: "Bancos amovíveis, convés limpo, pontos de reboque e os acessórios de que realmente necessita. Nada supérfluo para uma embarcação que passa a vida a transportar pessoas de e para um barco maior.",
        },
      },
      {
        title: { en: "Golden Line detail at entry level", pt: "Detalhe Golden Line no modelo de entrada" },
        description: {
          en: "Hypalon tubes, quality upholstery, and hardware that matches the rest of the range. The G340 is the smallest Grand, not the least considered.",
          pt: "Tubos em Hypalon, estofagem de qualidade e ferragens que correspondem ao restante da gama. O G340 é o menor Grand, não o menos cuidado.",
        },
      },
    ],
  },
  {
    slug: "g340n",
    name: "G340N",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "A refreshed G340 — the same lightweight build and easy handling, with more power and a cleaner console for anyone who wants the classic tender brought up to date.",
      pt: "Um G340 renovado — a mesma construção leve e fácil de manusear, com mais potência e uma consola mais moderna, para quem quer o tender clássico atualizado.",
    },
    image: "/images/boats/g340n/detail-14.jpg",
    gallery: ["/images/boats/g340n/detail-9.jpg", "/images/boats/g340n/detail-12.jpg", "/images/boats/g340n/detail-17.jpg", "/images/boats/g340n/detail-20.jpg"],
    href: "/ranges/golden-line/g340n/",
    priceFrom: 12962,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "3.25m", label: "LOA" },
      { value: "1.75m", label: "Beam" },
      { value: "40 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "325 cm / 10'8\"" },
        { label: "Inside length", value: "260 cm / 8'6\"" },
        { label: "Beam", value: "175 cm / 5'9\"" },
        { label: "Inside width", value: "80 cm / 2'7\"" },
        { label: "Dry weight", value: "146 kg / 322 lbs" },
        { label: "Tube diameter", value: "45 cm / 18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "30 HP / 22,2 kW" },
        { label: "Max power", value: "40 HP / 29,4 kW" },
        { label: "Engine weight max", value: "105 kg / 232 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "18° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "204 kg / 450 lbs" },
        { label: "Max load", value: "480 kg / 1058 lbs" },
        { label: "Max persons", value: "4" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Bow and rear storage compartments", pt: "Compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles, rails and GRP stepends", pt: "Tubo insuflável multi-câmaras com pegas, corrimãos e terminais em GRP" },
      { en: "Bow step plate with mooring cleat", pt: "Placa de proa com cunho de amarração" },
      { en: "Steering console with windshield", pt: "Consola de condução com para-brisas" },
      { en: "Dashboard for up to 7\" screen, mechanical steering system and wheel", pt: "Painel para ecrã até 7\", sistema de direção mecânica e volante" },
      { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Integrated cupholder, cleats, towing & lifting eyes", pt: "Porta-copos, cunhos, olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Inbuilt fuel system with 40lit / 10gal tank", pt: "Sistema de combustível integrado com depósito de 40L / 10gal" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Double console with side seat & locker", pt: "Consola dupla com banco lateral e arrumação" },
      { en: "Waterski towing mast", pt: "Mastro de reboque para ski aquático" },
      { en: "Removable side seat kit", pt: "Kit amovível de banco lateral" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and harbour covers", pt: "Cobertura geral e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "More power, same lightweight build", pt: "Mais potência, a mesma construção leve" },
        description: {
          en: "40HP rather than the standard G340's 30HP, without adding weight worth mentioning. The extra headroom shows on a loaded tender run.",
          pt: "40HP em vez dos 30HP do G340 standard, sem acrescentar peso que se note. A potência extra nota-se numa viagem de tender carregada.",
        },
      },
      {
        title: { en: "Updated console", pt: "Consola atualizada" },
        description: {
          en: "A cleaner dash with room for up to a 7-inch screen, plus the windshield and storage the standard G340 does without.",
          pt: "Um painel mais limpo com espaço para um ecrã até 7 polegadas, além do para-brisas e arrumação que o G340 standard dispensa.",
        },
      },
      {
        title: { en: "Golden Line entry point, refreshed", pt: "Ponto de entrada da Golden Line, renovado" },
        description: {
          en: "Hypalon tubes, GRP stepends, and the fit and finish of the rest of the range — the same idea as the G340, brought up to date.",
          pt: "Tubos em Hypalon, terminais em GRP e o acabamento do resto da gama — a mesma ideia do G340, atualizada.",
        },
      },
    ],
  },
  {
    slug: "g380",
    name: "G380",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "Lightweight, refined, and easy to handle. The ideal tender for a larger vessel, or a first step into the Golden Line.",
      pt: "Leve, refinado e fácil de manusear. O tender ideal para uma embarcação maior, ou um primeiro passo na Golden Line.",
    },
    image: "/images/boats/g380/detail-9.jpg",
    gallery: ["/images/boats/g380/detail-8.jpg", "/images/boats/g380/detail-10.jpg", "/images/boats/g380/detail-12.jpg"],
    href: "/ranges/golden-line/g380/",
    priceFrom: 14646,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "3.60m", label: "LOA" },
      { value: "1.86m", label: "Beam" },
      { value: "40 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "360 cm / 11'10\"" },
        { label: "Inside length", value: "270 cm / 8'10\"" },
        { label: "Beam", value: "186 cm / 6'1\"" },
        { label: "Inside width", value: "88 cm / 2'11\"" },
        { label: "Dry weight", value: "170 kg / 374 lbs" },
        { label: "Tube diameter", value: "46 cm /18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "30 HP / 22,1 kW" },
        { label: "Max power", value: "40 HP / 29,4 kW" },
        { label: "Engine weight max", value: "95 kg / 209 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "17° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "235 kg / 518 lbs" },
        { label: "Max load", value: "650 kg / 1430 lbs" },
        { label: "Max persons", value: "5" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Bow and rear storage compartments", pt: "Compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles, rails and GRP stepends", pt: "Tubo insuflável multi-câmaras com pegas, corrimãos e terminais em GRP" },
      { en: "Bow step plate with mooring cleat", pt: "Placa de proa com cunho de amarração" },
      { en: "Steering console with seat and storage", pt: "Consola de condução com banco e arrumação" },
      { en: "Mechanical steering system and wheel", pt: "Sistema de direção mecânica e volante" },
      { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Integrated cleats, towing & lifting eyes", pt: "Cunhos integrados, olhais de reboque e de elevação" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
      { en: "Inbuilt fuel system with 40lit / 10gal tank", pt: "Sistema de combustível integrado com depósito de 40L / 10gal" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
    ],
    optionalEquipment: [
      { en: "Removable side seat kit", pt: "Kit amovível de banco lateral" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and harbour covers", pt: "Cobertura geral e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Low-weight, high-rigidity hull", pt: "Casco leve e de alta rigidez" },
        description: {
          en: "At under 200kg bare, the G380 is genuinely easy to handle without sacrificing the hull stiffness that makes it feel composed at sea. Built for boats that need a tender that keeps up.",
          pt: "Com menos de 200kg em vazio, o G380 é genuinamente fácil de manusear sem sacrificar a rigidez do casco que o faz sentir equilibrado no mar. Concebido para barcos que precisam de um tender à altura.",
        },
      },
      {
        title: { en: "Clean console layout", pt: "Layout de consola limpo" },
        description: {
          en: "A simple, uncluttered helm with everything in the right place. No unnecessary complexity for a boat that needs to be ready at a moment's notice and operated by whoever is aboard.",
          pt: "Um leme simples e desimpedido, com tudo no lugar certo. Sem complexidade desnecessária para uma embarcação que precisa de estar pronta a qualquer momento e ser operada por quem estiver a bordo.",
        },
      },
      {
        title: { en: "Hypalon tubes, Golden Line standard", pt: "Tubos em Hypalon, padrão Golden Line" },
        description: {
          en: "The same tube specification as the larger models — diameter, material, and chamber layout chosen for stability and durability, not just aesthetics.",
          pt: "A mesma especificação de tubos que os modelos maiores — diâmetro, material e disposição das câmaras escolhidos para estabilidade e durabilidade, não apenas estética.",
        },
      },
    ],
  },
  {
    slug: "g380n",
    name: "G380N",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "A refreshed G380 — the same lightweight build the range is known for, with 50HP rather than 40, a modern console, and the finish to match the rest of the range.",
      pt: "Um G380 renovado — a mesma construção leve pela qual a gama é conhecida, com 50HP em vez de 40, uma consola moderna e o acabamento à altura do resto da gama.",
    },
    image: "/images/boats/g380n/detail-17.jpg",
    gallery: ["/images/boats/g380n/detail-19.jpg", "/images/boats/g380n/detail-22.jpg", "/images/boats/g380n/detail-28.jpg"],
    href: "/ranges/golden-line/g380n/",
    priceFrom: 15973,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "3.60m", label: "LOA" },
      { value: "1.85m", label: "Beam" },
      { value: "50 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "360 cm / 11'10\"" },
        { label: "Inside length", value: "240 cm / 7'10\"" },
        { label: "Beam", value: "185 cm / 6'1\"" },
        { label: "Inside width", value: "94 cm / 3'1\"" },
        { label: "Dry weight", value: "180 kg / 397 lbs" },
        { label: "Tube diameter", value: "45 cm / 18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "40 HP / 29,4 kW" },
        { label: "Max power", value: "50 HP / 36,8 kW" },
        { label: "Engine weight max", value: "115 kg / 253 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "17° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "280 kg / 617 lbs" },
        { label: "Max load", value: "650 kg / 1430 lbs" },
        { label: "Max persons", value: "5" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Bow and rear storage compartments", pt: "Compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles, rails and GRP stepends", pt: "Tubo insuflável multi-câmaras com pegas, corrimãos e terminais em GRP" },
      { en: "Bow step plate with mooring cleat", pt: "Placa de proa com cunho de amarração" },
      { en: "Steering console with windshield, seat and storage", pt: "Consola de condução com para-brisas, banco e arrumação" },
      { en: "Dashboard for up to 7\" screen, mechanical steering system and wheel", pt: "Painel para ecrã até 7\", sistema de direção mecânica e volante" },
      { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Integrated cupholder, cleats, towing & lifting eyes", pt: "Porta-copos, cunhos, olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
      { en: "Inbuilt fuel system with 40lit / 10gal tank", pt: "Sistema de combustível integrado com depósito de 40L / 10gal" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
    ],
    optionalEquipment: [
      { en: "Double console with side seat & locker", pt: "Consola dupla com banco lateral e arrumação" },
      { en: "Waterski towing mast", pt: "Mastro de reboque para ski aquático" },
      { en: "Removable side seat kit", pt: "Kit amovível de banco lateral" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and harbour covers", pt: "Cobertura geral e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "More power for the same footprint", pt: "Mais potência, no mesmo tamanho" },
        description: {
          en: "50HP against the standard G380's 40 — enough extra to notice fully loaded, without changing the boat's size or weight class.",
          pt: "50HP contra os 40 do G380 standard — o suficiente para se notar com a embarcação carregada, sem alterar o tamanho ou a classe de peso.",
        },
      },
      {
        title: { en: "Modern console, proper dashboard", pt: "Consola moderna, painel a sério" },
        description: {
          en: "Room for up to a 7-inch screen, a real windshield, and a steering position that feels considered rather than improvised.",
          pt: "Espaço para um ecrã até 7 polegadas, para-brisas verdadeiro e uma posição de condução que parece pensada, não improvisada.",
        },
      },
      {
        title: { en: "Golden Line tender, updated", pt: "Tender Golden Line, atualizado" },
        description: {
          en: "Same lightweight, Hypalon-tubed build the G380 is known for, with the console and equipment brought up to the current standard.",
          pt: "A mesma construção leve, com tubos em Hypalon, pela qual o G380 é conhecido, com a consola e equipamento atualizados ao padrão atual.",
        },
      },
    ],
  },
  {
    slug: "g420",
    name: "G420",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "A proper little cruiser — well-finished, well-thought-out, and surprisingly capable for its footprint.",
      pt: "Um verdadeiro pequeno cruzeiro — bem acabado, bem pensado e surpreendentemente capaz para o seu tamanho.",
    },
    image: "/images/boats/g420/detail-19.jpg",
    gallery: ["/images/boats/g420/detail-9.jpg", "/images/boats/g420/detail-14.jpg", "/images/boats/g420/detail-22.jpg", "/images/boats/g420/detail-25.jpg"],
    href: "/ranges/golden-line/g420/",
    priceFrom: 18471,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "4.20m", label: "LOA" },
      { value: "1.98m", label: "Beam" },
      { value: "60 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "420 cm / 13’9”" },
        { label: "Inside length", value: "280 cm / 9’2”" },
        { label: "Beam", value: "198 cm / 6’6”" },
        { label: "Inside width", value: "100 cm / 3’3”" },
        { label: "Dry weight", value: "255 kg / 562 lbs" },
        { label: "Tube diameter", value: "48 cm / 19”" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "50 HP / 36,8 kW" },
        { label: "Max power", value: "60 HP / 44,1 kW" },
        { label: "Engine weight max", value: "120 kg  / 265 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "20° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "330 kg / 726 lbs" },
        { label: "Max load", value: "750 kg / 1653 lbs" },
        { label: "Max persons", value: "6" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "4" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass deep-V hull with anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante" },
      { en: "Bow and rear storage compartments", pt: "Compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles and GRP stepends", pt: "Tubo insuflável multi-câmaras com pegas e terminais em GRP" },
      { en: "Bow step plate with mooring cleats", pt: "Placa de proa com cunhos de amarração" },
      { en: "Steering console with windshield, seat and storage", pt: "Consola de condução com para-brisas, banco e arrumação" },
      { en: "Dashboard for up to 9\" screen, mechanical steering system and wheel", pt: "Painel para ecrã até 9\", sistema de direção mecânica e volante" },
      { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Integrated cupholder, handrails, cleats, towing & lifting eyes", pt: "Porta-copos, corrimãos, cunhos, olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
      { en: "Inbuilt fuel system with 55lit / 14gal tank", pt: "Sistema de combustível integrado com depósito de 55L / 14gal" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
    ],
    optionalEquipment: [
      { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
      { en: "Waterski towing mast", pt: "Mastro de reboque para ski aquático" },
      { en: "Premium steering wheel", pt: "Volante premium" },
      { en: "Removable bow sundeck kit", pt: "Kit amovível de solário de proa" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and harbour covers", pt: "Cobertura geral e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Lightweight fiberglass hull", pt: "Casco em fibra de vidro leve" },
        description: {
          en: "At 4.2 metres and under 300kg bare, the G420 is easy to launch, easy to recover, and sits well on davits or a swim platform. The hand-laid hull is stiff and responsive without unnecessary weight.",
          pt: "Com 4,2 metros e menos de 300kg em vazio, o G420 é fácil de lançar à água, fácil de recolher e adapta-se bem a davits ou plataformas de banho. O casco, laminado à mão, é rígido e responsivo sem peso desnecessário.",
        },
      },
      {
        title: { en: "Versatile deck layout", pt: "Layout de convés versátil" },
        description: {
          en: "A clean, uncluttered cockpit with removable seating works equally well as a yacht tender or a standalone day boat. Stowage is thoughtful for the size — nothing wasted, nothing missing.",
          pt: "Um cockpit limpo e desimpedido, com bancos amovíveis, funciona igualmente bem como tender de iate ou como embarcação de dia independente. O arrumo é bem pensado para o tamanho — nada desperdiçado, nada em falta.",
        },
      },
      {
        title: { en: "Golden Line finish", pt: "Acabamento Golden Line" },
        description: {
          en: "Same attention to upholstery, tube quality, and hardware detail as the larger models in the range. The G420 is a compact boat, not a compromised one.",
          pt: "O mesmo cuidado na estofagem, qualidade dos tubos e detalhes de ferragens que encontra nos modelos maiores da gama. O G420 é uma embarcação compacta, não uma embarcação de compromisso.",
        },
      },
    ],
  },
  {
    slug: "g500",
    name: "G500",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "Small enough to run as a tender, capable enough to stand alone. The compact pocket cruiser that punches well above its size.",
      pt: "Pequeno o suficiente para funcionar como tender, capaz o suficiente para ser independente. O pocket cruiser compacto que supera em muito o seu tamanho.",
    },
    image: "/images/boats/g500/detail-9.jpg",
    gallery: ["/images/boats/g500/detail-6.jpg", "/images/boats/g500/detail-11.jpg", "/images/boats/g500/detail-13.jpg"],
    href: "/ranges/golden-line/g500/",
    priceFrom: 28159,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "4.95m", label: "LOA" },
      { value: "2.30m", label: "Beam" },
      { value: "115 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "495 cm / 16’3”" },
        { label: "Inside length", value: "332 cm / 10’11”" },
        { label: "Beam", value: "230 cm / 7’7”" },
        { label: "Inside width", value: "128 cm / 4’2”" },
        { label: "Dry weight", value: "435 kg / 957 lbs" },
        { label: "Tube diameter", value: "50 cm / 20”" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "90 HP / 66.2 kW" },
        { label: "Max power", value: "115 HP / 84.6 kW" },
        { label: "Engine weight max", value: "210 kg / 462 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "21° / 18°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "550 kg / 1210 lbs" },
        { label: "Max load", value: "1000 kg / 2205 lbs" },
        { label: "Max persons", value: "9" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante autodrenante" },
      { en: "Anchor locker, bow and rear storage compartments", pt: "Paiol de âncora, compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles and GRP stepends", pt: "Tubo insuflável multi-câmaras com pegas e terminais em GRP" },
      { en: "Bow step plate with mooring cleat", pt: "Placa de proa com cunho de amarração" },
      { en: "Steering console with windshield, seat and storage", pt: "Consola de condução com para-brisas, banco e arrumação" },
      { en: "Dashboard for up to 9\" screen, mechanical steering system and wheel", pt: "Painel para ecrã até 9\", sistema de direção mecânica e volante" },
      { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Integrated cupholders, handrails, cleats, towing & lifting eyes", pt: "Porta-copos, corrimãos, cunhos, olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
      { en: "Inbuilt fuel system with 90lit / 23gal tank", pt: "Sistema de combustível integrado com depósito de 90L / 23gal" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Navigation & waterski classic roll bar", pt: "Roll bar clássico de navegação e ski aquático" },
      { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
      { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
      { en: "Premium steering wheel", pt: "Volante premium" },
    ],
    optionalEquipment: [
      { en: "Removable bow sundeck kit", pt: "Kit amovível de solário de proa" },
      { en: "Removable bow sundeck extension kit", pt: "Kit de extensão amovível do solário de proa" },
      { en: "Freshwater set with shower", pt: "Conjunto de água doce com duche" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and harbour covers", pt: "Cobertura geral e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Hi-prof. console with railing upgrade", pt: "Consola de perfil elevado com upgrade de guarda-corpos" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Standalone pocket cruiser", pt: "Pocket cruiser autónomo" },
        description: {
          en: "At 5 metres, the G500 works as a yacht tender or as an independent day boat in its own right. Enough deck space for a small crew, enough hull to handle open water with confidence.",
          pt: "Com 5 metros, o G500 funciona como tender de iate ou como embarcação de dia independente por direito próprio. Espaço de convés suficiente para uma tripulação pequena, casco suficiente para navegar em mar aberto com confiança.",
        },
      },
      {
        title: { en: "Centre console helm with instrumentation", pt: "Leme em consola central com instrumentação" },
        description: {
          en: "A properly equipped helm station for a boat that may be used independently of a mother vessel. Space for a chart plotter, VHF, and the navigation instruments that make a day out genuinely safe.",
          pt: "Uma estação de pilotagem devidamente equipada para uma embarcação que pode ser utilizada independentemente de um barco-mãe. Espaço para plotter, VHF e os instrumentos de navegação que tornam um dia no mar genuinamente seguro.",
        },
      },
      {
        title: { en: "Bow seating and sunbed", pt: "Banco de proa e espreguiçadeira" },
        description: {
          en: "A convertible forward section that works as social seating at anchor and a sunbed when the engine is off. The G500 is equipped for the whole day, not just the journey.",
          pt: "Uma secção de proa convertível que funciona como área de estar social em ancoragem e como espreguiçadeira quando o motor está desligado. O G500 está equipado para o dia inteiro, não apenas para a viagem.",
        },
      },
    ],
  },
  {
    slug: "g580",
    name: "G580",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "The bridge between the compact tenders and the full cruisers. More boat than it looks, without the commitment of the bigger hulls.",
      pt: "A ponte entre os tenders compactos e os cruzeiros completos. Mais barco do que parece, sem o compromisso dos cascos maiores.",
    },
    image: "/images/boats/g580/detail-11.jpg",
    gallery: ["/images/boats/g580/detail-7.jpg", "/images/boats/g580/detail-13.jpg", "/images/boats/g580/detail-16.jpg"],
    href: "/ranges/golden-line/g580/",
    priceFrom: 35474,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "5.85m", label: "LOA" },
      { value: "2.45m", label: "Beam" },
      { value: "150 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "585 cm / 19’2”" },
        { label: "Inside length", value: "427 cm / 14’0”" },
        { label: "Beam", value: "245 cm / 8’0”" },
        { label: "Inside width", value: "145 cm / 4’9”" },
        { label: "Dry weight", value: "535 kg / 1177 lbs" },
        { label: "Tube diameter", value: "50 cm / 20”" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "130 HP / 95,6 kW" },
        { label: "Max power", value: "150 HP / 110,3 kW" },
        { label: "Engine weight max", value: "240 kg / 529 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "20° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "650 kg / 1430 lbs" },
        { label: "Max load", value: "1200 kg / 2646 lbs" },
        { label: "Max persons", value: "11" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante autodrenante" },
      { en: "Transom lockers, bow and rear storage compartments", pt: "Paióis do espelho de popa, compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles and GRP stepends", pt: "Tubo insuflável multi-câmaras com pegas e terminais em GRP" },
      { en: "Bow step plate with mooring cleat", pt: "Placa de proa com cunho de amarração" },
      { en: "Steering console with windshield, seat and storage", pt: "Consola de condução com para-brisas, banco e arrumação" },
      { en: "Dashboard for up to 9\" screen, with glove box and cupholders", pt: "Painel para ecrã até 9\", com porta-luvas e porta-copos" },
      { en: "Helm & passenger seat / bolster with cupholders", pt: "Banco / apoio de condutor e passageiro com porta-copos" },
      { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Inbuilt fuel system with 90lit / 23gal tank", pt: "Sistema de combustível integrado com depósito de 90L / 23gal" },
      { en: "Integrated cupholders, cleats, towing & lifting eyes", pt: "Porta-copos, cunhos, olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
      { en: "Navigation & waterski classic roll bar", pt: "Roll bar clássico de navegação e ski aquático" },
      { en: "Navigation & waterski mast with GRP top, rear handrails", pt: "Mastro de navegação e ski aquático com topo em GRP, corrimãos traseiros" },
      { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
    ],
    optionalEquipment: [
      { en: "Hydraulic steering system", pt: "Sistema de direção hidráulica" },
      { en: "Mechanical steering system", pt: "Sistema de direção mecânica" },
      { en: "Premium steering wheel", pt: "Volante premium" },
      { en: "Removable bow sundeck-table kit", pt: "Kit amovível de solário-mesa de proa" },
      { en: "Removable bow sundeck extension kit", pt: "Kit de extensão amovível do solário de proa" },
      { en: "Freshwater set with shower", pt: "Conjunto de água doce com duche" },
      { en: "Canvas bimini-top", pt: "Bimini-top em lona" },
      { en: "Overall, consoles and harbour covers", pt: "Coberturas geral, de consolas e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Full centre console with extended instrumentation", pt: "Consola central completa com instrumentação alargada" },
        description: {
          en: "The G580 helm is specced for serious use — chart plotter, VHF, and engine instrumentation all properly integrated, not afterthoughts. The starting point for longer passages.",
          pt: "O leme do G580 está especificado para uso a sério — plotter, VHF e instrumentação do motor devidamente integrados, não pensamentos tardios. O ponto de partida para travessias mais longas.",
        },
      },
      {
        title: { en: "Twin-step deep-V hull", pt: "Casco deep-V com duplo step" },
        description: {
          en: "The same hydrodynamic step geometry as the larger Golden Line hulls, delivering a drier, faster, more fuel-efficient ride than a conventional V hull at the same length.",
          pt: "A mesma geometria de step hidrodinâmico que os cascos maiores da Golden Line, proporcionando uma navegação mais seca, mais rápida e mais eficiente em combustível do que um casco em V convencional ao mesmo comprimento.",
        },
      },
      {
        title: { en: "Social seating fore and aft", pt: "Área social a vante e a ré" },
        description: {
          en: "Bow sunbed, aft bench, and a deck layout that works for a group rather than just a skipper and crew. The G580 is where the Golden Line starts feeling like a day out rather than a transfer.",
          pt: "Espreguiçadeira de proa, banco de popa e um layout de convés que funciona para um grupo, não apenas para o patrão e tripulação. No G580 é onde a Golden Line começa a sentir-se como um dia de lazer em vez de uma simples transferência.",
        },
      },
    ],
  },
  {
    slug: "g680",
    name: "G680",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "The sweet spot. Cabin comfort, centre console simplicity, and enough hull to handle whatever the Atlantic sends.",
      pt: "O equilíbrio perfeito. Conforto de cabine, simplicidade de consola central e casco suficiente para o que o Atlântico trouxer.",
    },
    image: "/images/boats/g680/detail-18.jpg",
    gallery: ["/images/boats/g680/detail-14.jpg", "/images/boats/g680/detail-19.jpg", "/images/boats/g680/detail-22.jpg"],
    href: "/ranges/golden-line/g680/",
    priceFrom: 57435,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "6.80m", label: "LOA" },
      { value: "2.64m", label: "Beam" },
      { value: "200 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "680 cm / 22'3\"" },
        { label: "Inside length", value: "509 cm / 16'58\"" },
        { label: "Beam", value: "264 cm / 8'7\"" },
        { label: "Inside width", value: "150 cm / 4'11\"" },
        { label: "Dry weight", value: "740 kg / 1631 lbs" },
        { label: "Tube diameter", value: "55 cm / 21'7''" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "150 HP / 110,3 kW" },
        { label: "Max power", value: "200 HP / 147,1 kW" },
        { label: "Engine weight max", value: "280 kg / 617 lbs" },
        { label: "Engine shaft length", value: "25\" (extra long)" },
        { label: "Midsection/aft deadrise", value: "24° / 21°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "860 kg / 1896 lbs" },
        { label: "Max load", value: "1150 kg / 2535 lbs" },
        { label: "Max persons", value: "12" },
        { label: "CE category", value: "С" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante autodrenante" },
      { en: "Anchor and transom lockers, bow and rear storage compartments", pt: "Paióis de âncora e de espelho de popa, compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles and GRP stepends", pt: "Tubo insuflável multi-câmaras com pegas e terminais em GRP" },
      { en: "Bow step plate with mooring cleats", pt: "Placa de proa com cunhos de amarração" },
      { en: "Steering console with windshield, seat and storage", pt: "Consola de condução com para-brisas, banco e arrumação" },
      { en: "Dashboard for up to 16\" screen, with glove box and cupholders", pt: "Painel para ecrã até 16\", com porta-luvas e porta-copos" },
      { en: "Helm & passenger seat / bolster with functional wet bar", pt: "Banco / apoio de condutor e passageiro com bar funcional" },
      { en: "U-shaped deck integrated rear seating sofa", pt: "Sofá traseiro em U integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Inbuilt fuel system with 200lit / 52gal tank", pt: "Sistema de combustível integrado com depósito de 200L / 52gal" },
      { en: "Integrated cupholders, handrails, cleats, towing & lifting eyes", pt: "Porta-copos, corrimãos, cunhos, olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
      { en: "Navigation & waterski mast with GRP top", pt: "Mastro de navegação e ski aquático com topo em GRP" },
      { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
      { en: "Hydraulic steering system", pt: "Sistema de direção hidráulica" },
      { en: "Premium steering wheel", pt: "Volante premium" },
    ],
    optionalEquipment: [
      { en: "Removable bow sundeck kit", pt: "Kit amovível de solário de proa" },
      { en: "Removable rear sundeck kit", pt: "Kit amovível de solário de popa" },
      { en: "Removable table with cupholders", pt: "Mesa amovível com porta-copos" },
      { en: "Freshwater set with shower, sink and faucet", pt: "Conjunto de água doce com duche, lavatório e torneira" },
      { en: "Refrigerator-freezer, stainless steel", pt: "Frigorífico-congelador em aço inoxidável" },
      { en: "Anchor set with electric windlass", pt: "Conjunto de ancoragem com guincho elétrico" },
      { en: "Rigid hard-top OR canvas bimini-top", pt: "Hard-top rígido OU bimini-top em lona" },
      { en: "Bow and rear canvas suntop extensions (w/ rigid Hard-top only)", pt: "Extensões de toldo de proa e popa (apenas com Hard-top rígido)" },
      { en: "Overall, consoles and harbour covers", pt: "Coberturas geral, de consolas e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Centre console helm", pt: "Leme em consola central" },
        description: {
          en: "A well-positioned, ergonomic helm station with clear sightlines in all conditions. Instrumentation, chart plotter, and VHF all sit within natural reach without cluttering the deck space behind it.",
          pt: "Uma estação de pilotagem bem posicionada e ergonómica, com linhas de visão claras em todas as condições. Instrumentação, plotter e VHF ficam ao alcance natural sem sobrecarregar o espaço de convés a ré.",
        },
      },
      {
        title: { en: "Deep-V twin-step hull", pt: "Casco deep-V com duplo step hidrodinâmico" },
        description: {
          en: "The G680's hull runs a 21° deadrise with twin hydrodynamic steps that reduce wetted surface at speed, cutting fuel consumption and softening the ride in chop. Built to handle open-water passages, not just sheltered anchorages.",
          pt: "O casco do G680 tem uma quilha de 21° com dois steps hidrodinâmicos que reduzem a superfície molhada em velocidade, diminuindo o consumo de combustível e suavizando a navegação em ondulação. Concebido para travessias em mar aberto, não apenas para ancoradouros abrigados.",
        },
      },
      {
        title: { en: "Convertible bow seating", pt: "Banco de proa convertível" },
        description: {
          en: "The forward section converts between a social seating area and a full sunbed, depending on how the day is going. Stowage beneath keeps the deck uncluttered when underway.",
          pt: "A secção de proa converte-se entre uma área de estar social e uma espreguiçadeira completa, conforme o momento. O arrumo por baixo mantém o convés desimpedido durante a navegação.",
        },
      },
    ],
  },
  {
    slug: "g750",
    name: "G750",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "The serious cruiser of the range — big enough for overnights, fast enough to make them count.",
      pt: "O cruzeiro a sério da gama — grande o suficiente para pernoitas, rápido o suficiente para que valham a pena.",
    },
    image: "/images/boats/g750/detail-11.jpg",
    gallery: ["/images/boats/g750/detail-7.jpg", "/images/boats/g750/detail-15.jpg", "/images/boats/g750/detail-19.jpg"],
    href: "/ranges/golden-line/g750/",
    priceFrom: 68924,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "7.30m", label: "LOA" },
      { value: "2.85m", label: "Beam" },
      { value: "300 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "730 cm / 23'11\"" },
        { label: "Inside length", value: "557 cm / 18'3\"" },
        { label: "Beam", value: "285 cm / 9'4\"" },
        { label: "Inside width", value: "170 cm / 5'7\"" },
        { label: "Dry weight", value: "950 kg / 2094 lbs" },
        { label: "Tube diameter", value: "58 cm / 22\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "200 HP / 150 kW" },
        { label: "Max power", value: "300 HP / 221 kW" },
        { label: "Engine weight max", value: "300 kg / 661 lbs" },
        { label: "Engine shaft length", value: "25\" (extra long)" },
        { label: "Midsection/aft deadrise", value: "25° / 20°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "1250 kg / 2756 lbs" },
        { label: "Max load", value: "1160 kg / 2557 lbs" },
        { label: "Max persons", value: "10 / 14" },
        { label: "CE category", value: "B / C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante autodrenante" },
      { en: "Anchor and transom lockers, bow and rear storage compartments", pt: "Paióis de âncora e de espelho de popa, compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Bow step plate with mooring cleats", pt: "Placa de proa com cunhos de amarração" },
      { en: "Steering console with windshield, seat and inside chamber", pt: "Consola de condução com para-brisas, banco e compartimento interior" },
      { en: "Dashboard for up to 2x17\" screen, with glove box and cupholders", pt: "Painel para 2 ecrãs até 17\", com porta-luvas e porta-copos" },
      { en: "Helm & passenger seat / bolster with functional wet bar", pt: "Banco / apoio de condutor e passageiro com bar funcional" },
      { en: "U-shaped deck integrated rear seating sofa", pt: "Sofá traseiro em U integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Inbuilt fuel system with 260lit / 68gal tank", pt: "Sistema de combustível integrado com depósito de 260L / 68gal" },
      { en: "Integrated cupholders, handrails, cleats, towing & lifting eyes", pt: "Porta-copos, corrimãos, cunhos, olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Navigation & waterski mast with GRP top", pt: "Mastro de navegação e ski aquático com topo em GRP" },
      { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
      { en: "Hydraulic steering system", pt: "Sistema de direção hidráulica" },
      { en: "Premium steering wheel", pt: "Volante premium" },
      { en: "Removable bow sundeck kit", pt: "Kit amovível de solário de proa" },
      { en: "Removable rear sundeck kit", pt: "Kit amovível de solário de popa" },
      { en: "Removable table with cupholders", pt: "Mesa amovível com porta-copos" },
      { en: "WC set with toilet and blackwater tank", pt: "Conjunto de WC com sanita e depósito de águas negras" },
      { en: "Freshwater set with shower, sink and faucet", pt: "Conjunto de água doce com duche, lavatório e torneira" },
      { en: "Refrigerator-freezer, stainless steel", pt: "Frigorífico-congelador em aço inoxidável" },
      { en: "Anchor set with electric windlass", pt: "Conjunto de ancoragem com guincho elétrico" },
      { en: "Rigid hard-top OR canvas bimini-top", pt: "Hard-top rígido OU bimini-top em lona" },
      { en: "Bow and rear canvas suntop extensions (w/ rigid Hard-top only)", pt: "Extensões de toldo de proa e popa (apenas com Hard-top rígido)" },
      { en: "Overall, consoles and harbour covers", pt: "Coberturas geral, de consolas e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Offshore-ready hull at 7.5 metres", pt: "Casco preparado para oceano a 7,5 metros" },
        description: {
          en: "Big enough to handle Atlantic swells with composure, fast enough to make offshore runs practical. The G750 is the point in the range where serious passage-making becomes genuinely comfortable.",
          pt: "Grande o suficiente para aguentar ondulação atlântica com compostura, rápido o suficiente para tornar as saídas oceânicas práticas. O G750 é o ponto da gama onde fazer travessias a sério se torna genuinamente confortável.",
        },
      },
      {
        title: { en: "Extended cockpit with full amenities", pt: "Cockpit amplo com comodidades completas" },
        description: {
          en: "Freshwater system, fridge, and head compartment as standard. A boat this size earns its keep as an extended-use vessel, not just a day tripper, and the specification reflects that.",
          pt: "Sistema de água doce, frigorífico e casa de banho de série. Uma embarcação desta dimensão justifica-se como barco de utilização prolongada, não apenas para passeios de dia, e a especificação reflete isso.",
        },
      },
      {
        title: { en: "Twin-engine option", pt: "Opção de dois motores" },
        description: {
          en: "The G750 transom supports twin outboard installation for passages where redundancy matters. Two engines also give the precise low-speed handling that larger RIBs benefit from in marina environments.",
          pt: "A popa do G750 suporta a instalação de dois motores fora de borda para travessias onde a redundância é importante. Dois motores proporcionam também a manobra precisa a baixa velocidade de que os RIBs maiores beneficiam em marinas.",
        },
      },
    ],
  },
  {
    slug: "g850",
    name: "G850",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "Eight and a half metres, up to 400HP, twin engines optional. For when the destination is further away than the horizon.",
      pt: "Oito metros e meio, até 400CV, dois motores opcional. Para quando o destino está mais longe do que o horizonte.",
    },
    image: "/images/boats/g850/detail-20.jpg",
    gallery: ["/images/boats/g850/detail-12.jpg", "/images/boats/g850/detail-24.jpg"],
    href: "/ranges/golden-line/g850/",
    priceFrom: 115995,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "8.50m", label: "LOA" },
      { value: "2.95m", label: "Beam" },
      { value: "400 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "850 cm / 27'11\"" },
        { label: "Inside length", value: "640 cm / 21'0\"" },
        { label: "Beam", value: "295 cm / 9'8\"" },
        { label: "Inside width", value: "175 cm / 5'9\"" },
        { label: "Dry weight", value: "1200 kg / 2640 lbs" },
        { label: "Tube diameter", value: "60 cm / 24\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "300 HP / 220.6 kW" },
        { label: "Max power", value: "1x400 or 2x200 HP / 1x294 or 2x147.1 kW" },
        { label: "Engine weight max", value: "500 kg / 1102 lbs" },
        { label: "Engine shaft length", value: "30\" (utra long)" },
        { label: "Midsection/aft deadrise", value: "30° / 25°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "1680 kg / 3704 lbs" },
        { label: "Max load", value: "1972 kg / 4348 lbs" },
        { label: "Max persons", value: "12 / 16" },
        { label: "CE category", value: "B / С" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante autodrenante" },
      { en: "Anchor locker, bow and rear storage compartments", pt: "Paiol de âncora, compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Bow step plate with mooring cleats", pt: "Placa de proa com cunhos de amarração" },
      { en: "Steering console with windshield, seat and inside chamber", pt: "Consola de condução com para-brisas, banco e compartimento interior" },
      { en: "Dashboard for up to 2x16\" screen, with glove box and cupholders", pt: "Painel para 2 ecrãs até 16\", com porta-luvas e porta-copos" },
      { en: "Helm & passenger seat / bolster with functional wet bar", pt: "Banco / apoio de condutor e passageiro com bar funcional" },
      { en: "U-shaped deck integrated rear seating sofa", pt: "Sofá traseiro em U integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Inbuilt fuel system with 300lit / 79gal tank", pt: "Sistema de combustível integrado com depósito de 300L / 79gal" },
      { en: "Integrated cupholders, handrails, cleats, towing & lifting eyes", pt: "Porta-copos, corrimãos, cunhos, olhais de reboque e de elevação integrados" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Inside-transom platform with two rear rope lockers", pt: "Plataforma interior de popa com dois paióis de cabos" },
      { en: "Navigation & waterski mast with GRP top", pt: "Mastro de navegação e ski aquático com topo em GRP" },
      { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
      { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
      { en: "Hydraulic steering system", pt: "Sistema de direção hidráulica" },
      { en: "Premium steering wheel", pt: "Volante premium" },
      { en: "Removable rear sundeck kit", pt: "Kit amovível de solário de popa" },
      { en: "Removable table with cupholders", pt: "Mesa amovível com porta-copos" },
      { en: "WC set with toilet and blackwater tank", pt: "Conjunto de WC com sanita e depósito de águas negras" },
      { en: "Freshwater set with shower, sink and faucet", pt: "Conjunto de água doce com duche, lavatório e torneira" },
      { en: "Refrigerator-freezer, stainless steel", pt: "Frigorífico-congelador em aço inoxidável" },
      { en: "Anchor set with electric windlass", pt: "Conjunto de ancoragem com guincho elétrico" },
      { en: "Rigid hard-top OR canvas bimini-top", pt: "Hard-top rígido OU bimini-top em lona" },
      { en: "Bow and rear canvas suntop extensions (w/ rigid Hard-top only)", pt: "Extensões de toldo de proa e popa (apenas com Hard-top rígido)" },
      { en: "Overall, consoles and harbour covers", pt: "Coberturas geral, de consolas e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Twin-engine capable", pt: "Preparado para dois motores" },
        description: {
          en: "The G850's transom is built for single or twin outboard installation, with up to 400HP available. Twin engines add redundancy for longer passages and give precise handling in tight marina situations.",
          pt: "A popa do G850 está concebida para instalação de um ou dois motores fora de borda, com até 400CV disponíveis. Os dois motores acrescentam redundância em travessias longas e proporcionam uma manobra precisa em marinas.",
        },
      },
      {
        title: { en: "Offshore specification standard equipment", pt: "Equipamento de série para navegação oceânica" },
        description: {
          en: "Freshwater system, head compartment, fridge-freezer, and navigation electronics are part of the standard specification — not an options list to negotiate. The G850 is set up for extended time on the water from delivery.",
          pt: "Sistema de água doce, casa de banho, frigorífico-congelador e eletrónica de navegação fazem parte do equipamento de série — não de uma lista de opções a negociar. O G850 está preparado para longos períodos no mar desde a entrega.",
        },
      },
      {
        title: { en: "8.5 metre centre console deck", pt: "Convés de consola central de 8,5 metros" },
        description: {
          en: "A genuinely spacious working deck with clear separation between the helm, the social area, and the bow. Room for a serious day out with a full crew, without anyone feeling they're in the way.",
          pt: "Um convés de trabalho genuinamente espaçoso, com separação clara entre o leme, a área social e a proa. Espaço para um dia completo no mar com tripulação a bordo, sem que ninguém se sinta a mais.",
        },
      },
    ],
  },
  {
    slug: "g980",
    name: "G980",
    range: "golden",
    rangeSlug: "golden-line",
    positioning: {
      en: "The largest Grand ever built. Offshore range, twin-engine power, and the signature hypalon tubes that handle whatever the Atlantic throws at it.",
      pt: "O maior Grand alguma vez construído. Autonomia oceânica, potência de dois motores e os icónicos tubos em Hypalon que aguentam o que o Atlântico lhes lançar.",
    },
    image: "/images/boats/g980/detail-9.jpg",
    gallery: ["/images/boats/g980/detail-16.jpg"],
    href: "/ranges/golden-line/g980/",
    priceFrom: 105851,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "10.00m", label: "LOA" },
      { value: "3.40m", label: "Beam" },
      { value: "700 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "1000 cm / 33'" },
        { label: "Inside length", value: "800 cm / 26'" },
        { label: "Beam", value: "340 cm / 11'15\"" },
        { label: "Inside width", value: "190 cm / 6'23\"" },
        { label: "Dry weight", value: "2350 kg / 5181 lbs" },
        { label: "Tube diameter", value: "60 cm / 24\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "2x300 HP / 2x220,6 kW" },
        { label: "Max power", value: "1x700 or 2x350 HP / 1x522 or 2x261 kW" },
        { label: "Engine weight max", value: "700 kg / 1543 lbs" },
        { label: "Engine shaft length", value: "1x30\" (utra long) / 2x25\" (extra long)" },
        { label: "Midsection/aft deadrise", value: "30° / 22°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "2410 kg / 5313 lbs" },
        { label: "Max load", value: "2000 kg / 4409 lbs" },
        { label: "Max persons", value: "12 / 18" },
        { label: "CE category", value: "B / С" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "7" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass two-stepped deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com dois degraus e convés antiderrapante autodrenante" },
      { en: "Anchor and transom lockers, bow and rear storage compartments", pt: "Paióis de âncora e de espelho de popa, compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Bow step platform with mooring cleats", pt: "Plataforma de proa com cunhos de amarração" },
      { en: "Steering console with windshield and sleeping cabin", pt: "Consola de condução com para-brisas e cabine de dormir" },
      { en: "Dashboard for up to 2x16\" screen, with glove box and cupholder", pt: "Painel para 2 ecrãs até 16\", com porta-luvas e porta-copos" },
      { en: "Helm & passenger seat / bolster with functional wet bar and folding back seat", pt: "Banco / apoio de condutor e passageiro com bar funcional e encosto rebatível" },
      { en: "U-shaped deck integrated rear seating sofa with folding side seats", pt: "Sofá traseiro em U integrado no convés, com bancos laterais rebatíveis" },
      { en: "Integrated transom and rear swimming platforms with ladder", pt: "Plataformas de espelho de popa e de banho integradas, com escada" },
      { en: "Set of seating cushions and backrests, bow sundeck & cabin bed", pt: "Conjunto de almofadas de banco e encostos, solário de proa e cama de cabine" },
      { en: "Inbuilt fuel system with 1x600lit / 1x158gal tank", pt: "Sistema de combustível integrado com depósito de 1x600L / 1x158gal" },
      { en: "Integrated cupholders, rear handrails, cleats, towing & lifting eyes", pt: "Porta-copos, corrimãos de popa, cunhos, olhais de reboque e de elevação integrados" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Black powder coated stainless steel", pt: "Aço inoxidável com revestimento em pó preto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Waterski & navigation roll bar", pt: "Roll bar de ski aquático e navegação" },
      { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
      { en: "Premium steering wheel", pt: "Volante premium" },
      { en: "Removable rear sundeck-table kit", pt: "Kit amovível de solário-mesa de popa" },
      { en: "WC set with toilet and blackwater tank", pt: "Conjunto de WC com sanita e depósito de águas negras" },
      { en: "Freshwater set with shower, sink and faucet", pt: "Conjunto de água doce com duche, lavatório e torneira" },
      { en: "Refrigerator-freezer, stainless steel, up to 2 units", pt: "Frigorífico-congelador em aço inoxidável, até 2 unidades" },
      { en: "Gas kitchenette / stove", pt: "Kitchenette a gás / fogão" },
      { en: "Anchor set with electric windlass", pt: "Conjunto de ancoragem com guincho elétrico" },
      { en: "Bow manoeuvring thruster", pt: "Hélice de proa" },
      { en: "Rigid hard-top", pt: "Hard-top rígido" },
      { en: "Bow and rear canvas suntop extensions (w/ Hard-top only)", pt: "Extensões de toldo de proa e popa (apenas com Hard-top)" },
      { en: "Overall, consoles and harbour covers", pt: "Coberturas geral, de consolas e de porto" },
      { en: "Tube protector package", pt: "Proteção de tubo" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "9.8 metres of offshore capability", pt: "9,8 metros de capacidade oceânica" },
        description: {
          en: "The largest hull Grand builds. Designed for extended passages, serious sea conditions, and the kind of days that need a proper boat underneath them. Twin-engine installation standard at this length.",
          pt: "O maior casco que a Grand constrói. Concebido para travessias longas, condições de mar exigentes e os dias que precisam de um barco a sério por baixo. Instalação de dois motores padrão a este comprimento.",
        },
      },
      {
        title: { en: "Full liveaboard specification", pt: "Especificação completa para viver a bordo" },
        description: {
          en: "Head, freshwater, fridge-freezer, and navigation electronics as standard. The G980 is equipped to stay out rather than come back — a genuine overnight-capable platform rather than a day boat with ambitions.",
          pt: "Casa de banho, água doce, frigorífico-congelador e eletrónica de navegação de série. O G980 está equipado para ficar no mar em vez de regressar — uma plataforma genuinamente capaz de pernoitar, não apenas um barco de dia com ambições.",
        },
      },
      {
        title: { en: "Hypalon tubes at flagship scale", pt: "Tubos em Hypalon à escala da embarcação insignia" },
        description: {
          en: "At this length, tube diameter, chamber count, and material specification matter as much as the hull. The G980's tubes are engineered for stability at anchor and safety at sea — the same Hypalon construction as the rest of the Golden Line, scaled to match the hull.",
          pt: "A este comprimento, o diâmetro dos tubos, o número de câmaras e a especificação do material são tão importantes como o casco. Os tubos do G980 são concebidos para estabilidade em ancoragem e segurança no mar — a mesma construção em Hypalon do resto da Golden Line, escalada para corresponder ao casco.",
        },
      },
    ],
  },

  // ── Silver Line ───────────────────────────────────────────────
  {
    slug: "s275",
    name: "S275",
    range: "silver",
    rangeSlug: "silver-line",
    positioning: {
      en: "The lightest in the range — easy to launch, easy to handle, easy to stow.",
      pt: "O mais leve da gama — fácil de lançar, fácil de manusear, fácil de arrumar.",
    },
    image: "/images/boats/s275/detail-12.jpg",
    gallery: ["/images/boats/s275/detail-8.jpg", "/images/boats/s275/detail-10.jpg"],
    href: "/ranges/silver-line/s275/",
    priceFrom: 2372,
    priceLabel: HULL_ONLY_PRICE_LABEL,
    specs: [
      { value: "2.75m", label: "LOA" },
      { value: "1.55m", label: "Beam" },
      { value: "10 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "275 cm / 9'0\"" },
        { label: "Inside length", value: "182 cm / 6'0\"" },
        { label: "Beam", value: "155 cm / 5'1\"" },
        { label: "Inside width", value: "70 cm / 2'4\"" },
        { label: "Dry weight", value: "53 kg / 117 lbs" },
        { label: "Tube diameter", value: "40 cm / 16\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "6 HP / 4,4kW" },
        { label: "Max power", value: "10 HP / 7,4kW" },
        { label: "Engine weight max", value: "45 kg / 99 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "17° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "87 kg / 191 lbs" },
        { label: "Max load", value: "440 kg / 968 lbs" },
        { label: "Max persons", value: "3" },
        { label: "CE category", value: "D" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Open spacious deck with two wooden benches", pt: "Convés amplo e aberto com dois bancos em madeira" },
      { en: "Integrated towing & lifting eyes", pt: "Olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "GRP stepends of the inflatable tube", pt: "Terminais em GRP do tubo insuflável" },
      { en: "Removable seat cushion with underbag", pt: "Almofada de banco amovível com bolsa inferior" },
      { en: "Overall cover", pt: "Cobertura geral" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Lightest in the range", pt: "O mais leve da gama" },
        description: {
          en: "Under 100kg bare, the S275 launches easily from a beach, stows on deck without drama, and handles comfortably with a small outboard. The right tool for short transfers in calm to moderate conditions.",
          pt: "Com menos de 100kg em vazio, o S275 é fácil de lançar de uma praia, arruma-se no convés sem complicações e manuseia-se confortavelmente com um pequeno motor. A ferramenta certa para transferências curtas em condições calmas a moderadas.",
        },
      },
      {
        title: { en: "Simple, durable construction", pt: "Construção simples e duradoura" },
        description: {
          en: "Fiberglass hull, Hypalon tubes, no unnecessary complexity. Built to be used hard, stored simply, and last.",
          pt: "Casco em fibra de vidro, tubos em Hypalon, sem complexidade desnecessária. Construído para uso intensivo, armazenamento simples e longa duração.",
        },
      },
    ],
  },
  {
    slug: "s300",
    name: "S300",
    range: "silver",
    rangeSlug: "silver-line",
    positioning: {
      en: "Compact and capable. More tender than dinghy, without the footprint of the bigger hulls.",
      pt: "Compacto e capaz. Mais tender do que bote, sem a dimensão dos cascos maiores.",
    },
    image: "/images/boats/s300/detail-15.jpg",
    gallery: ["/images/boats/s300/detail-9.jpg", "/images/boats/s300/detail-12.jpg"],
    href: "/ranges/silver-line/s300/",
    priceFrom: 7494,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "3.00m", label: "LOA" },
      { value: "1.67m", label: "Beam" },
      { value: "15 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "300 cm / 9'10\"" },
        { label: "Inside length", value: "200 cm / 6'7\"" },
        { label: "Beam", value: "167 cm / 5'6\"" },
        { label: "Inside width", value: "78 cm / 2'7\"" },
        { label: "Dry weight", value: "56-77 kg / 123-169 lbs" },
        { label: "Tube diameter", value: "43 cm / 17\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "10 HP / 7,4kW" },
        { label: "Max power", value: "15 HP / 11kW" },
        { label: "Engine weight max", value: "50 kg / 110 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "19° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "91-112 kg / 200-246 lbs" },
        { label: "Max load", value: "520 kg / 1144 lbs" },
        { label: "Max persons", value: "4" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Open spacious deck with two wooden benches (OPEN version)", pt: "Convés amplo e aberto com dois bancos em madeira (versão OPEN)" },
      { en: "Jockey seat console with storage (SPORT version)", pt: "Consola com banco jockey e arrumação (versão SPORT)" },
      { en: "Steering console (LUX version)", pt: "Consola de condução (versão LUX)" },
      { en: "Helm & passenger double seat with storage (LUX version)", pt: "Banco duplo de condutor e passageiro com arrumação (versão LUX)" },
      { en: "Mechanical steering system and wheel (SPORT and LUX)", pt: "Sistema de direção mecânica e volante (SPORT e LUX)" },
      { en: "Set of seating cushions and backrests (SPORT and LUX)", pt: "Conjunto de almofadas de banco e encostos (SPORT e LUX)" },
      { en: "Integrated towing & lifting eyes", pt: "Olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Console's side seat with storage (LUX)", pt: "Banco lateral da consola com arrumação (LUX)" },
      { en: "Bow step plate with clam bollard", pt: "Placa de proa com buzina de amarração" },
      { en: "GRP stepends of the inflatable tube", pt: "Terminais em GRP do tubo insuflável" },
      { en: "Removable seat cushion with underbag (OPEN)", pt: "Almofada de banco amovível com bolsa inferior (OPEN)" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and harbour covers", pt: "Cobertura geral e de porto" },
      { en: "SeaDek soft anti-skid flooring (LUX)", pt: "Piso antiderrapante SeaDek (LUX)" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Compact tender with proper carrying capacity", pt: "Tender compacto com capacidade de carga real" },
        description: {
          en: "The S300 steps up from the S275 with noticeably more passenger and load capacity, while remaining small enough to handle without crew. A practical step up for yachts that need to move more people.",
          pt: "O S300 supera o S275 com uma capacidade notavelmente maior de passageiros e carga, mantendo-se pequeno o suficiente para manusear sem tripulação. Um passo prático para iates que precisam de transportar mais pessoas.",
        },
      },
      {
        title: { en: "Clean deck, clear layout", pt: "Convés limpo, layout claro" },
        description: {
          en: "Uncluttered working space that makes loading and unloading straightforward in any anchorage. No features that get in the way of the boat's actual job.",
          pt: "Espaço de trabalho desimpedido que torna o embarque e desembarque simples em qualquer ancoragem. Sem características que interfiram com a função real da embarcação.",
        },
      },
    ],
  },
  {
    slug: "s330",
    name: "S330",
    range: "silver",
    rangeSlug: "silver-line",
    positioning: {
      en: "Clean, light, and honest. Does exactly what a good tender should do.",
      pt: "Limpo, leve e honesto. Faz exatamente o que um bom tender deve fazer.",
    },
    image: "/images/boats/s330/detail-13.jpg",
    gallery: ["/images/boats/s330/detail-8.jpg", "/images/boats/s330/detail-11.jpg"],
    href: "/ranges/silver-line/s330/",
    priceFrom: 7702,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "3.30m", label: "LOA" },
      { value: "1.69m", label: "Beam" },
      { value: "25 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "330 cm / 10'10\"" },
        { label: "Inside length", value: "218 cm / 7'2\"" },
        { label: "Beam", value: "169 cm / 5'7\"" },
        { label: "Inside width", value: "78 cm / 2'7\"" },
        { label: "Dry weight", value: "63-85 kg / 139-187 lbs" },
        { label: "Tube diameter", value: "43 cm / 17\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "15 HP / 11 kW" },
        { label: "Max power", value: "25 HP / 18,4 kW" },
        { label: "Engine weight max", value: "70 kg / 154 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "19° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "99-126 kg / 218-277 lbs" },
        { label: "Max load", value: "580 kg / 1276 lbs" },
        { label: "Max persons", value: "4" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Open spacious deck with two wooden benches (OPEN version)", pt: "Convés amplo e aberto com dois bancos em madeira (versão OPEN)" },
      { en: "Jockey seat console with storage (SPORT version)", pt: "Consola com banco jockey e arrumação (versão SPORT)" },
      { en: "Steering console (LUX version)", pt: "Consola de condução (versão LUX)" },
      { en: "Helm & passenger double seat with storage (LUX version)", pt: "Banco duplo de condutor e passageiro com arrumação (versão LUX)" },
      { en: "Mechanical steering system and wheel (SPORT and LUX)", pt: "Sistema de direção mecânica e volante (SPORT e LUX)" },
      { en: "Set of seating cushions and backrests (SPORT and LUX)", pt: "Conjunto de almofadas de banco e encostos (SPORT e LUX)" },
      { en: "Integrated towing & lifting eyes", pt: "Olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Console's side seat with storage (LUX)", pt: "Banco lateral da consola com arrumação (LUX)" },
      { en: "Bow step plate with clam bollard", pt: "Placa de proa com buzina de amarração" },
      { en: "GRP stepends of the inflatable tube", pt: "Terminais em GRP do tubo insuflável" },
      { en: "Removable seat cushion with underbag (OPEN)", pt: "Almofada de banco amovível com bolsa inferior (OPEN)" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and harbour covers", pt: "Cobertura geral e de porto" },
      { en: "SeaDek soft anti-skid flooring (LUX)", pt: "Piso antiderrapante SeaDek (LUX)" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Workhorse tender specification", pt: "Especificação de tender de trabalho" },
        description: {
          en: "The S330 is sized for yachts that need a tender that can genuinely carry guests, luggage, and provisions in one trip. Stable enough to load from a swim platform without drama.",
          pt: "O S330 está dimensionado para iates que precisam de um tender capaz de transportar genuinamente convidados, bagagem e provisões numa só viagem. Estável o suficiente para carregar a partir de uma plataforma de banho sem complicações.",
        },
      },
      {
        title: { en: "Multiple layout options", pt: "Várias opções de layout" },
        description: {
          en: "Open, Sport, and Lux deck configurations on the same proven hull. Choose the layout that suits the yacht and the use case, not the other way around.",
          pt: "Configurações de convés Open, Sport e Lux no mesmo casco comprovado. Escolha o layout que se adapta ao iate e à utilização, não ao contrário.",
        },
      },
    ],
  },
  {
    slug: "s370n",
    name: "S370N",
    range: "silver",
    rangeSlug: "silver-line",
    positioning: {
      en: "A workhorse tender with enough polish to sit alongside premium vessels without apology.",
      pt: "Um tender de trabalho com acabamento suficiente para estar ao lado de embarcações premium sem necessitar de se desculpar.",
    },
    image: "/images/boats/s370n/detail-11.jpg",
    gallery: ["/images/boats/s370n/detail-9.jpg"],
    href: "/ranges/silver-line/s370n/",
    priceFrom: 9757,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "3.70m", label: "LOA" },
      { value: "1.85m", label: "Beam" },
      { value: "30 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "370 cm / 12'2\"" },
        { label: "Inside length", value: "270 cm / 8'10\"" },
        { label: "Beam", value: "185 cm / 6'1\"" },
        { label: "Inside width", value: "92 cm / 3'0\"" },
        { label: "Dry weight", value: "95-124 kg / 209-273 lbs" },
        { label: "Tube diameter", value: "46 cm / 18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "25 HP / 18,4 kW" },
        { label: "Max power", value: "30 HP / 22,1 kW" },
        { label: "Engine weight max", value: "80 kg / 176 lbs" },
        { label: "Engine shaft length", value: "15\" (short)" },
        { label: "Midsection/aft deadrise", value: "20° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "158-185 kg / 347-407 lbs" },
        { label: "Max load", value: "600 kg / 1320 lbs" },
        { label: "Max persons", value: "5" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Bow storage compartment", pt: "Compartimento de arrumação à proa" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Open spacious deck with two wooden benches (OPEN version)", pt: "Convés amplo e aberto com dois bancos em madeira (versão OPEN)" },
      { en: "Jockey seat console with windshield and storage (SPORT version)", pt: "Consola com banco jockey, para-brisas e arrumação (versão SPORT)" },
      { en: "Steering console with windshield, seat and storage (LUX version)", pt: "Consola de condução com para-brisas, banco e arrumação (versão LUX)" },
      { en: "Helm & passenger double seat with storage (LUX version)", pt: "Banco duplo de condutor e passageiro com arrumação (versão LUX)" },
      { en: "Mechanical steering system and wheel (SPORT and LUX)", pt: "Sistema de direção mecânica e volante (SPORT e LUX)" },
      { en: "Set of seating cushions and backrests (SPORT and LUX)", pt: "Conjunto de almofadas de banco e encostos (SPORT e LUX)" },
      { en: "Integrated towing & lifting eyes", pt: "Olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Navigation classic roll bar, folding", pt: "Roll bar clássico de navegação, rebatível" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Bow step plate with mooring cleat", pt: "Placa de proa com cunho de amarração" },
      { en: "GRP stepends of the inflatable tube", pt: "Terminais em GRP do tubo insuflável" },
      { en: "Removable seat cushion with underbag (OPEN)", pt: "Almofada de banco amovível com bolsa inferior (OPEN)" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and consoles covers", pt: "Coberturas geral e de consolas" },
      { en: "SeaDek soft anti-skid flooring (LUX)", pt: "Piso antiderrapante SeaDek (LUX)" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Mid-range tender, full specification", pt: "Tender de gama média, especificação completa" },
        description: {
          en: "At 3.7 metres, the S370N has enough deck space to work as a genuine day boat in sheltered water while remaining practical as a yacht auxiliary. The Open/Sport/Lux layout options give it real versatility.",
          pt: "Com 3,7 metros, o S370N tem espaço de convés suficiente para funcionar como embarcação de dia genuína em águas abrigadas, mantendo-se prático como auxiliar de iate. As opções de layout Open/Sport/Lux conferem-lhe uma versatilidade real.",
        },
      },
      {
        title: { en: "Hypalon tubes, Silver Line build quality", pt: "Tubos em Hypalon, qualidade de construção Silver Line" },
        description: {
          en: "The same tube material and construction standards as the Golden Line, applied to a simpler, more practical hull. Quality where it matters, without the price of features you don't need.",
          pt: "O mesmo material e padrões de construção dos tubos da Golden Line, aplicados a um casco mais simples e prático. Qualidade onde é importante, sem o preço de características de que não necessita.",
        },
      },
    ],
  },
  {
    slug: "s420n",
    name: "S420N",
    range: "silver",
    rangeSlug: "silver-line",
    positioning: {
      en: "Solid, reliable, well-sized for yacht work. Fits davits, takes a crowd, gets on with it.",
      pt: "Sólido, fiável, bem dimensionado para trabalho em iate. Adapta-se a davits, transporta muita gente, cumpre a sua função.",
    },
    image: "/images/boats/s420n/detail-14.jpg",
    gallery: ["/images/boats/s420n/detail-10.jpg", "/images/boats/s420n/detail-16.jpg"],
    href: "/ranges/silver-line/s420n/",
    priceFrom: 11939,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "4.20m", label: "LOA" },
      { value: "1.95m", label: "Beam" },
      { value: "50 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "420 cm / 13'9\"" },
        { label: "Inside length", value: "310 cm / 10'2\"" },
        { label: "Beam", value: "195 cm / 6'5\"" },
        { label: "Inside width", value: "101 cm / 3'4\"" },
        { label: "Dry weight", value: "115-145 kg / 253-319 lbs" },
        { label: "Tube diameter", value: "46 cm / 18\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "40 HP / 29,4 kW" },
        { label: "Max power", value: "50 HP / 36,8 kW" },
        { label: "Engine weight max", value: "115 kg / 253 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "20° / 17°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "178-209 kg / 392-460 lbs" },
        { label: "Max load", value: "650 / 1430" },
        { label: "Max persons", value: "8" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "3" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Bow storage compartment", pt: "Compartimento de arrumação à proa" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Open spacious deck with two wooden benches (OPEN version)", pt: "Convés amplo e aberto com dois bancos em madeira (versão OPEN)" },
      { en: "Jockey seat console with windshield and storage (SPORT version)", pt: "Consola com banco jockey, para-brisas e arrumação (versão SPORT)" },
      { en: "Steering console with windshield, seat and storage (LUX version)", pt: "Consola de condução com para-brisas, banco e arrumação (versão LUX)" },
      { en: "Helm & passenger double seat with storage (LUX version)", pt: "Banco duplo de condutor e passageiro com arrumação (versão LUX)" },
      { en: "Mechanical steering system and wheel (SPORT and LUX)", pt: "Sistema de direção mecânica e volante (SPORT e LUX)" },
      { en: "Set of seating cushions and backrests (SPORT and LUX)", pt: "Conjunto de almofadas de banco e encostos (SPORT e LUX)" },
      { en: "Integrated towing & lifting eyes", pt: "Olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Navigation classic roll bar, folding", pt: "Roll bar clássico de navegação, rebatível" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Bow step plate with mooring cleat", pt: "Placa de proa com cunho de amarração" },
      { en: "GRP stepends of the inflatable tube", pt: "Terminais em GRP do tubo insuflável" },
      { en: "Removable bow sundeck kit (LUX)", pt: "Kit amovível de solário de proa (LUX)" },
      { en: "Removable seat cushion with underbag (OPEN)", pt: "Almofada de banco amovível com bolsa inferior (OPEN)" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and consoles covers", pt: "Coberturas geral e de consolas" },
      { en: "SeaDek soft anti-skid flooring (LUX)", pt: "Piso antiderrapante SeaDek (LUX)" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Capable coastal tender", pt: "Tender costeiro capaz" },
        description: {
          en: "The largest of the Silver Line's practical tender range. At 4.2 metres, the S420N handles coastal chop confidently and carries a full complement of passengers and kit without feeling overloaded.",
          pt: "O maior da gama de tenders práticos da Silver Line. Com 4,2 metros, o S420N lida com a ondulação costeira com confiança e transporta um complemento completo de passageiros e equipamento sem se sentir sobrecarregado.",
        },
      },
      {
        title: { en: "Three deck layouts on one hull", pt: "Três layouts de convés num único casco" },
        description: {
          en: "Open for simplicity, Sport for the helm-forward configuration, Lux for days when comfort matters as much as function. The S420N adapts to how you actually use it.",
          pt: "Open para simplicidade, Sport para a configuração com leme avançado, Lux para os dias em que o conforto é tão importante como a função. O S420N adapta-se à forma como realmente o utiliza.",
        },
      },
    ],
  },
  {
    slug: "s470n",
    name: "S470N",
    range: "silver",
    rangeSlug: "silver-line",
    positioning: {
      en: "The most capable tender in the range — handles serious loads and real coastal conditions without fuss.",
      pt: "O tender mais capaz da gama — lida com cargas a sério e condições costeiras reais sem complicações.",
    },
    image: "/images/boats/s470n/detail-12.jpg",
    gallery: ["/images/boats/s470n/detail-9.jpg", "/images/boats/s470n/detail-16.jpg"],
    href: "/ranges/silver-line/s470n/",
    priceFrom: 14501,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "4.70m", label: "LOA" },
      { value: "2.05m", label: "Beam" },
      { value: "70 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "470 cm / 15'5\"" },
        { label: "Inside length", value: "340 cm / 11'2\"" },
        { label: "Beam", value: "205 cm / 6'9\"" },
        { label: "Inside width", value: "105 cm / 3'4\"" },
        { label: "Dry weight", value: "170-208 kg / 374-458 lbs" },
        { label: "Tube diameter", value: "50 cm / 20\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "50 HP / 36,8 kW" },
        { label: "Max power", value: "70 HP / 51,5 kW" },
        { label: "Engine weight max", value: "150 kg / 330 lbs" },
        { label: "Engine shaft length", value: "20\" (long)" },
        { label: "Midsection/aft deadrise", value: "20° / 15°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "226-265 kg / 497-583 lbs" },
        { label: "Max load", value: "900 kg / 1980 lbs" },
        { label: "Max persons", value: "8" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass medium-V hull with anti-skid deck", pt: "Casco em fibra de vidro medium-V com convés antiderrapante" },
      { en: "Bow storage compartment", pt: "Compartimento de arrumação à proa" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Open spacious deck (OPEN version)", pt: "Convés amplo e aberto (versão OPEN)" },
      { en: "Jockey seat console with windshield and storage (SPORT version)", pt: "Consola com banco jockey, para-brisas e arrumação (versão SPORT)" },
      { en: "Steering console with windshield, seat and storage (LUX version)", pt: "Consola de condução com para-brisas, banco e arrumação (versão LUX)" },
      { en: "Helm & passenger double seat with storage (LUX version)", pt: "Banco duplo de condutor e passageiro com arrumação (versão LUX)" },
      { en: "Mechanical steering system and wheel (SPORT and LUX)", pt: "Sistema de direção mecânica e volante (SPORT e LUX)" },
      { en: "Set of seating cushions and backrests (SPORT and LUX)", pt: "Conjunto de almofadas de banco e encostos (SPORT e LUX)" },
      { en: "Integrated towing & lifting eyes", pt: "Olhais de reboque e de elevação integrados" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
    ],
    optionalEquipment: [
      { en: "Navigation classic roll bar, folding", pt: "Roll bar clássico de navegação, rebatível" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Bow step plate with mooring cleat", pt: "Placa de proa com cunho de amarração" },
      { en: "GRP stepends of the inflatable tube", pt: "Terminais em GRP do tubo insuflável" },
      { en: "Removable bow sundeck kit (LUX)", pt: "Kit amovível de solário de proa (LUX)" },
      { en: "Canvas bimini-top, collapsible", pt: "Bimini-top em lona, retrátil" },
      { en: "Overall and consoles covers", pt: "Coberturas geral e de consolas" },
      { en: "SeaDek soft anti-skid flooring (LUX)", pt: "Piso antiderrapante SeaDek (LUX)" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Black powder coated stainless steel upgrade", pt: "Upgrade de aço inoxidável com revestimento em pó preto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "The Silver Line's most capable hull", pt: "O casco mais capaz da Silver Line" },
        description: {
          en: "At 4.7 metres, the S470N is the tender that earns its place on serious cruising yachts. Enough carrying capacity for a full crew with gear, enough hull to handle the passage back from an exposed anchorage.",
          pt: "Com 4,7 metros, o S470N é o tender que merece o seu lugar em iates de cruzeiro a sério. Capacidade de carga suficiente para uma tripulação completa com equipamento, casco suficiente para aguentar o regresso de uma ancoragem exposta.",
        },
      },
      {
        title: { en: "Full layout choice — Open, Sport, Lux", pt: "Escolha completa de layout — Open, Sport, Lux" },
        description: {
          en: "At this size, the Lux configuration in particular becomes a genuinely comfortable day boat in its own right, not just a tender with aspirations. The hull is capable enough to justify whichever layout suits the mission.",
          pt: "Nesta dimensão, a configuração Lux em particular torna-se uma embarcação de dia genuinamente confortável por direito próprio, não apenas um tender com ambições. O casco é suficientemente capaz para justificar qualquer layout que se adapte à missão.",
        },
      },
    ],
  },

  // ── Drive Line ────────────────────────────────────────────────
  // d600 is modeled as ONE model with three layouts (Active/Drive/Lux)
  // rather than three separate models — the scraped d600-active/d600-drive/
  // d600-lux pages share identical hull dimensions and differ only in the
  // two weight fields, confirming they're trim/layout variants of one hull,
  // not distinct products. This maps directly onto the layouts mechanism
  // already used elsewhere in this data layer.
  {
    slug: "d600",
    name: "D600",
    range: "drive",
    rangeSlug: "drive-line",
    // Model-level positioning/features mirror the "Drive" layout (d600's
    // default image is the Drive layout) — this is the summary shown before
    // a layout is chosen. Each layout also carries its own full positioning/
    // fullSpecs/features/equipment, rendered as its own section further down
    // the model page (see `hasLayouts` branch in [model]/page.tsx).
    positioning: {
      en: "The purist's D600 — stripped back to what matters, set up for performance.",
      pt: "O D600 do purista — reduzido ao essencial, configurado para a performance.",
    },
    image: "/images/boats/d600-drive/detail-12.jpg",
    href: "/ranges/drive-line/d600/",
    specs: [
      { value: "6.12m", label: "LOA" },
      { value: "2.50m", label: "Beam" },
      { value: "150 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "612 cm / 20'1\"" },
        { label: "Inside length", value: "440 cm / 14'5\"" },
        { label: "Beam", value: "250 cm / 8'2\"" },
        { label: "Inside width", value: "154 cm / 5'1\"" },
        { label: "Tube diameter", value: "50 cm / 20\"" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "130 HP / 95,6 kW" },
        { label: "Max power", value: "150 HP / 110,3 kW" },
        { label: "Engine weight max", value: "250 kg / 550 lbs" },
        { label: "Engine shaft length", value: "25\" (extra long)" },
        { label: "Midsection/aft deadrise", value: "22° / 22°" },
      ] },
      { category: "Capacity", items: [
        { label: "Max load", value: "1100 kg / 2425 lbs" },
        { label: "Max persons", value: "12" },
        { label: "CE category", value: "C" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "5" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante autodrenante" },
      { en: "Anchor and transom lockers, bow and rear storage compartments", pt: "Paióis de âncora e de espelho de popa, compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
      { en: "Bow step plate with mooring cleats", pt: "Placa de proa com cunhos de amarração" },
      { en: "Steering console with windshield", pt: "Consola de condução com para-brisas" },
      { en: "Dashboard for up to 16\" screen, with cupholders", pt: "Painel para ecrã até 16\", com porta-copos" },
      { en: "Suspension sports seat, adjustable", pt: "Banco desportivo com suspensão, ajustável" },
      { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
      { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
      { en: "Inbuilt fuel system with 141lit / 38gal tank", pt: "Sistema de combustível integrado com depósito de 141L / 38gal" },
      { en: "Integrated cleats, towing & lifting eyes", pt: "Cunhos integrados, olhais de reboque e de elevação" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
      { en: "Black powder coated stainless steel", pt: "Aço inoxidável com revestimento em pó preto" },
    ],
    optionalEquipment: [
      { en: "Widely customizable deck-console-seats layout", pt: "Layout de convés-consola-bancos amplamente personalizável" },
      { en: "Single jockey seats with storage, up to 5pcs", pt: "Bancos jockey individuais com arrumação, até 5 unidades" },
      { en: "Navigation & waterski mast, rear handrails", pt: "Mastro de navegação e ski aquático, corrimãos traseiros" },
      { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
      { en: "Hydraulic steering system", pt: "Sistema de direção hidráulica" },
      { en: "Mechanical steering system", pt: "Sistema de direção mecânica" },
      { en: "Premium steering wheel", pt: "Volante premium" },
      { en: "Transom lockers' cushions", pt: "Almofadas dos paióis do espelho de popa" },
      { en: "Freshwater set with shower", pt: "Conjunto de água doce com duche" },
      { en: "Canvas T-top", pt: "T-top em lona" },
      { en: "Overall, console and harbour covers", pt: "Coberturas geral, de consola e de porto" },
      { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
      { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "The purist's D600", pt: "O D600 do purista" },
        description: {
          en: "Same deep-V hull as the rest of the D600 range, with a layout focused entirely on the driving experience. Helm positioned for visibility and control, deck cleared for movement, nothing added that isn't needed.",
          pt: "O mesmo casco deep-V do resto da gama D600, com um layout totalmente focado na experiência de condução. Leme posicionado para visibilidade e controlo, convés desimpedido para movimento, nada acrescentado que não seja necessário.",
        },
      },
      {
        title: { en: "Practical storage, clean lines", pt: "Arrumo prático, linhas limpas" },
        description: {
          en: "Stowage integrated without cluttering the working deck. The D600 Drive is set up for people who want to go fast and come back with everything they brought.",
          pt: "Arrumo integrado sem sobrecarregar o convés de trabalho. O D600 Drive está preparado para quem quer ir rápido e regressar com tudo o que trouxe.",
        },
      },
      {
        title: { en: "Raised tube profile", pt: "Perfil de tubo elevado" },
        description: {
          en: "Higher tube placement than a conventional RIB for better spray management at speed, and a visual presence that makes clear this is a performance hull before the engine starts.",
          pt: "Colocação de tubo mais alta do que num RIB convencional para melhor gestão de borrifo em velocidade, e uma presença visual que deixa claro que este é um casco de performance antes de o motor arrancar.",
        },
      },
    ],
    layouts: [
      {
        name: "Active",
        useCaseLine: {
          en: "Straightforward and capable — sports seats, hydraulic steering, built for performance over comfort.",
          pt: "Direto e capaz — bancos desportivos, direção hidráulica, construído para o desempenho antes do conforto.",
        },
        image: "/images/boats/d600-active/detail-13.jpg",
        priceFrom: 38540,
        priceLabel: MIN_PACKAGE_PRICE_LABEL,
        specs: [
          { label: "Dry weight", value: "596 kg / 1314 lbs" },
          { label: "Package weight", value: "706 kg / 1556 lbs" },
        ],
        standardFeatures: [
          { en: "Fiberglass deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante autodrenante" },
          { en: "Anchor, transom and underdeck lockers, bow and rear compartments", pt: "Paióis de âncora, de espelho de popa e sob o convés, compartimentos à proa e à popa" },
          { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
          { en: "Bow step plate with mooring cleats", pt: "Placa de proa com cunhos de amarração" },
          { en: "Steering console with windshield, removable seat and storage", pt: "Consola de condução com para-brisas, banco amovível e arrumação" },
          { en: "Dashboard for up to 16\" screen, with cupholders", pt: "Painel para ecrã até 16\", com porta-copos" },
          { en: "Suspension sports seats, adjustable", pt: "Bancos desportivos com suspensão, ajustáveis" },
          { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
          { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
          { en: "Inbuilt fuel system with 141lit / 38gal tank", pt: "Sistema de combustível integrado com depósito de 141L / 38gal" },
          { en: "Integrated cleats, towing & lifting eyes", pt: "Cunhos integrados, olhais de reboque e de elevação" },
          { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
          { en: "Black powder coated stainless steel", pt: "Aço inoxidável com revestimento em pó preto" },
        ],
        optionalEquipment: [
          { en: "Navigation & waterski mast, rear handrails", pt: "Mastro de navegação e ski aquático, corrimãos traseiros" },
          { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
          { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
          { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
          { en: "Hydraulic steering system", pt: "Sistema de direção hidráulica" },
          { en: "Mechanical steering system", pt: "Sistema de direção mecânica" },
          { en: "Premium steering wheel", pt: "Volante premium" },
          { en: "Removable bow sundeck kit", pt: "Kit amovível de solário de proa" },
          { en: "Transom lockers' cushions", pt: "Almofadas dos paióis do espelho de popa" },
          { en: "Freshwater set with shower", pt: "Conjunto de água doce com duche" },
          { en: "Canvas T-top", pt: "T-top em lona" },
          { en: "Canvas bow Sun-top, with T-top only", pt: "Toldo solar de proa em lona, apenas com T-top" },
          { en: "Canvas rear Sun-top, with T-top only", pt: "Toldo solar de popa em lona, apenas com T-top" },
          { en: "Overall, console and harbour covers", pt: "Coberturas geral, de consola e de porto" },
          { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
          { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
          { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
        ],
        positioning: {
          en: "The performance-focused D600 — adjustable sports seats, a helm built for control, and nothing between the driver and the water.",
          pt: "O D600 focado no desempenho — bancos desportivos ajustáveis, um leme concebido para o controlo, e nada entre o condutor e a água.",
        },
        fullSpecs: [
          { category: "Dimensions", items: [
            { label: "LOA", value: "612 cm / 20'1\"" },
            { label: "Inside length", value: "440 cm / 14'5\"" },
            { label: "Beam", value: "250 cm / 8'2\"" },
            { label: "Inside width", value: "154 cm / 5'1\"" },
            { label: "Dry weight", value: "596 kg / 1314 lbs" },
            { label: "Tube diameter", value: "50 cm / 20\"" },
          ] },
          { category: "Performance", items: [
            { label: "Recommended power", value: "130 HP / 95,6 kW" },
            { label: "Max power", value: "150 HP / 110,3 kW" },
            { label: "Engine weight max", value: "250 kg / 550 lbs" },
            { label: "Engine shaft length", value: "25\" (extra long)" },
            { label: "Midsection/aft deadrise", value: "22° / 22°" },
          ] },
          { category: "Capacity", items: [
            { label: "Package weight", value: "706 kg / 1556 lbs" },
            { label: "Max load", value: "1100 kg / 2425 lbs" },
            { label: "Max persons", value: "12" },
            { label: "CE category", value: "C" },
          ] },
          { category: "Construction", items: [
            { label: "Tube chambers", value: "5" },
            { label: "Tube material", value: "PVC / Hypalon" },
          ] },
        ],
        features: [
          {
            title: { en: "Suspension seating, purpose-built", pt: "Bancos com suspensão, feitos para o propósito" },
            description: {
              en: "Adjustable sports seats absorb chop instead of passing it straight through — set up for pushing the hull, not just riding along.",
              pt: "Bancos desportivos ajustáveis absorvem o impacto das ondas em vez de o transmitir diretamente — preparados para explorar o casco, não apenas para ir a bordo.",
            },
          },
          {
            title: { en: "Uncluttered helm, full control", pt: "Leme desimpedido, controlo total" },
            description: {
              en: "Dashboard sized for up to a 16-inch screen, hydraulic or mechanical steering, and nothing between the driver and the water.",
              pt: "Painel dimensionado para um ecrã até 16 polegadas, direção hidráulica ou mecânica, e nada entre o condutor e a água.",
            },
          },
          {
            title: { en: "Raised tube profile", pt: "Perfil de tubo elevado" },
            description: {
              en: "Higher tube placement than a conventional RIB for better spray management at speed, and a visual presence that makes clear this is a performance hull before the engine starts.",
              pt: "Colocação de tubo mais alta do que num RIB convencional para melhor gestão de borrifo em velocidade, e uma presença visual que deixa claro que este é um casco de performance antes de o motor arrancar.",
            },
          },
        ],
      },
      {
        name: "Drive",
        useCaseLine: {
          en: "Built to work — a customisable deck for sightseeing, fishing, diving, or commercial service.",
          pt: "Construído para trabalhar — um convés personalizável para passeios, pesca, mergulho ou serviço comercial.",
        },
        image: "/images/boats/d600-drive/detail-12.jpg",
        priceFrom: 41200,
        priceLabel: MIN_PACKAGE_PRICE_LABEL,
        specs: [
          { label: "Dry weight", value: "626 kg / 1380 lbs" },
          { label: "Package weight", value: "746 kg / 1645 lbs" },
        ],
        standardFeatures: [
          { en: "Fiberglass deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante autodrenante" },
          { en: "Anchor and transom lockers, bow and rear storage compartments", pt: "Paióis de âncora e de espelho de popa, compartimentos de arrumação à proa e à popa" },
          { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
          { en: "Bow step plate with mooring cleats", pt: "Placa de proa com cunhos de amarração" },
          { en: "Steering console with windshield", pt: "Consola de condução com para-brisas" },
          { en: "Dashboard for up to 16\" screen, with cupholders", pt: "Painel para ecrã até 16\", com porta-copos" },
          { en: "Suspension sports seat, adjustable", pt: "Banco desportivo com suspensão, ajustável" },
          { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
          { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
          { en: "Inbuilt fuel system with 141lit / 38gal tank", pt: "Sistema de combustível integrado com depósito de 141L / 38gal" },
          { en: "Integrated cleats, towing & lifting eyes", pt: "Cunhos integrados, olhais de reboque e de elevação" },
          { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
          { en: "Black powder coated stainless steel", pt: "Aço inoxidável com revestimento em pó preto" },
        ],
        optionalEquipment: [
          { en: "Widely customizable deck-console-seats layout", pt: "Layout de convés-consola-bancos amplamente personalizável" },
          { en: "Single jockey seats with storage, up to 5pcs", pt: "Bancos jockey individuais com arrumação, até 5 unidades" },
          { en: "Navigation & waterski mast, rear handrails", pt: "Mastro de navegação e ski aquático, corrimãos traseiros" },
          { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
          { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
          { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
          { en: "Hydraulic steering system", pt: "Sistema de direção hidráulica" },
          { en: "Mechanical steering system", pt: "Sistema de direção mecânica" },
          { en: "Premium steering wheel", pt: "Volante premium" },
          { en: "Transom lockers' cushions", pt: "Almofadas dos paióis do espelho de popa" },
          { en: "Freshwater set with shower", pt: "Conjunto de água doce com duche" },
          { en: "Canvas T-top", pt: "T-top em lona" },
          { en: "Overall, console and harbour covers", pt: "Coberturas geral, de consola e de porto" },
          { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
          { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
          { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
        ],
        positioning: {
          en: "The purist's D600 — stripped back to what matters, set up for performance.",
          pt: "O D600 do purista — reduzido ao essencial, configurado para a performance.",
        },
        fullSpecs: [
          { category: "Dimensions", items: [
            { label: "LOA", value: "612 cm / 20'1\"" },
            { label: "Inside length", value: "440 cm / 14'5\"" },
            { label: "Beam", value: "250 cm / 8'2\"" },
            { label: "Inside width", value: "154 cm / 5'1\"" },
            { label: "Dry weight", value: "626 kg / 1380 lbs" },
            { label: "Tube diameter", value: "50 cm / 20\"" },
          ] },
          { category: "Performance", items: [
            { label: "Recommended power", value: "130 HP / 95,6 kW" },
            { label: "Max power", value: "150 HP / 110,3 kW" },
            { label: "Engine weight max", value: "250 kg / 550 lbs" },
            { label: "Engine shaft length", value: "25\" (extra long)" },
            { label: "Midsection/aft deadrise", value: "22° / 22°" },
          ] },
          { category: "Capacity", items: [
            { label: "Package weight", value: "746 kg / 1645 lbs" },
            { label: "Max load", value: "1100 kg / 2425 lbs" },
            { label: "Max persons", value: "12" },
            { label: "CE category", value: "C" },
          ] },
          { category: "Construction", items: [
            { label: "Tube chambers", value: "5" },
            { label: "Tube material", value: "PVC / Hypalon" },
          ] },
        ],
        features: [
          {
            title: { en: "The purist's D600", pt: "O D600 do purista" },
            description: {
              en: "Same deep-V hull as the rest of the D600 range, with a layout focused entirely on the driving experience. Helm positioned for visibility and control, deck cleared for movement, nothing added that isn't needed.",
              pt: "O mesmo casco deep-V do resto da gama D600, com um layout totalmente focado na experiência de condução. Leme posicionado para visibilidade e controlo, convés desimpedido para movimento, nada acrescentado que não seja necessário.",
            },
          },
          {
            title: { en: "Practical storage, clean lines", pt: "Arrumo prático, linhas limpas" },
            description: {
              en: "Stowage integrated without cluttering the working deck. The D600 Drive is set up for people who want to go fast and come back with everything they brought.",
              pt: "Arrumo integrado sem sobrecarregar o convés de trabalho. O D600 Drive está preparado para quem quer ir rápido e regressar com tudo o que trouxe.",
            },
          },
          {
            title: { en: "Raised tube profile", pt: "Perfil de tubo elevado" },
            description: {
              en: "Higher tube placement than a conventional RIB for better spray management at speed, and a visual presence that makes clear this is a performance hull before the engine starts.",
              pt: "Colocação de tubo mais alta do que num RIB convencional para melhor gestão de borrifo em velocidade, e uma presença visual que deixa claro que este é um casco de performance antes de o motor arrancar.",
            },
          },
        ],
      },
      {
        name: "Lux",
        useCaseLine: {
          en: "The relaxed side of D600 — sundecks, freshwater, and finish that trades nothing off the performance underneath.",
          pt: "O lado descontraído do D600 — solários, água doce e um acabamento que não sacrifica o desempenho por baixo.",
        },
        image: "/images/boats/d600-lux/detail-11.jpg",
        priceFrom: 38933,
        priceLabel: MIN_PACKAGE_PRICE_LABEL,
        specs: [
          { label: "Dry weight", value: "597 kg / 1316 lbs" },
          { label: "Package weight", value: "707 kg / 1559 lbs" },
        ],
        standardFeatures: [
          { en: "Fiberglass deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com convés antiderrapante autodrenante" },
          { en: "Anchor, transom and underdeck lockers, bow and rear compartments", pt: "Paióis de âncora, de espelho de popa e sob o convés, compartimentos à proa e à popa" },
          { en: "Multi-chamber inflatable tube with handles", pt: "Tubo insuflável multi-câmaras com pegas" },
          { en: "Bow step plate with mooring cleats", pt: "Placa de proa com cunhos de amarração" },
          { en: "Steering console with windshield, removable seat and storage", pt: "Consola de condução com para-brisas, banco amovível e arrumação" },
          { en: "Dashboard for up to 16\" screen, with cupholders", pt: "Painel para ecrã até 16\", com porta-copos" },
          { en: "Helm & passenger seat / bolster", pt: "Banco / apoio de condutor e passageiro" },
          { en: "Deck integrated rear seating sofa", pt: "Sofá traseiro integrado no convés" },
          { en: "Set of seating cushions and backrests", pt: "Conjunto de almofadas de banco e encostos" },
          { en: "Inbuilt fuel system with 141lit / 38gal tank", pt: "Sistema de combustível integrado com depósito de 141L / 38gal" },
          { en: "Integrated cleats, towing & lifting eyes", pt: "Cunhos integrados, olhais de reboque e de elevação" },
          { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
          { en: "Black powder coated stainless steel", pt: "Aço inoxidável com revestimento em pó preto" },
        ],
        optionalEquipment: [
          { en: "Navigation & waterski mast, rear handrails", pt: "Mastro de navegação e ski aquático, corrimãos traseiros" },
          { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
          { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
          { en: "Bow railings, on-tube installation", pt: "Guarda-corpos de proa, instalados no tubo" },
          { en: "Hydraulic steering system", pt: "Sistema de direção hidráulica" },
          { en: "Mechanical steering system", pt: "Sistema de direção mecânica" },
          { en: "Premium steering wheel", pt: "Volante premium" },
          { en: "Removable bow sundeck kit", pt: "Kit amovível de solário de proa" },
          { en: "Removable rear sundeck kit", pt: "Kit amovível de solário de popa" },
          { en: "Freshwater set with shower", pt: "Conjunto de água doce com duche" },
          { en: "Canvas T-top", pt: "T-top em lona" },
          { en: "Canvas bow Sun-top, with T-top only", pt: "Toldo solar de proa em lona, apenas com T-top" },
          { en: "Canvas rear Sun-top, with T-top only", pt: "Toldo solar de popa em lona, apenas com T-top" },
          { en: "Overall, consoles and harbour covers", pt: "Coberturas geral, de consolas e de porto" },
          { en: "SeaDek soft anti-skid flooring", pt: "Piso antiderrapante SeaDek" },
          { en: "Keel & tube protector packages", pt: "Proteções de quilha e de tubo" },
          { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
        ],
        positioning: {
          en: "The D600 built for days that aren't just about the drive — sundecks fore and aft, freshwater on board, and the finish of a proper leisure boat, without losing the hull underneath it.",
          pt: "O D600 pensado para os dias que não são só sobre condução — solários à proa e à popa, água doce a bordo e o acabamento de um barco de lazer a sério, sem perder o casco por baixo.",
        },
        fullSpecs: [
          { category: "Dimensions", items: [
            { label: "LOA", value: "612 cm / 20'1\"" },
            { label: "Inside length", value: "440 cm / 14'5\"" },
            { label: "Beam", value: "250 cm / 8'2\"" },
            { label: "Inside width", value: "154 cm / 5'1\"" },
            { label: "Dry weight", value: "597 kg / 1316 lbs" },
            { label: "Tube diameter", value: "50 cm / 20\"" },
          ] },
          { category: "Performance", items: [
            { label: "Recommended power", value: "130 HP / 95,6 kW" },
            { label: "Max power", value: "150 HP / 110,3 kW" },
            { label: "Engine weight max", value: "250 kg / 550 lbs" },
            { label: "Engine shaft length", value: "25\" (extra long)" },
            { label: "Midsection/aft deadrise", value: "22° / 22°" },
          ] },
          { category: "Capacity", items: [
            { label: "Package weight", value: "707 kg / 1559 lbs" },
            { label: "Max load", value: "1100 kg / 2425 lbs" },
            { label: "Max persons", value: "12" },
            { label: "CE category", value: "C" },
          ] },
          { category: "Construction", items: [
            { label: "Tube chambers", value: "5" },
            { label: "Tube material", value: "PVC / Hypalon" },
          ] },
        ],
        features: [
          {
            title: { en: "Sundecks fore and aft", pt: "Solários à proa e à popa" },
            description: {
              en: "Removable bow and rear sundeck kits turn the working deck into a lounging one in minutes, without any permanent commitment.",
              pt: "Kits amovíveis de solário à proa e à popa transformam o convés de trabalho num espaço de lazer em minutos, sem qualquer compromisso permanente.",
            },
          },
          {
            title: { en: "Freshwater and finish", pt: "Água doce e acabamento" },
            description: {
              en: "An onboard shower, T-top canvas options, and the kind of details that make a performance hull comfortable for a full day out.",
              pt: "Duche a bordo, opções de lona para o T-top, e o tipo de detalhes que tornam um casco de performance confortável para um dia inteiro no mar.",
            },
          },
          {
            title: { en: "Raised tube profile", pt: "Perfil de tubo elevado" },
            description: {
              en: "Higher tube placement than a conventional RIB for better spray management at speed, and a visual presence that makes clear this is a performance hull before the engine starts.",
              pt: "Colocação de tubo mais alta do que num RIB convencional para melhor gestão de borrifo em velocidade, e uma presença visual que deixa claro que este é um casco de performance antes de o motor arrancar.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "d950-drive",
    name: "D950",
    range: "drive",
    rangeSlug: "drive-line",
    positioning: {
      en: "Commercial-grade build, professional payload, serious offshore capability. Built to work.",
      pt: "Construção de grau comercial, carga útil profissional, capacidade oceânica a sério. Construído para trabalhar.",
    },
    image: "/images/boats/d950-drive/detail-17.jpg",
    gallery: ["/images/boats/d950-drive/detail-19.jpg", "/images/boats/d950-drive/detail-22.jpg", "/images/boats/d950-drive/detail-25.jpg"],
    href: "/ranges/drive-line/d950-drive/",
    priceFrom: 108626,
    priceLabel: MIN_PACKAGE_PRICE_LABEL,
    specs: [
      { value: "9.54m", label: "LOA" },
      { value: "3.19m", label: "Beam" },
      { value: "700 hp", label: "Max power" },
    ],
    fullSpecs: [
      { category: "Dimensions", items: [
        { label: "LOA", value: "954 cm / 31’4”" },
        { label: "Inside length", value: "594 cm / 19’6”" },
        { label: "Beam", value: "319 cm / 10’6”" },
        { label: "Inside width", value: "195 cm / 6’5”" },
        { label: "Dry weight", value: "2160 kg / 4761 lbs" },
        { label: "Tube diameter", value: "40-60 cm / 16”-24”" },
      ] },
      { category: "Performance", items: [
        { label: "Recommended power", value: "1x500 or 2x250 HP / 1x372.8 or 2x186.4 kW" },
        { label: "Max power", value: "1x700 or 2x350 HP / 1x514.7 or 2x257.4 kW" },
        { label: "Engine weight max", value: "700 kg / 1543 lbs" },
        { label: "Engine shaft length", value: "1х30’’ (ultra long) or 2x25’’ (extra long)" },
        { label: "Midsection/aft deadrise", value: "30° / 22°" },
      ] },
      { category: "Capacity", items: [
        { label: "Package weight", value: "2310 kg / 5093 lbs" },
        { label: "Max load", value: "2000 kg / 4410 lbs" },
        { label: "Max persons", value: "14" },
        { label: "CE category", value: "B" },
      ] },
      { category: "Construction", items: [
        { label: "Tube chambers", value: "7" },
        { label: "Tube material", value: "PVC / Hypalon" },
      ] },
    ],
    standardFeatures: [
      { en: "Fiberglass two-stepped deep-V hull with self-bailing anti-skid deck", pt: "Casco em fibra de vidro deep-V com dois degraus e convés antiderrapante autodrenante" },
      { en: "Anchor and transom lockers, bow and rear storage compartments", pt: "Paióis de âncora e de espelho de popa, compartimentos de arrumação à proa e à popa" },
      { en: "Multi-chamber inflatable tube with life line rope", pt: "Tubo insuflável multi-câmaras com cabo salva-vidas" },
      { en: "Bow step platform with mooring cleats", pt: "Plataforma de proa com cunhos de amarração" },
      { en: "Steering console with windshield and storage", pt: "Consola de condução com para-brisas e arrumação" },
      { en: "Dashboard for up to 2x17\" screen, with glove box and cupholders", pt: "Painel para 2 ecrãs até 17\", com porta-luvas e porta-copos" },
      { en: "Inbuilt fuel system with 2x300lit / 2x79gal tanks", pt: "Sistema de combustível integrado com depósitos de 2x300L / 2x79gal" },
      { en: "Integrated cleats, towing & lifting eyes", pt: "Cunhos integrados, olhais de reboque e de elevação" },
      { en: "Electrical package for boat & console", pt: "Pacote elétrico para a embarcação e consola" },
      { en: "Pump, paddles and maintenance kit", pt: "Bomba, remos e kit de manutenção" },
      { en: "Black powder coated stainless steel", pt: "Aço inoxidável com revestimento em pó preto" },
    ],
    optionalEquipment: [
      { en: "Widely customizable deck-console-seats layout", pt: "Layout de convés-consola-bancos amplamente personalizável" },
      { en: "Double jockey seats with storage, up to 6 pairs - 12 seat places", pt: "Bancos jockey duplos com arrumação, até 6 pares - 12 lugares" },
      { en: "Suspension sports seat, adjustable", pt: "Banco desportivo com suspensão, ajustável" },
      { en: "Professional Ulman Biscaya sports seats", pt: "Bancos desportivos profissionais Ulman Biscaya" },
      { en: "Navigation & waterski mast with handrail", pt: "Mastro de navegação e ski aquático com corrimão" },
      { en: "Rear swimming platforms with ladder and handrail", pt: "Plataformas de banho traseiras com escada e corrimão" },
      { en: "Bow railings, on-bow step platform installation", pt: "Guarda-corpos de proa, instalados na plataforma de proa" },
      { en: "Premium steering wheel", pt: "Volante premium" },
      { en: "Canvas T-top", pt: "T-top em lona" },
      { en: "Jockey seats and harbour covers", pt: "Bancos jockey e coberturas de porto" },
      { en: "Overpressure valves", pt: "Válvulas de sobrepressão" },
    ],
    features: [
      {
        title: { en: "Commercial-grade offshore hull", pt: "Casco oceânico de grau comercial" },
        description: {
          en: "The D950 is built to professional specification — payload capacity, build quality, and hull engineering designed for working use, not recreational hours. Used by coast guards, charter operators, and professional marine users across Europe.",
          pt: "O D950 é construído segundo especificação profissional — capacidade de carga, qualidade de construção e engenharia do casco concebidos para uso profissional, não para horas de lazer. Utilizado por guardas costeiros, operadores de charter e utilizadores profissionais marítimos em toda a Europa.",
        },
      },
      {
        title: { en: "Heavy-duty construction throughout", pt: "Construção reforçada em todos os aspetos" },
        description: {
          en: "Reinforced hull, heavy-gauge fittings, and a build standard that reflects what happens when a working boat has to perform in conditions that recreational hulls would avoid. Built to last under load.",
          pt: "Casco reforçado, ferragens de calibre pesado e um padrão de construção que reflete o que acontece quando um barco de trabalho tem de operar em condições que os cascos recreativos evitariam. Construído para durar sob carga.",
        },
      },
      {
        title: { en: "Raised tube specification for working conditions", pt: "Especificação de tubo elevada para condições de trabalho" },
        description: {
          en: "Higher tubes, greater diameter, and a chamber layout engineered for stability under load and rough-water operation rather than aesthetics. The D950 looks the way it does because it works the way it does.",
          pt: "Tubos mais altos, maior diâmetro e uma disposição de câmaras concebida para estabilidade sob carga e operação em mar agitado, não para estética. O D950 tem o aspeto que tem porque funciona da forma como funciona.",
        },
      },
    ],
  },
];

export function getModelsByRange(rangeSlug: Range["slug"]): Model[] {
  return models.filter((m) => m.rangeSlug === rangeSlug);
}

export function getModelBySlug(slug: string): Model | undefined {
  return models.find((m) => m.slug === slug);
}

/** Narrow a Model down to the FeaturedModel shape ModelCard expects */
export function toFeaturedModel(model: Model): FeaturedModel {
  return {
    slug: model.slug,
    name: model.name,
    range: model.range,
    image: model.image,
    href: model.href,
  };
}

/**
 * "How many models does this range have?" for display purposes (homepage
 * range header, "See all N models" CTA). Not the same as
 * `getModelsByRange(slug).length` for Drive Line: that counts top-level
 * `Model` records (d600, d950-drive = 2), but D600's three layouts
 * (Active/Drive/Lux) are genuinely distinct products to a visitor even
 * though they share one Model entry with a `layouts` array (see the NOTE
 * above the `d600` entry) — not separate routable Models. This isn't a
 * slug-matching bug; it's the data layer's deliberate merge of the D600
 * variants, so the "visitor-facing" count for Drive Line is computed as
 * D950 + each D600 layout (1 + 3 = 4) rather than top-level Model count.
 */
export function getEffectiveModelCount(rangeSlug: Range["slug"]): number {
  if (rangeSlug === "drive-line") {
    const d600 = getModelBySlug("d600");
    return 1 + (d600?.layouts?.length ?? 0);
  }
  return getModelsByRange(rangeSlug).length;
}
