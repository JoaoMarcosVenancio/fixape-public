"use client";

import { useEffect, useMemo, useState } from "react";
import { getSubjectDisplayName } from "@/lib/questions/display";
import { getOfficialTopicsForSubject } from "@/lib/questions/edital-topics";
import { getQuestionTopicFilterValue } from "@/lib/questions/topic-mapping";
import { buildQuestionsUrl } from "@/lib/questions/urls";
import type { AlternativeKey, SoldadoQuestion } from "@/lib/questions/types";
import { getInitialProgress, loadProgress, saveAnswer, setLastQuestion, toggleFavorite } from "@/lib/progress/storage";
import type { SoldadoProgress } from "@/lib/progress/types";
import { QuestionCard } from "./QuestionCard";
import { QuestionFilters } from "./QuestionFilters";
import { QuestionNavigator } from "./QuestionNavigator";

type FilterValue = {
  subject: string;
  topic: string;
  board: string;
  year: string;
  status: string;
};

const EMPTY_FILTERS: FilterValue = {
  subject: "",
  topic: "",
  board: "",
  year: "",
  status: "",
};

const STATUS_COPY: Record<string, { title: string; description: string; emptyTitle: string; emptyDescription: string }> = {
  wrong: {
    title: "Revisao de erros",
    description: "Voce esta revisando questoes que respondeu incorretamente.",
    emptyTitle: "Voce ainda nao tem questoes erradas para revisar.",
    emptyDescription: "Continue praticando. Quando errar uma questao, ela aparecera aqui.",
  },
  favorites: {
    title: "Questoes favoritas",
    description: "Voce esta estudando as questoes que marcou como favoritas.",
    emptyTitle: "Voce ainda nao marcou nenhuma questao como favorita.",
    emptyDescription: "Use o botao Favoritar em uma questao para montar sua lista de revisao.",
  },
  answered: {
    title: "Questoes respondidas",
    description: "Voce esta vendo questoes que ja foram respondidas neste navegador.",
    emptyTitle: "Voce ainda nao respondeu questoes com esses filtros.",
    emptyDescription: "Volte para todas as questoes e comece uma sessao de pratica.",
  },
  unanswered: {
    title: "Questoes nao respondidas",
    description: "Voce esta praticando questoes ainda nao respondidas neste navegador.",
    emptyTitle: "Nao ha questoes nao respondidas com os filtros atuais.",
    emptyDescription: "Limpe os filtros ou escolha outra materia, banca ou ano.",
  },
};

function isStatusFilter(value: string | null): value is string {
  return value === "unanswered" || value === "answered" || value === "wrong" || value === "favorites";
}

function getSearchParam(params: URLSearchParams, key: string, allowedValues: string[]) {
  const value = params.get(key);
  return value && allowedValues.includes(value) ? value : "";
}

function filterQuestions(questions: SoldadoQuestion[], filters: FilterValue, progress: SoldadoProgress) {
  return questions.filter((question) => {
    const answer = progress.answers[question.id];
    const favorite = Boolean(progress.favorites[question.id]);
    const matchesSubject = filters.subject === "" || question.materia === filters.subject;
    const matchesTopic = filters.topic === "" || getQuestionTopicFilterValue(question) === filters.topic;
    const matchesBoard = filters.board === "" || question.banca === filters.board;
    const matchesYear = filters.year === "" || question.ano === filters.year;
    const matchesStatus =
      filters.status === "" ||
      (filters.status === "unanswered" && !answer) ||
      (filters.status === "answered" && Boolean(answer)) ||
      (filters.status === "wrong" && Boolean(answer) && !answer.isCorrect) ||
      (filters.status === "favorites" && favorite);

    return matchesSubject && matchesTopic && matchesBoard && matchesYear && matchesStatus;
  });
}

function getModeCopy(status: string) {
  return (
    STATUS_COPY[status] ?? {
      title: "Pratica direta com progresso local",
      description: "Suas respostas e favoritas ficam salvas somente neste navegador, sem login e sem envio para servidor.",
      emptyTitle: "Nenhuma questao encontrada com os filtros atuais.",
      emptyDescription: "Limpe os filtros ou ajuste materia, banca, ano e status para continuar praticando.",
    }
  );
}

