export type Swatch = {
  name: string
  hex: string
  role: string
  /** text color to use ON this swatch for legibility */
  on: string
}

export type RangeAccent = {
  range: "Golden Line" | "Silver Line" | "Drive Line"
  tag: string
  swatch: Swatch
  rationale: string
}

export type Direction = {
  id: string
  name: string
  baseType: string
  recommended: boolean
  summary: string
  rationale: string
  /** primary page background for previews */
  pageBg: string
  /** surface/card color sitting on the page bg */
  surface: string
  /** hairline border color */
  hairline: string
  /** main text color on the base */
  textOn: string
  /** muted text color on the base */
  mutedOn: string
  neutrals: Swatch[]
  accents: RangeAccent[]
}

export const directions: Direction[] = [
  {
    id: "slipstream",
    name: "Slipstream",
    baseType: "Dark ink base",
    recommended: true,
    summary: "A deep blue-black hull tone — premium and a little fast.",
    rationale:
      "A dark, slightly-blue ink base reads as confident performance (closer to a premium sports car configurator than a spec sheet) and lets bright on-water photography snap forward instead of competing with the chrome. It sidesteps the navy-and-gold yacht cliché because the navy here is a near-black structural neutral, not a decorative statement — the energy comes from the three sunlit accents on top of it.",
    pageBg: "#0E1822",
    surface: "#16232F",
    hairline: "#2C3D4C",
    textOn: "#F1F5F8",
    mutedOn: "#93A4B2",
    neutrals: [
      { name: "Ink Base", hex: "#0E1822", role: "Page background", on: "#F1F5F8" },
      { name: "Hull", hex: "#16232F", role: "Surface / cards", on: "#F1F5F8" },
      { name: "Deck", hex: "#20303E", role: "Raised surface", on: "#F1F5F8" },
      { name: "Hairline", hex: "#2C3D4C", role: "Borders / dividers", on: "#F1F5F8" },
      { name: "Spray", hex: "#93A4B2", role: "Muted text", on: "#0E1822" },
      { name: "Salt White", hex: "#F1F5F8", role: "Primary text", on: "#0E1822" },
    ],
    accents: [
      {
        range: "Golden Line",
        tag: "Flagship · cabins · premium finish",
        swatch: { name: "Molten Amber", hex: "#F2A33C", role: "Golden Line accent", on: "#1A1206" },
        rationale:
          "A molten, sunset amber rather than metallic champagne gold — it keeps the warmth and prestige the name promises without tipping into yacht-cliché. Warm and inviting, it suits the most comfortable, liveaboard end of the range.",
      },
      {
        range: "Silver Line",
        tag: "Practical · tenders · family use",
        swatch: { name: "Spray Aqua", hex: "#34C2CC", role: "Silver Line accent", on: "#04242A" },
        rationale:
          "A cool, clean spray-aqua stands in for 'silver': calm, fresh and trustworthy, the most neutral and approachable of the three. It feels like clear water and everyday usability — right for the value, family-first boats.",
      },
      {
        range: "Drive Line",
        tag: "Performance · deep-V · fastest",
        swatch: { name: "Slipstream Coral", hex: "#FF5638", role: "Drive Line accent", on: "#2A0A03" },
        rationale:
          "A high-energy red-coral is the universal language of speed and motorsport. It is the loudest of the three on purpose — it flags the newest, fastest, most adrenaline-driven hulls.",
      },
    ],
  },
  {
    id: "coastline",
    name: "Coastline",
    baseType: "Light coastal base",
    recommended: false,
    summary: "A cool off-white base — airy, approachable, lifestyle-led.",
    rationale:
      "A soft, slightly-cool off-white (not cream) base feels fresh, outdoorsy and easy to trust — closer to a high-end outdoor/lifestyle brand than a luxury vault. It maximises everyday readability and lets deep ink type carry the hierarchy. The accents are pushed a little deeper and more jewel-toned here so they hold contrast and seriousness against the light field.",
    pageBg: "#F5F7F6",
    surface: "#FFFFFF",
    hairline: "#DEE3E2",
    textOn: "#14202A",
    mutedOn: "#5C6E7A",
    neutrals: [
      { name: "Paper", hex: "#F5F7F6", role: "Page background", on: "#14202A" },
      { name: "Card", hex: "#FFFFFF", role: "Surface / cards", on: "#14202A" },
      { name: "Mist", hex: "#ECEFEE", role: "Subtle surface", on: "#14202A" },
      { name: "Hairline", hex: "#DEE3E2", role: "Borders / dividers", on: "#14202A" },
      { name: "Slate", hex: "#5C6E7A", role: "Muted text", on: "#FFFFFF" },
      { name: "Ink", hex: "#14202A", role: "Primary text", on: "#FFFFFF" },
    ],
    accents: [
      {
        range: "Golden Line",
        tag: "Flagship · cabins · premium finish",
        swatch: { name: "Brass Ochre", hex: "#BE7A12", role: "Golden Line accent", on: "#FFF6E6" },
        rationale:
          "A deep brass-ochre gives the flagship range warmth and richness while staying legible on a light field. It nods to premium finish and gold without the thin, shiny champagne look.",
      },
      {
        range: "Silver Line",
        tag: "Practical · tenders · family use",
        swatch: { name: "Deep Marine", hex: "#0B8E9B", role: "Silver Line accent", on: "#E6FBFD" },
        rationale:
          "A deep marine teal is the calm, dependable middle of the family — cool and water-like, but grounded enough to read as the sensible, practical choice on a bright page.",
      },
      {
        range: "Drive Line",
        tag: "Performance · deep-V · fastest",
        swatch: { name: "Signal Red", hex: "#DC3320", role: "Drive Line accent", on: "#FFEDEA" },
        rationale:
          "A saturated signal-red carries clear motorsport energy and pops hardest against the off-white, marking the sport range as the fastest and most assertive line.",
      },
    ],
  },
]
