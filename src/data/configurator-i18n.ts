// Portuguese for the strings that come from Grand's 3D configurator data
// (colour names, equipment names, section headings). The feed is English only,
// so this is a closed-vocabulary lookup keyed by the exact English text —
// anything missing falls back to the English original rather than breaking.
// Coverage is enforced by src/data/configurator-i18n.test.ts against every
// string in the synced feed, so a new option from Grand shows up as a failing
// test instead of a silent English gap.

const PT: Record<string, string> = {
  "Tube": "Tubos",
  "Tube Color": "Cor dos tubos",
  "Tube Decor": "Decoração dos tubos",
  "Fiberglass": "Fibra de vidro",
  "Gelcoat": "Gelcoat",
  "Hard-top": "Hard-top",
  "Dashboard": "Painel",
  "Upholstery": "Estofos",
  "Other colors": "Outras cores",
  "Metal": "Metal",
  "SeaDek": "SeaDek",
  "Arctic Gray": "Cinzento Ártico",
  "Black": "Preto",
  "Black Carbon": "Preto Carbono",
  "Black FI": "Preto FI",
  "Black pow. coated": "Preto, pintura em pó",
  "Cerulean": "Cerúleo",
  "Dark-gray": "Cinzento-escuro",
  "Graphite": "Grafite",
  "Gray": "Cinzento",
  "Ice": "Gelo",
  "Ice White": "Branco Gelo",
  "Light-gray": "Cinzento-claro",
  "Lime": "Lima",
  "Macadamia": "Macadâmia",
  "Mandarin": "Tangerina",
  "Metallic": "Metalizado",
  "Mil. Gray Carbon": "Cinzento Militar Carbono",
  "Military Gray": "Cinzento Militar",
  "Military Gray FI": "Cinzento Militar FI",
  "Off-White": "Off-White",
  "Plata": "Prata",
  "Red": "Vermelho",
  "Regular polished": "Polido normal",
  "Taupe": "Taupe",
  "White": "Branco",
  "Whie": "Branco",
  "White Carbon": "Branco Carbono",
  "Wine": "Vinho",
  "Black / Black": "Preto / Preto",
  "Black / Cerulean": "Preto / Cerúleo",
  "Black / Graphite": "Preto / Grafite",
  "Black / Gray": "Preto / Cinzento",
  "Black / Lime": "Preto / Lima",
  "Black / Mandarin": "Preto / Tangerina",
  "Black / Wine": "Preto / Vinho",
  "Graphite / Macadamia": "Grafite / Macadâmia",
  "Graphite / Plata": "Grafite / Prata",
  "Graphite / Taupe": "Grafite / Taupe",
  "Gray / Black": "Cinzento / Preto",
  "Mocha / Black": "Moca / Preto",
  "Maglia Acai": "Maglia Acai",
  "Maglia Armory": "Maglia Armory",
  "Maglia Grizzly": "Maglia Grizzly",
  "Maglia Kyanite": "Maglia Kyanite",
  "Maglia Tahoe": "Maglia Tahoe",
  "Maglia Thunder": "Maglia Thunder",
  "Anchor set with electric windlass": "Conjunto de âncora com molinete elétrico",
  "Bow sun-top extension to T-top": "Extensão do toldo de proa para T-top",
  "Bow sun-top extension to Hard-top": "Extensão do toldo de proa para Hard-top",
  "Bow locker removable cushion": "Almofada amovível do paiol de proa",
  "Bow manoeuvring thruster": "Hélice de proa para manobras",
  "Bow stainless steel railings": "Corrimãos de proa em aço inoxidável",
  "Canvas bimini-top": "Bimini em lona",
  "Canvas T-top, black powder coated": "T-top em lona, com pintura em pó preta",
  "Canvas T-top, black powder coated 950adventure": "T-top em lona, com pintura em pó preta (950 Adventure)",
  "Console cover": "Capa da consola",
  "Console's side seat": "Assento lateral da consola",
  "Diving platform w/ ladder": "Plataforma de mergulho com escada",
  "Double console with side seat & locker": "Consola dupla com assento lateral e arrumação",
  "Double seat cover": "Capa do banco duplo",
  "Double seat leaning post": "Leaning post duplo",
  "Electrical package": "Pacote elétrico",
  "Freshwater set w/ shower": "Conjunto de água doce com duche",
  "Freshwater set w/ shower, sink & faucet": "Conjunto de água doce com duche, lava-loiça e torneira",
  "GRP bow step plate": "Placa de degrau de proa em fibra (GRP)",
  "GRP stepends of the inflable tube": "Extremidades escalonadas do tubo em fibra (GRP)",
  "Harbour cover": "Capa de porto",
  "Hydraulic steering system": "Sistema de direção hidráulica",
  "Inbuilt fuel system": "Sistema de combustível integrado",
  "Inside-transom platform with two rope lockers": "Plataforma interior do painel de popa com dois paióis de cabos",
  "Jockey seats cover": "Capa dos bancos jockey",
  "Keel protector package": "Pacote de proteção de quilha",
  "Mechanical steering system": "Sistema de direção mecânica",
  "Navigation & waterski classic roll bar": "Arco de navegação e ski aquático clássico",
  "Navigation & waterski mast w/ handrails": "Mastro de navegação e ski aquático com corrimãos",
  "Navigation & waterski mast w/ rear handrails": "Mastro de navegação e ski aquático com corrimãos traseiros",
  "Navigation & waterski mast with GRP top": "Mastro de navegação e ski aquático com topo em fibra (GRP)",
  "Navigation classic roll bar, folding": "Arco de navegação clássico, rebatível",
  "Overall cover": "Capa geral",
  "Overpressure valves": "Válvulas de sobrepressão",
  "Premium steering wheel": "Volante premium",
  "Rear seat cover": "Capa do banco traseiro",
  "Rear sun-top extension to Hard-top": "Extensão do toldo de popa para Hard-top",
  "Rear sun-top extension to T-top": "Extensão do toldo de popa para T-top",
  "Refrigerator-freezer, stainless steel": "Frigorífico-congelador em aço inoxidável",
  "Refrigerator-freezer, stainless steel, 1 unit": "Frigorífico-congelador em aço inoxidável, 1 unidade",
  "Refrigerator-freezer, stainless steel, 2 unit": "Frigorífico-congelador em aço inoxidável, 2 unidades",
  "Removable bow sundeck extension kit": "Kit amovível de extensão do solário de proa",
  "Removable bow sundeck kit [2657]": "Kit amovível de solário de proa [2657]",
  "Removable bow sundeck-table kit": "Kit amovível de solário-mesa de proa",
  "Removable rear sundeck kit [2658]": "Kit amovível de solário de popa [2658]",
  "Removable rear sundeck-table kit": "Kit amovível de solário-mesa de popa",
  "Removable side seat kit": "Kit amovível de assento lateral",
  "Removable table w/ cupholders": "Mesa amovível com porta-copos",
  "Rigid Hard-top, black powder coated": "Hard-top rígido, com pintura em pó preta",
  "Round tube-ends of the inflatable tube": "Extremidades redondas do tubo insuflável",
  "SeaDek soft anti-skid flooring": "Piso antiderrapante SeaDek",
  "Sports seats cover": "Capa dos bancos desportivos",
  "St.steel handrail around the windshield": "Corrimão em aço inox à volta do para-brisas",
  "Suspension sports seat, adjustable": "Banco desportivo com suspensão, ajustável",
  "Swimming platforms w/ ladder & handrail": "Plataformas de natação com escada e corrimão",
  "Swimming platforms w/ ladder & handrail, for 1 engine": "Plataformas de natação com escada e corrimão, para 1 motor",
  "Swimming platforms w/ ladder & handrail, for 2 engines": "Plataformas de natação com escada e corrimão, para 2 motores",
  "Tube protector package": "Pacote de proteção dos tubos",
  "Waterski towing mast": "Mastro de reboque para ski aquático",
  "WC set with toilet and blackwater tank": "Conjunto WC com sanita e depósito de águas negras",
};

