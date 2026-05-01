export type AlternativeKey = "A" | "B" | "C" | "D" | "E";

export type JsonAlternativeKey = "a" | "b" | "c" | "d" | "e";

export type QuestionAlternativeMap = Record<AlternativeKey, string>;

export type JsonQuestionAlternativeMap = Record<JsonAlternativeKey, string>;

export type RawSoldadoQuestion = {
  id_original: string;
  cargo: "soldado" | string;
  materia: string;
  topico: string;
  banca: string;
  instituicao: string;
  concurso: string;
  ano: string;
  numero_questao: string;
  enunciado: string;
  alternativas: JsonQuestionAlternativeMap;
  gabarito: AlternativeKey | string;
  comentario: string;
};

export type SoldadoQuestion = {
  id: string;
  idOriginal: string;
  cargo: "soldado";
  materia: string;
  topico: string;
  banca: string;
  instituicao: string;
  concurso: "PMPE Soldado" | string;
  ano: string;
  numero: number;
  enunciado: string;
  alternativas: QuestionAlternativeMap;
  gabarito: AlternativeKey;
  comentario: string;
};

export type QuestionValidationResult = {
  errors: string[];
  warnings: string[];
};
