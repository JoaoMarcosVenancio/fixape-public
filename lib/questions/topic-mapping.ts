import type { SoldadoQuestion } from "@/lib/questions/types";
import { getOfficialSubjectForRawSubject, getOfficialTopicsForSubject } from "./edital-topics";

const TOPICS = {
  portugues: {
    interpretacao: "Compreensão e interpretação de textos",
    tipologia: "Tipologias e gêneros textuais",
    ortografia: "Ortografia oficial",
    acentuacao: "Acentuação gráfica",
    classes: "Emprego das classes de palavras",
    crase: "Crase",
    sintaxe: "Sintaxe da oração e do período",
    coesao: "Coesão textual",
    pontuacao: "Pontuação",
    concordancia: "Concordância nominal e verbal",
    regencia: "Regência nominal e verbal",
    colocacao: "Colocação pronominal",
    significacao: "Significação das palavras",
    redacao: "Redação oficial (Manual da Presidência da República)",
  },
  constitucional: {
    principios: "Princípios fundamentais",
    direitos: "Direitos e garantias fundamentais",
    estado: "Organização do Estado (competências, administração pública, militares dos estados)",
    poderes: "Organização dos Poderes",
    defesa: "Defesa do Estado e das instituições democráticas",
  },
  historia: {
    ocupacao: "Ocupação e colonização",
    acucar: "Ciclo do açúcar",
    olindaRecife: "Formação de Olinda e Recife",
    holandesa: "Presença holandesa (Nassau)",
    resistencia: "Movimentos de resistência e emancipacionistas (Quilombos, 1817, Confederação do Equador, etc.)",
    republica: "Pernambuco e a República",
    cultura: "Cultura popular (Frevo, Maracatu)",
    afro: "Herança Afrodescendente",
  },
  logico: {
    estruturas: "Estruturas lógicas (proposições, conectivos, falácias)",
    argumentacao: "Lógica de argumentação (analogias, deduções, conclusões)",
    diagramas: "Diagramas lógicos",
    contagem: "Princípios e técnicas de contagem",
    probabilidade: "Probabilidade",
  },
  informatica: {
    internet: "Internet e intranet",
    ferramentas: "Tecnologias e ferramentas",
    seguranca: "Proteção e segurança",
    backup: "Backup",
    arquivos: "Gerenciamento de arquivos e pastas",
    windows: "Windows",
    office: "Pacote Microsoft Office 2019 e LibreOffice 7",
  },
  direitosHumanos: {
    teoria: "Teoria geral dos Direitos Humanos",
    evolucao: "Evolução histórica",
    dudh: "Declaração Universal dos Direitos Humanos",
    abuso: "Lei de Abuso de Autoridade",
    tortura: "Lei de Tortura",
    maria: "Lei Maria da Penha",
    hediondos: "Crimes Hediondos",
    drogas: "Lei de Drogas",
    estatuto: "Estatuto dos Policiais Militares de Pernambuco (Lei Estadual nº 6.783/1974)",
  },
} as const;

function textOf(question: SoldadoQuestion) {
  return `${question.topico} ${question.enunciado}`.toLocaleLowerCase("pt-BR");
}

function has(text: string, ...terms: string[]) {
  return terms.some((term) => text.includes(term.toLocaleLowerCase("pt-BR")));
}

