export const SOLDADO_EDITAL_SUBJECTS = [
  "Língua Portuguesa",
  "História de Pernambuco",
  "Raciocínio Lógico",
  "Informática",
  "Direito Constitucional",
  "Direitos Humanos e Legislação Extravagante",
] as const;

export type SoldadoEditalSubject = (typeof SOLDADO_EDITAL_SUBJECTS)[number];

export const SOLDADO_EDITAL_TOPICS: Record<SoldadoEditalSubject, string[]> = {
  "Língua Portuguesa": [
    "Compreensão e interpretação de textos",
    "Tipologias e gêneros textuais",
    "Ortografia oficial",
    "Acentuação gráfica",
    "Emprego das classes de palavras",
    "Crase",
    "Sintaxe da oração e do período",
    "Coesão textual",
    "Pontuação",
    "Concordância nominal e verbal",
    "Regência nominal e verbal",
    "Colocação pronominal",
    "Significação das palavras",
    "Variação linguística",
    "Redação oficial (Manual da Presidência da República)",
  ],
  "História de Pernambuco": [
    "Ocupação e colonização",
    "Ciclo do açúcar",
    "Formação de Olinda e Recife",
    "Presença holandesa (Nassau)",
    "Movimentos de resistência e emancipacionistas (Quilombos, 1817, Confederação do Equador, etc.)",
    "Pernambuco e a República",
    "Cultura popular (Frevo, Maracatu)",
    "Herança Afrodescendente",
  ],
  "Raciocínio Lógico": [
    "Estruturas lógicas (proposições, conectivos, falácias)",
    "Lógica de argumentação (analogias, deduções, conclusões)",
    "Diagramas lógicos",
    "Princípios e técnicas de contagem",
    "Probabilidade",
  ],
  Informática: [
    "Internet e intranet",
    "Tecnologias e ferramentas",
    "Proteção e segurança",
    "Backup",
    "Gerenciamento de arquivos e pastas",
    "Windows",
    "Pacote Microsoft Office 2019 e LibreOffice 7",
  ],
  "Direito Constitucional": [
    "Princípios fundamentais",
    "Direitos e garantias fundamentais",
    "Organização do Estado (competências, administração pública, militares dos estados)",
    "Organização dos Poderes",
    "Defesa do Estado e das instituições democráticas",
  ],
  "Direitos Humanos e Legislação Extravagante": [
    "Teoria geral dos Direitos Humanos",
    "Evolução histórica",
    "Incorporação de normas internacionais",
    "Declaração Universal dos Direitos Humanos",
    "Crimes no ECA",
    "Lei de Abuso de Autoridade",
    "Lei de Tortura",
    "Lei Maria da Penha",
    "Crimes raciais",
    "Crimes Ambientais",
    "Crimes Hediondos",
    "Lei de Drogas",
    "Estatuto dos Policiais Militares de Pernambuco (Lei Estadual nº 6.783/1974)",
  ],
};

const RAW_SUBJECT_TO_EDITAL_SUBJECT: Record<string, SoldadoEditalSubject> = {
  "Língua Portuguesa": "Língua Portuguesa",
  "Língua Portuguesa (Português)": "Língua Portuguesa",
  "História de Pernambuco": "História de Pernambuco",
  História: "História de Pernambuco",
  "Raciocínio Lógico": "Raciocínio Lógico",
  Informática: "Informática",
  "Direito Constitucional": "Direito Constitucional",
  "Direito Constitucional (CF/1988 e Doutrina)": "Direito Constitucional",
  "Direitos Humanos e Legislação Extravagante": "Direitos Humanos e Legislação Extravagante",
  "Direitos Humanos": "Direitos Humanos e Legislação Extravagante",
  "Legislação Militar": "Direitos Humanos e Legislação Extravagante",
  "Legislação Penal e Processual Penal Especial": "Direitos Humanos e Legislação Extravagante",
};

export function getOfficialSubjectForRawSubject(rawSubject: string): SoldadoEditalSubject | undefined {
  return RAW_SUBJECT_TO_EDITAL_SUBJECT[rawSubject];
}

export function getOfficialTopicsBySubject(officialSubject: SoldadoEditalSubject): string[] {
  return SOLDADO_EDITAL_TOPICS[officialSubject];
}

export function getOfficialTopicsForSubject(rawSubject: string): string[] {
  const officialSubject = getOfficialSubjectForRawSubject(rawSubject);
  return officialSubject ? getOfficialTopicsBySubject(officialSubject) : [];
}
