"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  mode: QuestionMode;
  subject: string;
  topic: string;
  board: string;
  year: string;
};

type QuestionMode = "new" | "review-errors" | "favorites" | "answered";
type StatusFilter = "unanswered" | "answered" | "wrong" | "favorites";

const EMPTY_FILTERS: FilterValue = {
  mode: "new",
  subject: "",
  topic: "",
  board: "",
  year: "",
};

const MODE_COPY: Record<QuestionMode, { emptyTitle: string; emptyDescription: string }> = {
  new: {
    emptyTitle: "Você concluiu as questões deste filtro.",
    emptyDescription: "Não há novas questões disponíveis com os filtros atuais.",
  },
  "review-errors": {
    emptyTitle: "Você ainda não tem questões erradas para revisar.",
    emptyDescription: "Continue praticando. Quando errar uma questão, ela aparecerá aqui.",
  },
  favorites: {
    emptyTitle: "Você ainda não marcou questões favoritas.",
    emptyDescription: "Use o botão Favoritar em uma questão para montar sua lista de revisão.",
  },
  answered: {
    emptyTitle: "Você ainda não respondeu questões com esses filtros.",
    emptyDescription: "Volte para todas as questões e comece uma sessão de prática.",
  },
};

function isModeParam(value: string | null): value is Exclude<QuestionMode, "answered"> {
  return value === "new" || value === "review-errors" || value === "favorites";
}

function isStatusFilter(value: string | null): value is StatusFilter {
  return value === "unanswered" || value === "answered" || value === "wrong" || value === "favorites";
}

function modeFromStatus(status: StatusFilter): QuestionMode {
  if (status === "unanswered") return "new";
  if (status === "wrong") return "review-errors";
  if (status === "favorites") return "favorites";
  return "answered";
}

function getSearchParam(params: URLSearchParams, key: string, allowedValues: string[]) {
  const value = params.get(key);
  return value && allowedValues.includes(value) ? value : "";
}

function matchesFilterScope(question: SoldadoQuestion, filters: FilterValue) {
  return (
    (filters.subject === "" || question.materia === filters.subject) &&
    (filters.topic === "" || getQuestionTopicFilterValue(question) === filters.topic) &&
    (filters.board === "" || question.banca === filters.board) &&
    (filters.year === "" || question.ano === filters.year)
  );
}

function filterQuestions(questions: SoldadoQuestion[], filters: FilterValue, progress: SoldadoProgress) {
  return questions.filter((question) => {
    const answer = progress.answers[question.id];
    const favorite = Boolean(progress.favorites[question.id]);
    const matchesMode =
      (filters.mode === "new" && !answer) ||
      (filters.mode === "answered" && Boolean(answer)) ||
      (filters.mode === "review-errors" && Boolean(answer) && !answer.isCorrect) ||
      (filters.mode === "favorites" && favorite);

    return matchesFilterScope(question, filters) && matchesMode;
  });
}