export function QuestionPractice({
  questions,
  subjects,
  boards,
  years,
}: {
  questions: SoldadoQuestion[];
  subjects: string[];
  boards: string[];
  years: string[];
}) {
  const [filters, setFilters] = useState<FilterValue>(EMPTY_FILTERS);
  const [progress, setProgress] = useState<SoldadoProgress>(() => getInitialProgress());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AlternativeKey | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadedProgress = loadProgress();
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get("status");
    const nextFilters = {
      subject: getSearchParam(params, "materia", subjects),
      topic: "",
      board: getSearchParam(params, "banca", boards),
      year: getSearchParam(params, "ano", years),
      status: isStatusFilter(statusParam) ? statusParam : "",
    };
    const topicParam = params.get("topico");
    const topicOptions = getOfficialTopicsForSubject(nextFilters.subject);
    nextFilters.topic = topicParam && topicOptions.includes(topicParam) ? topicParam : "";
    const initialQuestions = filterQuestions(questions, nextFilters, loadedProgress);
    const lastIndex = loadedProgress.lastQuestionId
      ? initialQuestions.findIndex((question) => question.id === loadedProgress.lastQuestionId)
      : -1;
    const nextIndex = lastIndex >= 0 ? lastIndex : 0;
    const nextQuestion = initialQuestions[nextIndex];

    setProgress(loadedProgress);
    setFilters(nextFilters);
    setCurrentIndex(nextIndex);
    setSelectedAnswer(nextQuestion ? loadedProgress.answers[nextQuestion.id]?.selectedAnswer ?? null : null);
    setReady(true);
  }, [boards, questions, subjects, years]);

  const filteredQuestions = useMemo(() => filterQuestions(questions, filters, progress), [filters, progress, questions]);
  const topicOptions = useMemo(() => getOfficialTopicsForSubject(filters.subject), [filters.subject]);
  const currentQuestion = filteredQuestions[currentIndex];
  const hasActiveFilters = Boolean(filters.subject || filters.topic || filters.board || filters.year || filters.status);
  const modeCopy = getModeCopy(filters.status);
  const emptyTitle = filters.topic ? "Nenhuma questão encontrada para este tópico com os filtros atuais." : modeCopy.emptyTitle;
  const emptyDescription = filters.topic
    ? "Limpe o tópico ou ajuste matéria, banca, ano e status para continuar estudando."
    : modeCopy.emptyDescription;

  useEffect(() => {
    if (!ready || !currentQuestion) return;
    setSelectedAnswer(progress.answers[currentQuestion.id]?.selectedAnswer ?? null);
    const nextProgress = setLastQuestion(currentQuestion.id);
    setProgress(nextProgress);
  }, [currentQuestion?.id, ready]);

  function updateUrl(nextFilters: FilterValue) {
    if (typeof window === "undefined") return;
    const nextUrl = buildQuestionsUrl({
      materia: nextFilters.subject,
      topico: nextFilters.topic,
      banca: nextFilters.board,
      ano: nextFilters.year,
      status: nextFilters.status,
    });
    window.history.replaceState(null, "", nextUrl);
  }

  function handleFilterChange(nextFilters: FilterValue) {
    setFilters(nextFilters);
    updateUrl(nextFilters);
    setCurrentIndex(0);
    const nextQuestions = filterQuestions(questions, nextFilters, progress);
    setSelectedAnswer(nextQuestions[0] ? progress.answers[nextQuestions[0].id]?.selectedAnswer ?? null : null);
  }

  function clearFilters() {
    handleFilterChange(EMPTY_FILTERS);
  }

  function continueFromLastQuestion() {
    if (!progress.lastQuestionId) return;
    const nextIndex = filteredQuestions.findIndex((question) => question.id === progress.lastQuestionId);
    if (nextIndex >= 0) {
      goToQuestion(nextIndex);
    }
  }

  function goToQuestion(nextIndex: number) {
    const nextQuestion = filteredQuestions[nextIndex];
    setCurrentIndex(nextIndex);
    setSelectedAnswer(nextQuestion ? progress.answers[nextQuestion.id]?.selectedAnswer ?? null : null);
  }

  function handleAnswer(answer: AlternativeKey) {
    if (!currentQuestion) return;
    const nextProgress = saveAnswer(currentQuestion.id, answer, currentQuestion.gabarito);
    setProgress(nextProgress);
    setSelectedAnswer(answer);
  }

  function handleToggleFavorite() {
    if (!currentQuestion) return;
    setProgress(toggleFavorite(currentQuestion.id));
  }

  const canContinueFromLast =
    Boolean(progress.lastQuestionId) &&
    filteredQuestions.some((question) => question.id === progress.lastQuestionId) &&
    currentQuestion?.id !== progress.lastQuestionId;

  return (
    <main style={{ background: "#f8faff", minHeight: "100vh" }}>
      <section style={{ background: "#fff", borderBottom: "1px solid #e8edf8", padding: "56px 24px 34px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 12px" }}>
            Questoes PMPE Soldado
          </p>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", lineHeight: 1.08, letterSpacing: "-1.8px", color: "#111827", margin: "0 0 16px", fontWeight: 850 }}>
            {modeCopy.title}
          </h1>
          <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.65, maxWidth: 700, margin: 0 }}>
            {modeCopy.description}
          </p>
        </div>
      </section>

      <section style={{ padding: "22px 24px 88px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 18 }}>
          <QuestionFilters subjects={subjects} topics={topicOptions} boards={boards} years={years} value={filters} onChange={handleFilterChange} />

          <section style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div>
                <strong style={{ display: "block", fontSize: 15, color: "#111827", marginBottom: 4 }}>
                  {filteredQuestions.length} questoes no filtro atual
                </strong>
                <span style={{ fontSize: 13, color: "#6b7280" }}>
                  {filters.subject ? `Materia: ${getSubjectDisplayName(filters.subject)}. ` : ""}
                  {filters.topic ? `Topico: ${filters.topic}. ` : ""}
                  {filters.board ? `Banca: ${filters.board}. ` : ""}
                  {filters.year ? `Ano: ${filters.year}. ` : ""}
                  {filters.status ? `Modo: ${modeCopy.title}.` : "Modo: todas as questoes."}
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {canContinueFromLast && (
                  <button type="button" onClick={continueFromLastQuestion} style={secondaryButtonStyle}>
                    Continuar de onde parei
                  </button>
                )}
                {filters.topic && (
                  <button type="button" onClick={() => handleFilterChange({ ...filters, topic: "" })} style={secondaryButtonStyle}>
                    Limpar topico
                  </button>
                )}
                {hasActiveFilters && (
                  <button type="button" onClick={clearFilters} style={secondaryButtonStyle}>
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
          </section>

          {ready && currentQuestion ? (
            <>
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                total={filteredQuestions.length}
                selectedAnswer={selectedAnswer}
                isFavorite={Boolean(progress.favorites[currentQuestion.id])}
                onSelectAnswer={handleAnswer}
                onToggleFavorite={handleToggleFavorite}
              />
              <QuestionNavigator
                currentIndex={currentIndex}
                total={filteredQuestions.length}
                onPrevious={() => goToQuestion(Math.max(0, currentIndex - 1))}
                onNext={() => goToQuestion(Math.min(filteredQuestions.length - 1, currentIndex + 1))}
              />
            </>
          ) : (
            <section
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                borderRadius: 18,
                padding: "42px 26px",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 850, color: "#111827", margin: "0 0 10px" }}>
                {emptyTitle}
              </h2>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: "0 auto 22px", maxWidth: 480 }}>
                {emptyDescription}
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button type="button" onClick={clearFilters} style={primaryButtonStyle}>
                  Ver todas as questoes
                </button>
                {filters.topic && (
                  <button type="button" onClick={() => handleFilterChange({ ...filters, topic: "" })} style={secondaryButtonStyle}>
                    Limpar topico
                  </button>
                )}
                {filters.status && !filters.topic && (
                  <button type="button" onClick={() => handleFilterChange({ ...filters, status: "" })} style={secondaryButtonStyle}>
                    Limpar status
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

const secondaryButtonStyle: React.CSSProperties = {
  border: "1.5px solid #d1d5db",
  background: "#fff",
  color: "#374151",
  borderRadius: 980,
  padding: "9px 16px",
  fontSize: 13,
  fontWeight: 750,
  cursor: "pointer",
};

const primaryButtonStyle: React.CSSProperties = {
  border: "none",
  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
  color: "#fff",
  borderRadius: 980,
  padding: "12px 22px",
  fontSize: 14,
  fontWeight: 800,
  cursor: "pointer",
};
