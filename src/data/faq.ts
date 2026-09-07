import type { LocalizedText } from "./localized-text";

// Brand-agnostic RHIB/RIB questions, not Grand-specific ones — this page's
// job is to catch people who've started researching rigid inflatable boats
// generally (any brand, anywhere in Portugal) before they've decided who
// to buy from, and give them enough of a straight answer that Grand Boats
// Portugal is the obvious next click. Keep answers genuinely useful even
// to someone who ends up buying elsewhere.
export type FaqEntry = { question: LocalizedText; answer: LocalizedText };

export const faq: FaqEntry[] = [
  {
    question: {
      en: "What is a RHIB?",
      pt: "O que é um RHIB?",
    },
    answer: {
      en: "RHIB stands for rigid-hulled inflatable boat — a boat with a solid fiberglass hull and inflatable tubes running around the sides. The rigid hull gives it real seakeeping ability, while the tubes add stability, buoyancy, and a forgiving fender against docks and other boats. It's the same idea as a RIB (rigid inflatable boat) — the two terms are used interchangeably.",
      pt: "RHIB é a sigla para rigid-hulled inflatable boat — um barco com casco rígido em fibra de vidro e tubos insufláveis ao longo dos lados. O casco rígido garante um comportamento sério no mar, enquanto os tubos acrescentam estabilidade, flutuabilidade e uma proteção natural contra pancadas em cais ou noutras embarcações. É a mesma ideia de um RIB (rigid inflatable boat) — os dois termos são usados de forma indiferenciada.",
    },
  },
  {
    question: {
      en: "What's the difference between a RHIB and a regular inflatable boat?",
      pt: "Qual é a diferença entre um RHIB e um insuflável comum?",
    },
    answer: {
      en: "A regular inflatable (a 'soft-bottom' boat) has a flexible floor and no rigid hull — light and packable, but limited in rough water and top speed. A RHIB's fiberglass hull lets it plane properly, handle chop with confidence, and take a real outboard engine. If you want a boat that performs, not just floats, the rigid hull is what makes the difference.",
      pt: "Um insuflável comum (de 'fundo mole') tem um piso flexível e nenhum casco rígido — leve e fácil de arrumar, mas limitado em mar picado e em velocidade máxima. O casco em fibra de vidro de um RHIB permite planar como deve ser, aguentar ondulação com confiança e usar um motor fora de borda a sério. Se quer um barco com desempenho, e não apenas que flutue, o casco rígido é que faz a diferença.",
    },
  },
  {
    question: {
      en: "Do I need a boating licence to operate a RHIB in Portugal?",
      pt: "Preciso de carta para conduzir um RHIB em Portugal?",
    },
    answer: {
      en: "It depends on the boat's engine power and length under Portuguese maritime law — some smaller, lower-powered RHIBs can be operated without a licence, while most larger models require a Carta de Navegador de Recreio. The rules vary by configuration, so it's worth checking before you settle on a size. Get in touch and we'll walk you through what applies to the model you're considering.",
      pt: "Depende da potência do motor e do comprimento da embarcação, segundo a lei marítima portuguesa — alguns RHIBs mais pequenos e com menos potência podem ser conduzidos sem carta, enquanto a maioria dos modelos maiores exige uma Carta de Navegador de Recreio. As regras variam consoante a configuração, por isso vale a pena confirmar antes de decidir o tamanho. Contacte-nos e explicamos o que se aplica ao modelo que está a considerar.",
    },
  },
  {
    question: {
      en: "How much does a RHIB cost in Portugal?",
      pt: "Quanto custa um RHIB em Portugal?",
    },
    answer: {
      en: "Prices vary hugely by size and specification — a compact Silver Line tender starts under €10,000, while a flagship Golden Line cruiser with twin engines runs well into six figures. See our Golden Line, Silver Line and Drive Line ranges for real starting prices on every model, or get in touch and we'll help you find the right boat for your budget.",
      pt: "Os preços variam muito consoante o tamanho e a especificação — um tender compacto da Silver Line começa por menos de 10.000 €, enquanto um cruzeiro topo de gama da Golden Line com dois motores ultrapassa facilmente os seis dígitos. Consulte as nossas gamas Golden Line, Silver Line e Drive Line para ver os preços reais de cada modelo, ou contacte-nos e ajudamos a encontrar o barco certo para o seu orçamento.",
    },
  },
  {
    question: {
      en: "Hypalon or PVC tubes — which is better?",
      pt: "Tubos em Hypalon ou PVC — qual é melhor?",
    },
    answer: {
      en: "Hypalon holds up better against UV, salt and abrasion over the long term, which is why it's the standard on every Grand tube — PVC is lighter and cheaper but ages faster under full Mediterranean and Atlantic sun. If you're keeping the boat outdoors year-round, Hypalon is worth the difference.",
      pt: "O Hypalon aguenta melhor a exposição aos raios UV, ao sal e à abrasão a longo prazo, e é por isso que é o material padrão em todos os tubos Grand — o PVC é mais leve e mais barato, mas envelhece mais depressa com sol mediterrânico e atlântico o ano inteiro. Se guarda o barco ao ar livre durante todo o ano, o Hypalon compensa a diferença.",
    },
  },
  {
    question: {
      en: "Can you deliver a RHIB anywhere in Portugal, or only the Algarve?",
      pt: "Entregam um RHIB em qualquer ponto de Portugal, ou só no Algarve?",
    },
    answer: {
      en: "Anywhere in Portugal. We're based at Marina de Lagos, but we regularly deliver to owners in Lisbon, Porto, Cascais, Vilamoura, Setúbal and beyond — wherever you keep your boat.",
      pt: "Em qualquer ponto do país. Estamos sediados na Marina de Lagos, mas entregamos regularmente a proprietários em Lisboa, Porto, Cascais, Vilamoura, Setúbal e mais além — onde quer que guarde o seu barco.",
    },
  },
  {
    question: {
      en: "Should I buy a new or a used RHIB?",
      pt: "Devo comprar um RHIB novo ou usado?",
    },
    answer: {
      en: "A new RHIB comes with a full warranty and exactly the specification you want, with a lead time to build. A used one is available immediately and can be significantly cheaper, but the tubes, hull and engine hours need a proper inspection. We list both — see our current stock of new and used Grand boats for sale.",
      pt: "Um RHIB novo tem garantia completa e exatamente a especificação que pretende, com um prazo de construção. Um usado está disponível de imediato e pode ser significativamente mais barato, mas os tubos, o casco e as horas de motor precisam de uma inspeção séria. Anunciamos os dois — veja o nosso stock atual de barcos Grand novos e usados à venda.",
    },
  },
  {
    question: {
      en: "What size RHIB do I actually need?",
      pt: "De que tamanho de RHIB preciso, na prática?",
    },
    answer: {
      en: "It depends on how you'll use it. Under 4 metres suits a yacht tender or a first boat for calm water; 4–6 metres is the sweet spot for a genuine day boat that still tows easily; above 7 metres starts to behave like a real cruiser, with overnight capability on the larger Golden Line hulls. Tell us how you plan to use it and we'll point you at the right range.",
      pt: "Depende de como o vai usar. Menos de 4 metros é adequado para um tender de iate ou um primeiro barco em águas calmas; entre 4 e 6 metros é o ponto ideal para uma embarcação de dia a sério que ainda é fácil de rebocar; acima de 7 metros já se comporta como um verdadeiro cruzeiro, com capacidade para pernoitar nos cascos maiores da Golden Line. Diga-nos como pretende utilizá-lo e indicamos a gama certa.",
    },
  },
];
