import type { Model } from "@/app/golden-data"

const POA_LABEL = "Built to order · price on application"

/**
 * Drive Line line-up — the full 4-model performance range. Specs are the
 * manufacturer's published figures (overall length, overall width, max power,
 * passenger capacity). Grand builds to order, so no list price is published;
 * cards show "price on application".
 */
export const driveModels: Model[] = [
  {
    range: "drive",
    modelName: "D600 Active",
    heroImage: "/boats/D600ACTIVE.png",
    positioning:
      "Daring and dashing — a high-performance hull with suspension sports seats.",
    specs: [
      { value: "6.12 m", label: "LOA" },
      { value: "2.50 m", label: "Beam" },
      { value: "150 hp", label: "Max" },
      { value: "12", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "drive",
    modelName: "D600 Drive",
    heroImage: "/boats/D600DRIVE.png",
    positioning:
      "Adaptable and functional — a customizable RIB for commercial use.",
    specs: [
      { value: "6.12 m", label: "LOA" },
      { value: "2.50 m", label: "Beam" },
      { value: "150 hp", label: "Max" },
      { value: "12", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "drive",
    modelName: "D600 Lux",
    heroImage: "/boats/D600LUX.png",
    positioning:
      "Dynamic and luxurious — leisure cruising blended with thrilling speed.",
    specs: [
      { value: "6.12 m", label: "LOA" },
      { value: "2.50 m", label: "Beam" },
      { value: "150 hp", label: "Max" },
      { value: "12", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
  {
    range: "drive",
    modelName: "D950 Drive",
    heroImage: "/boats/D950DRIVE.png",
    positioning:
      "Big and pro — a professional offshore speed boat with twin-outboard option.",
    specs: [
      { value: "9.54 m", label: "LOA" },
      { value: "3.19 m", label: "Beam" },
      { value: "700 hp", label: "Max" },
      { value: "14", label: "Persons" },
    ],
    priceLabel: POA_LABEL,
  },
]
