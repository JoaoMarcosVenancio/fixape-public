import { describe, expect, it } from "vitest";
import {
  getAllSoldadoQuestions,
  getBoards,
  getQuestionById,
  getQuestionsBySubject,
  getQuestionsCountBySubject,
  getSubjects,
  getYears,
  validateSoldadoQuestions,
} from "@/lib/questions";
import { getSubjectDisplayName } from "@/lib/questions/display";
import { SOLDADO_EDITAL_TOPICS, getOfficialTopicsForSubject } from "@/lib/questions/edital-topics";
import { getOfficialTopicForQuestion, getQuestionTopicFilterValue } from "@/lib/questions/topic-mapping";
import { buildQuestionsUrl } from "@/lib/questions/urls";

const VALID_GABARITOS = ["A", "B", "C", "D", "E"];
const OFFICIAL_SOLDADO_SUBJECTS = [
  "Língua Portuguesa",
  "História de Pernambuco",
  "Raciocínio Lógico",
  "Informática",
  "Direito Constitucional",
  "Direitos Humanos e Legislação Extravagante",
];

describe("lib/questions — dados de Soldado", () => {
  it("carrega pelo menos uma questao", () => {
    expect(getAllSoldadoQuestions().length).toBeGreaterThan(0);
  });

  it("tem ids unicos", () => {
    const questions = getAllSoldadoQuestions();
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tem campos obrigatorios preenchidos", () => {
    for (const question of getAllSoldadoQuestions()) {
      expect(question.id).toBeTruthy();
      expect(question.materia).toBeTruthy();
      expect(question.topico).toBeTruthy();
      expect(question.banca).toBeTruthy();
      expect(question.concurso).toContain("Soldado");
      expect(question.ano).toMatch(/^\d{4}$/);
      expect(Number.isFinite(question.numero)).toBe(true);
      expect(question.enunciado).toBeTruthy();
      expect(Object.prototype.hasOwnProperty.call(question, "comentario")).toBe(true);
      expect(question.cargo).toBe("soldado");
    }
  });

  it("tem alternativas A, B, C, D e E validas", () => {
    for (const question of getAllSoldadoQuestions()) {
      expect(question.alternativas.A).toBeTruthy();
      expect(question.alternativas.B).toBeTruthy();
      expect(question.alternativas.C).toBeTruthy();
      expect(question.alternativas.D).toBeTruthy();
      expect(question.alternativas.E).toBeTruthy();
    }
  });

  it("tem gabarito valido e presente nas alternativas", () => {
    for (const question of getAllSoldadoQuestions()) {
      expect(VALID_GABARITOS).toContain(question.gabarito);
      expect(question.alternativas[question.gabarito]).toBeTruthy();
    }
  });

  it("retorna materias", () => {
    expect(getSubjects().length).toBeGreaterThan(0);
    expect(getSubjects().every((subject) => OFFICIAL_SOLDADO_SUBJECTS.includes(subject))).toBe(true);
  });

  it("conta questoes por materia corretamente", () => {
    const questions = getAllSoldadoQuestions();
    const counts = getQuestionsCountBySubject();
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

    expect(total).toBe(questions.length);
    for (const subject of getSubjects()) {
      expect(counts[subject]).toBe(getQuestionsBySubject(subject).length);
    }
  });

  it("retorna bancas", () => {
    const boards = getBoards();
    expect(boards.length).toBeGreaterThan(0);
    expect(boards).toContain("AOCP");
    expect(boards).toContain("IAUPE");
  });

  it("retorna anos", () => {
    const years = getYears();
    expect(years.length).toBeGreaterThan(0);
    expect(years.every((year) => /^\d{4}$/.test(year))).toBe(true);
  });

  it("busca uma questao existente por id", () => {
    const first = getAllSoldadoQuestions()[0];
    expect(getQuestionById(first.id)).toEqual(first);
  });

  it("filtra questoes por materia", () => {
    const subject = getSubjects()[0];
    const questions = getQuestionsBySubject(subject);

    expect(questions.length).toBeGreaterThan(0);
    expect(questions.every((question) => question.materia === subject)).toBe(true);
  });

  it("valida a integridade basica do JSON", () => {
    const result = validateSoldadoQuestions();
    expect(result.errors).toEqual([]);
  });

  it("exibe nomes amigaveis de materias conhecidas sem alterar o valor bruto", () => {
    expect(getSubjectDisplayName("Língua Portuguesa (Português)")).toBe("Língua Portuguesa");
    expect(getSubjectDisplayName("Direito Constitucional (CF/1988 e Doutrina)")).toBe("Direito Constitucional");
    expect(getSubjectDisplayName("Geografia")).toBe("Geografia");
  });

  it("monta URLs de questoes com filtros codificados", () => {
    expect(buildQuestionsUrl()).toBe("/questoes");
    expect(buildQuestionsUrl({ mode: "new" })).toBe("/questoes?mode=new");
    expect(buildQuestionsUrl({ mode: "review-errors" })).toBe("/questoes?mode=review-errors");
    expect(buildQuestionsUrl({ mode: "favorites" })).toBe("/questoes?mode=favorites");
    expect(buildQuestionsUrl({ mode: "favorites", materia: "Direito Constitucional" })).toBe("/questoes?mode=favorites&materia=Direito+Constitucional");
    expect(buildQuestionsUrl({ status: "wrong" })).toBe("/questoes?status=wrong");
    expect(buildQuestionsUrl({ materia: "Língua Portuguesa (Português)", topico: "Compreensão e interpretação de textos", status: "favorites" })).toBe(
      "/questoes?materia=L%C3%ADngua+Portuguesa+%28Portugu%C3%AAs%29&topico=Compreens%C3%A3o+e+interpreta%C3%A7%C3%A3o+de+textos&status=favorites"
    );
  });

  it("disponibiliza topicos oficiais do edital por materia de Soldado", () => {
    expect(getOfficialTopicsForSubject("Língua Portuguesa (Português)")).toEqual(SOLDADO_EDITAL_TOPICS["Língua Portuguesa"]);
    expect(getOfficialTopicsForSubject("Língua Portuguesa")).toEqual(SOLDADO_EDITAL_TOPICS["Língua Portuguesa"]);
    expect(getOfficialTopicsForSubject("Direito Constitucional (CF/1988 e Doutrina)")).toContain("Princípios fundamentais");
    expect(getOfficialTopicsForSubject("Direito Constitucional")).toContain("Princípios fundamentais");
    expect(getOfficialTopicsForSubject("História")).toContain("Ocupação e colonização");
    expect(getOfficialTopicsForSubject("História de Pernambuco")).toContain("Ocupação e colonização");
  });

  it("mapeia questoes para topicos oficiais quando ha correspondencia conservadora", () => {
    const constitutional = getAllSoldadoQuestions().find((question) =>
      question.topico.includes("Princípios Fundamentais")
    );
    const portuguese = getAllSoldadoQuestions().find((question) => question.topico.includes("Interpretação de Textos"));

    expect(constitutional).toBeDefined();
    expect(portuguese).toBeDefined();
    expect(getOfficialTopicForQuestion(constitutional!)).toBe("Princípios fundamentais");
    expect(getQuestionTopicFilterValue(portuguese!)).toBe("Compreensão e interpretação de textos");
  });

  it("permite filtrar por topico oficial com uma lista de questoes", () => {
    const questions = getAllSoldadoQuestions();
    const filtered = questions.filter((question) => getQuestionTopicFilterValue(question) === "Direitos e garantias fundamentais");

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((question) => question.materia === "Direito Constitucional")).toBe(true);
  });
});