// Grand's feed has stray double spaces ("Bow  sun-top …"), so look up on a
// whitespace-normalised key but fall back to the text exactly as given.
const normalise = (text: string) => text.replace(/\s+/g, " ").trim();

export function translateConfigurator(text: string, locale: string): string {
  return locale === "pt" ? (PT[normalise(text)] ?? text) : text;
}

// Grand words a colour choice as "<Tab> | <Group>: <Colour>" (any part may be
// absent), e.g. "Tube | Tube Color: Ice White" or "Upholstery: Taupe".
export function translateColourChoice(choice: string, locale: string): string {
  if (locale !== "pt") return choice;
  let rest = choice;
  let tab: string | null = null;
  const bar = rest.indexOf(" | ");
  if (bar !== -1) {
    tab = rest.slice(0, bar);
    rest = rest.slice(bar + 3);
  }
  let group: string | null = null;
  const colon = rest.indexOf(": ");
  if (colon !== -1) {
    group = rest.slice(0, colon);
    rest = rest.slice(colon + 2);
  }
  const colour = translateConfigurator(rest, locale);
  const head = [tab, group].filter((p): p is string => p !== null).map((p) => translateConfigurator(p, locale));
  return head.length > 0 ? `${head.join(" | ")}: ${colour}` : colour;
}

export const __PT_FOR_TESTS = PT;
