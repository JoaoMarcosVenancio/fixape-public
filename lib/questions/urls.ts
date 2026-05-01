type QuestionUrlFilters = {
  materia?: string;
  topico?: string;
  banca?: string;
  ano?: string;
  status?: string;
};

export function buildQuestionsUrl(filters: QuestionUrlFilters = {}): string {
  const params = new URLSearchParams();

  if (filters.materia) params.set("materia", filters.materia);
  if (filters.topico) params.set("topico", filters.topico);
  if (filters.banca) params.set("banca", filters.banca);
  if (filters.ano) params.set("ano", filters.ano);
  if (filters.status) params.set("status", filters.status);

  const query = params.toString();
  return query ? `/questoes?${query}` : "/questoes";
}
