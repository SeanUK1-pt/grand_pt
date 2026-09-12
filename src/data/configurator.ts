import type { LocalizedText } from "./localized-text";

// Grand's own 3D Configurator lives on grandboats.com, not on this site —
// this is a promo section that hands visitors off to it. Per Grand: any
// configuration where the customer selects Portugal as their dealer is
// emailed to Algarve Boat Group directly, so this doesn't need its own
// lead-capture or query-param wiring on our end (decodeBuilderLink.ts
// already exists for the day a deep-link-back integration is agreed).
export const CONFIGURATOR_URL = "https://grandboats.com/en/info/3D-8";

export const configuratorPromo = {
  eyebrow: {
    en: "Build Your Boat",
    pt: "Construa o Seu Barco",
  } satisfies LocalizedText,
  heading: {
    en: "Configure your Grand, in 3D",
    pt: "Configure o seu Grand, em 3D",
  } satisfies LocalizedText,
  body: {
    en: "Choose your layout, colours and equipment, and see every change in real time on Grand's own 3D Configurator. Select Portugal as your dealer and your configuration comes straight to us.",
    pt: "Escolha o layout, as cores e o equipamento, e veja cada alteração em tempo real no Configurador 3D da Grand. Selecione Portugal como o seu representante e a sua configuração chega diretamente até nós.",
  } satisfies LocalizedText,
  cta: {
    en: "Open the 3D Configurator →",
    pt: "Abrir o Configurador 3D →",
  } satisfies LocalizedText,
};