function getVisibleSelectedAnswer(question: SoldadoQuestion | undefined, progress: SoldadoProgress, mode: QuestionMode): AlternativeKey | null {
  if (!question || mode === "review-errors") return null;
  return progress.answers[question.id]?.selectedAnswer ?? null;
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
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<AlternativeKey | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadedProgress = loadProgress();
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get("mode");
    const statusParam = params.get("status");
    const mode = isModeParam(modeParam) ? modeParam : isStatusFilter(statusParam) ? modeFromStatus(statusParam) : "new";
    const nextFilters = {
      mode,
      subject: getSearchParam(params, "materia", subjects),
      topic: "",
      board: getSearchParam(params, "banca", boards),
      year: getSearchParam(params, "ano", years),
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
    setCurrentQuestionId(nextQuestion?.id ?? null);
    setSelectedAnswer(getVisibleSelectedAnswer(nextQuestion, loadedProgress, nextFilters.mode));
    setReady(true);
  }, [boards, questions, subjects, years]);

  const filteredQuestions = useMemo(() => filterQuestions(questions, filters, progress), [filters, progress, questions]);
  const topicOptions = useMemo(() => getOfficialTopicsForSubject(filters.subject), [filters.subject]);
  const currentQuestion = useMemo(
    () => questions.find((question) => question.id === currentQuestionId && matchesFilterScope(question, filters)),
    [currentQuestionId, filters, questions]
  );
  const currentIndex = currentQuestion ? filteredQuestions.findIndex((question) => question.id === currentQuestion.id) : -1;
  const currentQuestionIsInQueue = currentIndex >= 0;
  const displayIndex = currentQuestionIsInQueue ? currentIndex : 0;
  const displayTotal = filteredQuestions.length + (currentQuestion && !currentQuestionIsInQueue ? 1 : 0);
  const hasActiveFilters = Boolean(filters.subject || filters.topic || filters.board || filters.year);
  const modeCopy = MODE_COPY[filters.mode];
  const emptyTitle = filters.topic ? "Nenhuma questão encontrada para este tópico com os filtros atuais." : modeCopy.emptyTitle;
  const emptyDescription = filters.topic
    ? "Limpe o tópico ou ajuste matéria, banca, ano e modo para continuar estudando."
    : modeCopy.emptyDescription;

  useEffect(() => {
    if (!ready || !currentQuestion) return;
    setSelectedAnswer(getVisibleSelectedAnswer(currentQuestion, progress, filters.mode));
    const nextProgress = setLastQuestion(currentQuestion.id);
    setProgress(nextProgress);
  }, [currentQuestion?.id, ready]);

  function updateUrl(nextFilters: FilterValue) {
    if (typeof window === "undefined") return;
    const nextUrl = buildQuestionsUrl({
      mode: nextFilters.mode === "answered" ? undefined : nextFilters.mode,
      materia: nextFilters.subject,
      topico: nextFilters.topic,
      banca: nextFilters.board,
      ano: nextFilters.year,
      status: nextFilters.mode === "answered" ? "answered" : undefined,
    });
    window.history.replaceState(null, "", nextUrl);
  }

  function handleFilterChange(nextFilters: FilterValue) {
    setFilters(nextFilters);
    updateUrl(nextFilters);
    const nextQuestions = filterQuestions(questions, nextFilters, progress);
    const nextQuestion = nextQuestions[0];
    setCurrentQuestionId(nextQuestion?.id ?? null);
    setSelectedAnswer(getVisibleSelectedAnswer(nextQuestion, progress, nextFilters.mode));
  }

  function clearFilters() {
    handleFilterChange(EMPTY_FILTERS);
  }

  function continueFromLastQuestion() {
    if (!progress.lastQuestionId) return;
    const nextQuestion = filteredQuestions.find((question) => question.id === progress.lastQuestionId);
    if (nextQuestion) {
      goToQuestion(nextQuestion.id);
    }
  }

  function goToQuestion(questionId: string) {
    const nextQuestion = questions.find((question) => question.id === questionId);
    if (!nextQuestion) return;
    setCurrentQuestionId(nextQuestion.id);
    setSelectedAnswer(getVisibleSelectedAnswer(nextQuestion, progress, filters.mode));
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
  const canGoPrevious = filters.mode !== "new" && currentIndex > 0;
  const nextQuestion =
    filters.mode === "new" && !currentQuestionIsInQueue
      ? filteredQuestions[0]
      : currentQuestionIsInQueue
        ? filteredQuestions[currentIndex + 1]
        : filteredQuestions[0];
  const canGoNext = Boolean(nextQuestion);

  return (
    <main style={{ background: "#f8faff", minHeight: "100vh" }}>
      <section className="practice-body" style={{ padding: "18px 24px 78px" }}>
        <div className="practice-content" style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 14 }}>
          <QuestionFilters subjects={subjects} topics={topicOptions} boards={boards} years={years} value={filters} onChange={handleFilterChange} />

          {(canContinueFromLast || filters.topic || hasActiveFilters) && (
            <div className="practice-filter-actions" style={{ display: "flex", justifyContent: "flex-end", gap: 8, flexWrap: "wrap" }}>
              {canContinueFromLast && (
                <button type="button" onClick={continueFromLastQuestion} style={secondaryButtonStyle}>
                  Continuar de onde parei
                </button>
              )}
              {filters.topic && (
                <button type="button" onClick={() => handleFilterChange({ ...filters, topic: "" })} style={secondaryButtonStyle}>
                  Limpar tópico
                </button>
              )}
              {hasActiveFilters && (
                <button type="button" onClick={clearFilters} style={secondaryButtonStyle}>
                  Limpar filtros
                </button>
              )}
            </div>
          )}

          {ready && currentQuestion ? (
            <>
              <QuestionCard
                question={currentQuestion}
                currentIndex={displayIndex}
                total={displayTotal}
                selectedAnswer={selectedAnswer}
                isFavorite={Boolean(progress.favorites[currentQuestion.id])}
                onSelectAnswer={handleAnswer}
                onToggleFavorite={handleToggleFavorite}
              />
              <QuestionNavigator
                currentIndex={displayIndex}
                total={displayTotal}
                showPrevious={filters.mode !== "new"}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
                hasAnswered={selectedAnswer !== null}
                onPrevious={() => {
                  const previousQuestion = filteredQuestions[currentIndex - 1];
                  if (previousQuestion) goToQuestion(previousQuestion.id);
                }}
                onNext={() => {
                  if (nextQuestion) goToQuestion(nextQuestion.id);
                }}
              />
            </>
          ) : (
            <section
              style={{
                background: "#fff",
                border: "1px solid rgba(226,232,240,0.95)",
                borderRadius: 16,
                padding: "42px 26px",
                textAlign: "center",
                boxShadow: "0 2px 14px rgba(15,23,42,0.045)",
              }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 850, color: "#111827", margin: "0 0 10px" }}>
                {emptyTitle}
              </h2>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: "0 auto 22px", maxWidth: 480 }}>
                {emptyDescription}
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {filters.mode === "new" && (
                  <>
                    <button type="button" onClick={() => handleFilterChange({ ...filters, mode: "review-errors" })} style={primaryButtonStyle}>
                      Revisar erros
                    </button>
                    <button type="button" onClick={() => handleFilterChange({ ...filters, mode: "favorites" })} style={secondaryButtonStyle}>
                      Ver favoritas
                    </button>
                    <Link href="/progresso" style={secondaryLinkStyle}>
                      Ir para Progresso
                    </Link>
                  </>
                )}
                {filters.mode !== "new" && (
                  <>
                    <button type="button" onClick={() => handleFilterChange({ ...filters, mode: "new" })} style={primaryButtonStyle}>
                      Continuar questões novas
                    </button>
                    <Link href="/progresso" style={secondaryLinkStyle}>
                      Ver progresso
                    </Link>
                  </>
                )}
                {(hasActiveFilters || filters.topic) && (
                  <button type="button" onClick={clearFilters} style={secondaryButtonStyle}>
                    Limpar filtros
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
      </section>
      <style>{`
        @media (max-width: 640px) {
          .practice-body {
            padding: 14px 12px 56px !important;
          }
          .practice-content {
            gap: 12px !important;
          }
          .practice-filter-actions {
            display: grid !important;
            grid-template-columns: 1fr;
            width: 100%;
            gap: 8px !important;
          }
          .practice-filter-actions button {
            width: 100%;
            min-height: 44px !important;
          }
        }
      `}</style>
    </main>
  );
}

const secondaryButtonStyle: React.CSSProperties = {
  border: "1px solid #d9e0ea",
  background: "#fff",
  color: "#374151",
  borderRadius: 980,
  minHeight: 38,
  padding: "8px 14px",
  fontSize: 13,
  fontWeight: 750,
  cursor: "pointer",
};

const primaryButtonStyle: React.CSSProperties = {
  border: "none",
  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
  color: "#fff",
  borderRadius: 980,
  minHeight: 46,
  padding: "12px 22px",
  fontSize: 14,
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryLinkStyle: React.CSSProperties = {
  ...secondaryButtonStyle,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
};
