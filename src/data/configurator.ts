import type { LocalizedText } from "./localized-text";

// The 3D configurator runs on this site (src/app/[locale]/configurator, fed by
// scripts/sync-3d.mjs from Grand's own scenes and data), with our own
// interface and a configuration-aware enquiry form. CONFIGURATOR_URL is Grand's
// original, kept only as a fallback link if the synced copy is unavailable.
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
    en: "Choose your colours and equipment and see every change in real time on Grand's 3D Configurator. When you're happy, send us your configuration and we'll take it from there.",
    pt: "Escolha as cores e o equipamento e veja cada alteração em tempo real no Configurador 3D da Grand. Quando estiver satisfeito, envie-nos a sua configuração e tratamos do resto.",
  } satisfies LocalizedText,
  cta: {
    en: "Open the 3D Configurator →",
    pt: "Abrir o Configurador 3D →",
  } satisfies LocalizedText,
};
