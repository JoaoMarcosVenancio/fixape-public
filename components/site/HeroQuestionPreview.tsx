"use client";

import { useEffect, useRef, useState } from "react";

type PreviewAlternativeKey = "A" | "B" | "C" | "D" | "E";

type PreviewQuestion = {
  materia: string;
  banca: string;
  ano: string;
  enunciado: string;
  alternativas: Record<PreviewAlternativeKey, string>;
  gabarito: PreviewAlternativeKey;
  selectedAnswer: PreviewAlternativeKey;
};

const previewQuestions: PreviewQuestion[] = [
  {
    materia: "Língua Portuguesa",
    banca: "IAUPE",
    ano: "2009",
    enunciado: "Assinale a alternativa que NÃO apresenta erro de ortografia.",
    alternativas: {
      A: "O novo diretor será empossado derrepente.",
      B: "Ela agiu prazeirosamente e não quis dizer o porquê.",
      C: "O meretíssimo solicitou que fechassem o abrigo imediatamente.",
      D: "Sempre foi um impecilho aquela cadeira de rodas.",
      E: "O requerimento do aluno foi deferido.",
    },
    gabarito: "E",
    selectedAnswer: "B",
  },
  {
    materia: "Direito Constitucional",
    banca: "IAUPE",
    ano: "2009",
    enunciado: "Acerca dos Direitos Fundamentais, é CORRETO afirmar que",
    alternativas: {
      A: "os estrangeiros residentes no País não fazem jus aos direitos e garantias fundamentais.",
      B: "somente os estrangeiros residentes legalmente no País fazem jus aos direitos e garantias fundamentais.",
      C: "não há, no Brasil, direitos ou garantias que se revistam de caráter absoluto.",
      D: "os direitos e garantias individuais têm caráter absoluto.",
      E: "somente os brasileiros fazem jus aos direitos e garantias fundamentais.",
    },
    gabarito: "C",
    selectedAnswer: "C",
  },
  {
    materia: "História de Pernambuco",
    banca: "AOCP",
    ano: "2024",
    enunciado: "Assinale a alternativa que NÃO corresponde a um patrimônio imaterial de Pernambuco registrado pelo IPHAN.",
    alternativas: {
      A: "Maracatu Nação.",
      B: "Feira de Caruaru.",
      C: "Cavalo-Marinho.",
      D: "Ofício das paneleiras de goiabeiras.",
      E: "Frevo.",
    },
    gabarito: "D",
    selectedAnswer: "A",
  },
  {
    materia: "Direitos Humanos e Legislação Extravagante",
    banca: "AOCP",
    ano: "2024",
    enunciado: "De acordo com a Lei nº 8.072/1990, são considerados crimes hediondos, EXCETO",
    alternativas: {
      A: "genocídio.",
      B: "extorsão mediante sequestro.",
      C: "tráfico de pessoas.",
      D: "roubo circunstanciado pelo emprego de arma de fogo.",
      E: "comércio ilegal de armas de fogo.",
    },
    gabarito: "C",
    selectedAnswer: "C",
  },
];

const alternativeKeys: PreviewAlternativeKey[] = ["A", "B", "C", "D", "E"];

type FeedbackPhase = "reading" | "selected" | "revealed" | "badge";

export function HeroQuestionPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionState, setTransitionState] = useState<"active" | "leaving" | "entering">("active");
  const [feedbackPhase, setFeedbackPhase] = useState<FeedbackPhase>("reading");
  const swapTimeoutRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const selectionTimeoutRef = useRef<number | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);
  const badgeTimeoutRef = useRef<number | null>(null);
  const question = previewQuestions[activeIndex];
  const isCorrect = question.selectedAnswer === question.gabarito;
  const hasSelection = feedbackPhase === "selected" || feedbackPhase === "revealed" || feedbackPhase === "badge";
  const hasRevealedResult = feedbackPhase === "revealed" || feedbackPhase === "badge";
  const showBadge = feedbackPhase === "badge";

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTransitionState("leaving");

      swapTimeoutRef.current = window.setTimeout(() => {
        setFeedbackPhase("reading");
        setActiveIndex((current) => (current + 1) % previewQuestions.length);
        setTransitionState("entering");

        frameRef.current = window.requestAnimationFrame(() => {
          setTransitionState("active");
        });
      }, 260);
    }, 5200);

    return () => {
      window.clearInterval(interval);
      if (swapTimeoutRef.current !== null) window.clearTimeout(swapTimeoutRef.current);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    setFeedbackPhase("reading");

    selectionTimeoutRef.current = window.setTimeout(() => {
      setFeedbackPhase("selected");
    }, 900);

    revealTimeoutRef.current = window.setTimeout(() => {
      setFeedbackPhase("revealed");
    }, 1350);

    badgeTimeoutRef.current = window.setTimeout(() => {
      setFeedbackPhase("badge");
    }, 1720);

    return () => {
      if (selectionTimeoutRef.current !== null) window.clearTimeout(selectionTimeoutRef.current);
      if (revealTimeoutRef.current !== null) window.clearTimeout(revealTimeoutRef.current);
      if (badgeTimeoutRef.current !== null) window.clearTimeout(badgeTimeoutRef.current);
    };
  }, [activeIndex]);

  return (
    <div className="question-visual" aria-hidden="true">
      <div className="question-card">
        <div className={`question-card-content is-${transitionState}`}>
          <div className="question-card-header">
            <strong>{question.materia} • {question.banca} {question.ano}</strong>
            <span className={`result-pill ${isCorrect ? "is-correct" : "is-wrong"} ${showBadge ? "is-visible" : ""}`}>
              {isCorrect ? "Resposta correta" : "Resposta errada"}
            </span>
          </div>

          <p className="question-enunciado">{question.enunciado}</p>

          <div className="question-options">
            {alternativeKeys.map((key) => (
              <div
                key={key}
                className={`question-option ${key === question.selectedAnswer && hasSelection ? "is-selected-answer" : ""} ${
                  key === question.gabarito && hasRevealedResult ? "is-correct-answer" : ""
                } ${
                  key === question.selectedAnswer && !isCorrect && hasRevealedResult ? "is-wrong-answer" : ""
                }`}
              >
                <span>{key}</span>
                <p>{question.alternativas[key]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