export function getOfficialTopicForQuestion(question: SoldadoQuestion): string | undefined {
  const officialSubject = getOfficialSubjectForRawSubject(question.materia);
  if (!officialSubject) return undefined;

  const text = textOf(question);

  if (officialSubject === "Língua Portuguesa") {
    if (has(text, "interpretação", "compreensão")) return TOPICS.portugues.interpretacao;
    if (has(text, "tipologia", "gênero textual", "genero textual")) return TOPICS.portugues.tipologia;
    if (has(text, "ortografia", "emprego das letras", "por que", "porque")) return TOPICS.portugues.ortografia;
    if (has(text, "acentuação", "acentuacao")) return TOPICS.portugues.acentuacao;
    if (has(text, "substantivo", "pronome", "pronomes", "classes de palavras")) return TOPICS.portugues.classes;
    if (has(text, "crase")) return TOPICS.portugues.crase;
    if (has(text, "oração", "orações", "periodo", "período")) return TOPICS.portugues.sintaxe;
    if (has(text, "coesão", "coerência", "conectores", "anáfora", "catáfora")) return TOPICS.portugues.coesao;
    if (has(text, "pontuação", "vírgula", "travessão", "aspas")) return TOPICS.portugues.pontuacao;
    if (has(text, "concordância")) return TOPICS.portugues.concordancia;
    if (has(text, "regência")) return TOPICS.portugues.regencia;
    if (has(text, "colocação pronominal")) return TOPICS.portugues.colocacao;
    if (has(text, "significação", "semântica", "vocábulo")) return TOPICS.portugues.significacao;
    if (has(text, "redação oficial")) return TOPICS.portugues.redacao;
  }

  if (officialSubject === "Direito Constitucional") {
    if (has(text, "princípios fundamentais", "arts. 1º a 4º")) return TOPICS.constitucional.principios;
    if (has(text, "direitos", "garantias", "nacionalidade", "direitos políticos", "partidos políticos", "mandado")) {
      return TOPICS.constitucional.direitos;
    }
    if (has(text, "organização do estado", "competências", "administração pública", "servidores públicos", "militares dos estados", "união: bens")) {
      return TOPICS.constitucional.estado;
    }
    if (has(text, "presidente", "supremo tribunal", "stf", "poderes")) return TOPICS.constitucional.poderes;
    if (has(text, "segurança pública", "estado de defesa", "estado de sítio")) return TOPICS.constitucional.defesa;
  }

  if (officialSubject === "História de Pernambuco") {
    if (has(text, "holand", "nassau")) return TOPICS.historia.holandesa;
    if (has(text, "açúcar", "acucar", "engenho")) return TOPICS.historia.acucar;
    if (has(text, "olinda", "recife")) return TOPICS.historia.olindaRecife;
    if (has(text, "quilombo", "1817", "confederação do equador", "revolução pernambucana", "mascates", "emancipacionista")) {
      return TOPICS.historia.resistencia;
    }
    if (has(text, "república", "republica")) return TOPICS.historia.republica;
    if (has(text, "frevo", "maracatu", "cultura popular")) return TOPICS.historia.cultura;
    if (has(text, "afro", "negro", "escrav")) return TOPICS.historia.afro;
    if (has(text, "ocupação", "ocupacao", "colonização", "colonizacao", "capitania", "duarte coelho")) return TOPICS.historia.ocupacao;
  }

  if (officialSubject === "Raciocínio Lógico") {
    if (has(text, "argumentos", "argumentação")) return TOPICS.logico.argumentacao;
    if (has(text, "diagramas", "proposições categóricas")) return TOPICS.logico.diagramas;
    if (has(text, "contagem", "associação", "sequências")) return TOPICS.logico.contagem;
    if (has(text, "probabilidade")) return TOPICS.logico.probabilidade;
    if (has(text, "equivalências", "verdade", "lógicas", "proposições")) return TOPICS.logico.estruturas;
  }

  if (officialSubject === "Informática") {
    if (has(text, "internet", "intranet")) return TOPICS.informatica.internet;
    if (has(text, "segurança", "firewall", "proxy", "autenticação", "senhas")) return TOPICS.informatica.seguranca;
    if (has(text, "backup")) return TOPICS.informatica.backup;
    if (has(text, "arquivos", "pastas")) return TOPICS.informatica.arquivos;
    if (has(text, "windows")) return TOPICS.informatica.windows;
    if (has(text, "word", "excel", "calc", "writer", "libreoffice", "office")) return TOPICS.informatica.office;
    if (has(text, "ferramentas", "tecnologias")) return TOPICS.informatica.ferramentas;
  }

  if (officialSubject === "Direitos Humanos e Legislação Extravagante") {
    if (has(text, "conceitos", "teoria geral")) return TOPICS.direitosHumanos.teoria;
    if (has(text, "histórico", "historia", "gerações", "geracoes", "evolução")) return TOPICS.direitosHumanos.evolucao;
    if (has(text, "declaração universal", "dudh")) return TOPICS.direitosHumanos.dudh;
    if (has(text, "abuso de autoridade")) return TOPICS.direitosHumanos.abuso;
    if (has(text, "tortura")) return TOPICS.direitosHumanos.tortura;
    if (has(text, "maria da penha", "medidas protetivas")) return TOPICS.direitosHumanos.maria;
    if (has(text, "hediondos")) return TOPICS.direitosHumanos.hediondos;
    if (has(text, "drogas")) return TOPICS.direitosHumanos.drogas;
    if (has(text, "estatuto dos policiais militares", "lei estadual nº 6.783", "lei estadual n° 6.783")) return TOPICS.direitosHumanos.estatuto;
  }

  return undefined;
}

export function getQuestionTopicFilterValue(question: SoldadoQuestion): string {
  return getOfficialTopicForQuestion(question) ?? "";
}

export function getOfficialTopicsAvailableForSubject(rawSubject: string): string[] {
  return getOfficialTopicsForSubject(rawSubject);
}
