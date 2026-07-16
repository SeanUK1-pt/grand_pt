import type { Model } from "@/app/golden-data"

const POA_LABEL = "Built to order · price on application"

/**
 * Silver Line line-up — the full 6-model range of practical dinghies and
 * day-boat RIBs. Specs are the manufacturer's published figures (overall
 * length, overall width, max power, passenger capacity). Grand builds to
 * order, so no list price is published; cards show "price on application".
 */
export const silverModels: Model[] = [
  {
    range: "silver",
    modelName: "S275",
    heroImage: "/boats/S275.png",
    positioning:
      "Open and tiny — a simple, low-maintenance classic sailboat tender.",
    specs: [
      { value: "2.75 m", label: "LOA" },
      { value: "1.55 m", label: "Beam" },
      { value: "10 hp", label: "Max" },
      { value: "3", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "silver",
    modelName: "S300",
    heroImage: "/boats/S300.png",
    positioning:
      "Slender and compact — a lightweight four-person tender to travel light.",
    specs: [
      { value: "3.00 m", label: "LOA" },
      { value: "1.67 m", label: "Beam" },
      { value: "15 hp", label: "Max" },
      { value: "4", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "silver",
    modelName: "S330",
    heroImage: "/boats/S330.png",
    positioning:
      "Small and handy — a lightweight, cost-effective dinghy to rely on.",
    specs: [
      { value: "3.30 m", label: "LOA" },
      { value: "1.69 m", label: "Beam" },
      { value: "25 hp", label: "Max" },
      { value: "4", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "silver",
    modelName: "S370N",
    heroImage: "/boats/S370N.png",
    positioning:
      "Light and portable — a practical tender and capable little rider.",
    specs: [
      { value: "3.70 m", label: "LOA" },
      { value: "1.85 m", label: "Beam" },
      { value: "30 hp", label: "Max" },
      { value: "5", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "silver",
    modelName: "S420N",
    heroImage: "/boats/S420N.png",
    positioning:
      "Rational and flexible — a multipurpose RIB for everyday use.",
    specs: [
      { value: "4.20 m", label: "LOA" },
      { value: "1.95 m", label: "Beam" },
      { value: "50 hp", label: "Max" },
      { value: "8", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "silver",
    modelName: "S470N",
    heroImage: "/boats/S470N.png",
    positioning:
      "Economic and versatile — a practical RIB suited to many uses.",
    specs: [
      { value: "4.70 m", label: "LOA" },
      { value: "2.05 m", label: "Beam" },
      { value: "70 hp", label: "Max" },
      { value: "8", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
]
