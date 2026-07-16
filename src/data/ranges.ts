import type { LocalizedText } from "./localized-text";

export type RangeAccent = "golden" | "silver" | "drive";

export type Range = {
  slug: "golden-line" | "silver-line" | "drive-line";
  accent: RangeAccent;
  name: string;
  tagline: LocalizedText;
  voiceLine: LocalizedText;
  philosophy: LocalizedText;
};

export const ranges: Range[] = [
  {
    slug: "golden-line",
    accent: "golden",
    name: "Golden Line",
    tagline: {
      en: "Premium liveaboard flagship — the top of the range.",
      pt: "A embarcação insignia premium — o topo da gama.",
    },
    voiceLine: {
      en: "Built to be lived aboard.",
      pt: "Construída para se viver a bordo.",
    },
    philosophy: {
      en: "The Golden Line is built for days that earn their place in memory — long runs to empty beaches, anchoring in a cove, swimming off the back, arriving somewhere worth arriving. These are boats that fit a life on the water, not just a marina berth. The smaller models make exceptional tenders for larger vessels; the bigger hulls are genuinely capable cruisers with the fit and finish to match. Every one is hand-laid in Grand's Ukrainian yard, and it shows in the detail — the way the console sits, the quality of the upholstery, the finish on the tubes.",
      pt: "A Golden Line é construída para dias que ficam na memória — longas saídas para praias desertas, fundear numa enseada, nadar pela popa fora, chegar a sítios que merecem a viagem. São embarcações que se encaixam numa vida no mar, não apenas num lugar de marina. Os modelos mais pequenos são tenders excecionais para embarcações maiores; os cascos maiores são cruzeiros genuinamente capazes, com o acabamento e a qualidade que o preço justifica. Cada um é laminado à mão no estaleiro da Grand na Ucrânia, e isso nota-se nos detalhes — na forma como a consola assenta, na qualidade da estofagem, no acabamento dos tubos.",
    },
  },
  {
    slug: "silver-line",
    accent: "silver",
    name: "Silver Line",
    tagline: {
      en: "Approachable family and day-boat range — clean and calm.",
      pt: "Gama familiar e de passeio acessível — limpa e equilibrada.",
    },
    voiceLine: {
      en: "The boat that says yes to a normal Tuesday.",
      pt: "O barco que diz sim a uma terça-feira normal.",
    },
    philosophy: {
      en: "The Silver Line does one thing without compromise: gets you to and from your yacht cleanly, reliably, and with enough style that you don't have to apologise for it. These are serious tenders — built to handle real coastal conditions, carry a full load of passengers and bags, and sit well on davits or a swim platform. We sell them as working auxiliaries, and they perform like it. Simple, proven, well-made.",
      pt: "A Silver Line faz uma coisa sem compromisso: leva-o de e para o seu iate de forma limpa, fiável e com estilo suficiente para não ter de se desculpar por isso. São tenders a sério — construídos para lidar com condições costeiras reais, transportar uma carga completa de passageiros e bagagem, e assentar bem em davits ou plataformas de banho. Vendemo-los como auxiliares de trabalho, e é assim que funcionam. Simples, comprovados, bem construídos.",
    },
  },
  {
    slug: "drive-line",
    accent: "drive",
    name: "Drive Line",
    tagline: {
      en: "Fastest performance hulls — the loudest of the three.",
      pt: "Os cascos de performance mais rápidos — os mais expressivos dos três.",
    },
    voiceLine: {
      en: "Deep-V, raised tube, no apology.",
      pt: "Deep-V, tubo elevado, sem desculpas.",
    },
    philosophy: {
      en: "The Drive Line is Grand's most practical range — cleverly laid out, honestly priced, built for people who use their boats rather than admire them. The three D600 layouts cover different use cases on the same proven deep-V hull: the Active and Drive configurations are straightforward and capable, while the Lux brings a genuine lifestyle element without losing the performance underneath. The D950 is in a different category — a commercial-grade hull used by professionals, with the build quality and payload capacity to match.",
      pt: "A Drive Line é a gama mais prática da Grand — bem concebida, com preço honesto, construída para quem usa os seus barcos em vez de os admirar. Os três layouts do D600 cobrem diferentes utilizações no mesmo casco deep-V comprovado: as configurações Active e Drive são diretas e capazes, enquanto o Lux traz um elemento lifestyle genuíno sem perder a performance por baixo. O D950 está numa categoria diferente — um casco de grau comercial usado por profissionais, com a qualidade de construção e capacidade de carga correspondentes.",
    },
  },
];

export function getRangeBySlug(slug: Range["slug"]): Range | undefined {
  return ranges.find((r) => r.slug === slug);
}
