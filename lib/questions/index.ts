import rawQuestions from "@/data/questoes_soldado.json";
import type {
  AlternativeKey,
  JsonAlternativeKey,
  QuestionAlternativeMap,
  QuestionValidationResult,
  RawSoldadoQuestion,
  SoldadoQuestion,
} from "./types";

const ALTERNATIVE_KEYS = ["A", "B", "C", "D", "E"] as const satisfies readonly AlternativeKey[];
const JSON_ALTERNATIVE_KEYS = ["a", "b", "c", "d", "e"] as const satisfies readonly JsonAlternativeKey[];

const sourceQuestions = rawQuestions as RawSoldadoQuestion[];

function byText(a: string, b: string) {
  return a.localeCompare(b, "pt-BR", { sensitivity: "base", numeric: true });
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter((value) => value.trim().length > 0))).sort(byText);
}

function normalizeGabarito(value: string): AlternativeKey {
  const normalized = value.trim().toUpperCase();
  if (ALTERNATIVE_KEYS.includes(normalized as AlternativeKey)) {
    return normalized as AlternativeKey;
  }
  throw new Error(`Gabarito invalido: ${value}`);
}

function normalizeAlternativas(alternativas: RawSoldadoQuestion["alternativas"]): QuestionAlternativeMap {
  return {
    A: alternativas.a,
    B: alternativas.b,
    C: alternativas.c,
    D: alternativas.d,
    E: alternativas.e,
  };
}

function normalizeQuestion(question: RawSoldadoQuestion): SoldadoQuestion {
  return {
    id: question.id_original,
    idOriginal: question.id_original,
    cargo: "soldado",
    materia: question.materia,
    topico: question.topico,
    banca: question.banca,
    instituicao: question.instituicao,
    concurso: question.concurso,
    ano: question.ano,
    numero: Number(question.numero_questao),
    enunciado: question.enunciado,
    alternativas: normalizeAlternativas(question.alternativas),
    gabarito: normalizeGabarito(question.gabarito),
    comentario: question.comentario,
  };
}

const soldadoQuestions = sourceQuestions.map(normalizeQuestion);

export function getAllSoldadoQuestions(): SoldadoQuestion[] {
  return soldadoQuestions;
}

export function getQuestionById(id: string): SoldadoQuestion | undefined {
  return soldadoQuestions.find((question) => question.id === id);
}

export function getSubjects(): string[] {
  return uniqueSorted(soldadoQuestions.map((question) => question.materia));
}

export function getTopicsBySubject(subject: string): string[] {
  return uniqueSorted(
    soldadoQuestions
      .filter((question) => question.materia === subject)
      .map((question) => question.topico)
  );
}

export function getBoards(): string[] {
  return uniqueSorted(soldadoQuestions.map((question) => question.banca));
}

export function getYears(): string[] {
  return uniqueSorted(soldadoQuestions.map((question) => question.ano));
}

export function getQuestionsBySubject(subject: string): SoldadoQuestion[] {
  return soldadoQuestions.filter((question) => question.materia === subject);
}

export function getQuestionsByTopic(topic: string): SoldadoQuestion[] {
  return soldadoQuestions.filter((question) => question.topico === topic);
}

export function getQuestionsCountBySubject(): Record<string, number> {
  return soldadoQuestions.reduce<Record<string, number>>((acc, question) => {
    acc[question.materia] = (acc[question.materia] ?? 0) + 1;
    return acc;
  }, {});
}

export function validateSoldadoQuestions(): QuestionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<string>();

  if (!Array.isArray(sourceQuestions)) {
    errors.push("O arquivo data/questoes_soldado.json deve ter uma lista na raiz.");
    return { errors, warnings };
  }

  if (sourceQuestions.length === 0) {
    errors.push("O arquivo de questoes deve conter pelo menos uma questao.");
  }

  for (const [index, question] of sourceQuestions.entries()) {
    const label = question.id_original || `indice ${index}`;

    if (!question.id_original?.trim()) {
      errors.push(`${label}: id_original ausente.`);
    } else if (ids.has(question.id_original)) {
      errors.push(`${label}: id_original duplicado.`);
    } else {
      ids.add(question.id_original);
    }

    if (!question.materia?.trim()) errors.push(`${label}: materia ausente.`);
    if (!question.topico?.trim()) errors.push(`${label}: topico ausente.`);
    if (!question.enunciado?.trim()) errors.push(`${label}: enunciado ausente.`);
    if (!question.alternativas) {
      errors.push(`${label}: alternativas ausentes.`);
    } else {
      for (const key of JSON_ALTERNATIVE_KEYS) {
        if (!question.alternativas[key]?.trim()) {
          errors.push(`${label}: alternativa ${key.toUpperCase()} ausente.`);
        }
      }
    }

    const gabarito = question.gabarito?.trim().toUpperCase();
    if (!ALTERNATIVE_KEYS.includes(gabarito as AlternativeKey)) {
      errors.push(`${label}: gabarito invalido.`);
    } else if (!question.alternativas?.[gabarito.toLowerCase() as JsonAlternativeKey]?.trim()) {
      errors.push(`${label}: gabarito nao existe nas alternativas.`);
    }

    if (!Object.prototype.hasOwnProperty.call(question, "comentario")) {
      errors.push(`${label}: comentario ausente.`);
    } else if (!question.comentario?.trim()) {
      warnings.push(`${label}: comentario vazio.`);
    }

    if (question.cargo !== "soldado") {
      errors.push(`${label}: cargo diferente de soldado.`);
    }

    if (!question.concurso?.toLowerCase().includes("soldado")) {
      errors.push(`${label}: concurso nao parece ser PMPE Soldado.`);
    }
  }

  return { errors, warnings };
}
