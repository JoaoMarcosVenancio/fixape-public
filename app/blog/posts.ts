export type Category = "noticias" | "dicas" | "edital" | "concurso";

export interface Post {
  slug: string;
  title: string;
  summary: string;
  category: Category;
  author: string;
  authorInitials: string;
  date: string;
  readingTime: number;
  featured: boolean;
  coverGradient: string;
  body: string[];
}

export const CATEGORY_LABELS: Record<Category, string> = {
  noticias: "Notícias",
  dicas: "Dicas de Estudo",
  edital: "Edital & Legislação",
  concurso: "Concurso & Vagas",
};

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; dot: string }> = {
  noticias: { bg: "rgba(239,68,68,0.12)", text: "#dc2626", dot: "#ef4444" },
  dicas: { bg: "rgba(37,99,235,0.12)", text: "#1d4ed8", dot: "#2563eb" },
  edital: { bg: "rgba(34,197,94,0.12)", text: "#16a34a", dot: "#22c55e" },
  concurso: { bg: "rgba(245,158,11,0.12)", text: "#b45309", dot: "#f59e0b" },
};

export const posts: Post[] = [
  {
    slug: "edital-pmpe-2025-tudo-que-voce-precisa-saber",
    title: "Edital PMPE 2025: Tudo o Que Você Precisa Saber",
    summary:
      "O tão esperado edital do concurso da Polícia Militar de Pernambuco foi publicado. Confira vagas, requisitos, conteúdo programático e datas importantes para não perder nenhum prazo.",
    category: "edital",
    author: "Equipe PasseiPMPE",
    authorInitials: "PP",
    date: "2025-03-15",
    readingTime: 8,
    featured: true,
    coverGradient: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 55%, #3b82f6 100%)",
    body: [
      "O edital do concurso da Polícia Militar de Pernambuco (PMPE) para o cargo de Soldado foi publicado no Diário Oficial do Estado. O documento traz informações detalhadas sobre vagas disponíveis, requisitos de participação, cronograma de provas e o conteúdo programático completo.",
      "O concurso oferece 2.000 vagas para o cargo de Soldado PM, sendo 1.600 para o sexo masculino e 400 para o sexo feminino. O salário inicial é de R$ 3.800,00, com perspectiva de progressão na carreira.",
      "As inscrições serão realizadas exclusivamente pelo site da banca organizadora, no período de 20 de março a 20 de abril de 2025. A taxa de inscrição é de R$ 85,00.",
      "Entre as disciplinas cobradas na prova objetiva estão: Língua Portuguesa, Matemática, Noções de Informática, Legislação Estadual, Direitos Humanos, História de Pernambuco e Direito Penal e Processual Penal.",
      "A prova objetiva está prevista para acontecer em junho de 2025, com local e horário a serem divulgados com antecedência. Candidatos aprovados ainda passarão por exame de saúde, teste de aptidão física (TAF) e investigação social.",
      "Confira o cronograma completo no edital publicado no site oficial da PMPE e comece a organizar seus estudos com antecedência. Use a plataforma PasseiPMPE para praticar questões reais de todas as disciplinas do edital.",
    ],
  },
  {
    slug: "como-estudar-direito-penal-pmpe-do-zero",
    title: "Como Estudar Direito Penal para PMPE do Zero",
    summary:
      "Direito Penal é uma das matérias mais temidas pelos candidatos, mas com a estratégia certa você consegue dominar os principais temas cobrados pela banca em poucas semanas.",
    category: "dicas",
    author: "Prof. Carlos Melo",
    authorInitials: "CM",
    date: "2025-02-28",
    readingTime: 6,
    featured: false,
    coverGradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 60%, #60a5fa 100%)",
    body: [
      "Direito Penal é frequentemente apontado como uma das disciplinas mais complexas para quem está começando. A quantidade de artigos, princípios e súmulas pode assustar, mas com uma abordagem estratégica é possível dominar o conteúdo em tempo hábil.",
      "Comece pelos princípios fundamentais. Legalidade, culpabilidade, proporcionalidade e dignidade da pessoa humana formam a base que vai nortear o entendimento de todo o restante da matéria.",
      "Em seguida, passe para os elementos do crime: fato típico, ilicitude e culpabilidade. Entenda o que é dolo e culpa, e como diferenciar crimes dolosos de culposos.",
      "Um ponto que sempre cai nas provas da PMPE são as excludentes de ilicitude: legítima defesa, estado de necessidade, estrito cumprimento do dever legal e exercício regular de direito. Memorize os requisitos de cada uma delas.",
      "Use a plataforma PasseiPMPE para resolver questões específicas de Direito Penal. A prática com questões reais de concursos anteriores é a melhor forma de identificar seus pontos fracos e consolidar o aprendizado.",
      "Dedique pelo menos 3 horas por semana exclusivamente para Direito Penal, divididas em sessões curtas de estudo focado. Com consistência, você verá resultados em poucas semanas.",
    ],
  },
  {
    slug: "pmpe-abre-inscricoes-novo-concurso",
    title: "PMPE Abre Inscrições para Novo Concurso",
    summary:
      "As inscrições para o novo concurso da PM Pernambuco já estão abertas. Saiba como se inscrever, quais documentos são necessários e não perca o prazo final.",
    category: "noticias",
    author: "Redação PasseiPMPE",
    authorInitials: "RP",
    date: "2025-03-20",
    readingTime: 4,
    featured: false,
    coverGradient: "linear-gradient(135deg, #7c1d1d 0%, #ef4444 50%, #f87171 100%)",
    body: [
      "As inscrições para o concurso da Polícia Militar de Pernambuco estão oficialmente abertas desde esta segunda-feira (20/03). O processo seletivo é organizado pela banca CESPE/CEBRASPE e visa preencher 2.000 vagas para o cargo de Soldado da Reserva.",
      "Para se inscrever, o candidato deve acessar o site oficial da banca organizadora, preencher o formulário eletrônico com seus dados pessoais e realizar o pagamento da taxa de inscrição de R$ 85,00 via boleto bancário ou PIX.",
      "Os documentos necessários para a inscrição incluem: CPF, RG e título de eleitor. Candidatos que solicitarem isenção da taxa devem enviar documentação adicional comprobatória conforme previsto em edital.",
      "O período de inscrições vai de 20 de março a 20 de abril de 2025. Não há prorrogação prevista, portanto organize-se com antecedência para não perder o prazo.",
      "Dúvidas sobre o processo seletivo podem ser tiradas pelo canal de atendimento da banca ou consultando o edital completo disponível no Diário Oficial de Pernambuco.",
    ],
  },
  {
    slug: "legislacao-estadual-pernambuco-temas-mais-cobrados",
    title: "Legislação Estadual de Pernambuco: Os Temas Mais Cobrados",
    summary:
      "Mapeamos questões de concursos anteriores da PMPE e identificamos os artigos e temas que mais aparecem nas provas. Prepare-se com inteligência e foque no que realmente cai.",
    category: "edital",
    author: "Prof. Ana Souza",
    authorInitials: "AS",
    date: "2025-02-10",
    readingTime: 7,
    featured: false,
    coverGradient: "linear-gradient(135deg, #14532d 0%, #22c55e 50%, #4ade80 100%)",
    body: [
      "A Legislação Estadual de Pernambuco é uma disciplina que costuma pegar desprevenidos muitos candidatos ao concurso da PMPE. Ao contrário do que se imagina, não basta ler a lei — é preciso saber quais artigos têm mais incidência nas provas.",
      "Com base na análise de mais de 200 questões de concursos anteriores da PMPE, identificamos os temas mais recorrentes: Constituição do Estado de Pernambuco (artigos 1º a 30), Lei de Organização da PMPE (Lei Estadual nº 11.817/2000) e Estatuto dos Policiais Militares.",
      "Na Constituição Estadual, fique atento especialmente aos artigos sobre a organização dos poderes, os direitos e garantias fundamentais no âmbito estadual e as competências da Polícia Militar.",
      "Na Lei de Organização da PMPE, os artigos mais cobrados são os que tratam das atribuições e missões da Polícia Militar, estrutura organizacional e hierarquia.",
      "O Estatuto dos Policiais Militares (Lei nº 6.783/74) aparece frequentemente em questões sobre deveres e obrigações do policial, proibições e regime disciplinar.",
      "Utilize flashcards e questões práticas para fixar cada um desses temas. A plataforma PasseiPMPE tem uma seção dedicada à Legislação Estadual com questões reais dos últimos concursos.",
    ],
  },
  {
    slug: "cronograma-estudos-6-meses-dia-prova",
    title: "Cronograma de Estudos de 6 Meses até o Dia da Prova",
    summary:
      "Com 6 meses de antecedência, é possível cobrir todo o edital com tranquilidade. Veja o plano detalhado semana a semana para chegar à prova preparado e confiante.",
    category: "dicas",
    author: "Prof. Carlos Melo",
    authorInitials: "CM",
    date: "2025-01-15",
    readingTime: 10,
    featured: false,
    coverGradient: "linear-gradient(135deg, #1e3a8a 0%, #6366f1 50%, #818cf8 100%)",
    body: [
      "Seis meses é um prazo confortável para quem quer passar na PMPE, desde que a preparação seja feita com método e consistência. A chave está em distribuir o conteúdo de forma inteligente e respeitar o plano.",
      "Meses 1 e 2 — Base teórica: Dedique esse período a estudar os fundamentos de cada matéria. Foque em Língua Portuguesa, Matemática e Direitos Humanos, que costumam ter maior peso na prova objetiva.",
      "Meses 3 e 4 — Aprofundamento: Avance para as matérias específicas como Direito Penal, Legislação Estadual e História de Pernambuco. Comece a resolver questões de cada tema logo após estudá-lo.",
      "Mês 5 — Revisão e questões: Pare de estudar conteúdo novo. Revise todos os temas estudados e intensifique a resolução de questões, preferencialmente simulados completos.",
      "Mês 6 — Sprint final: Identifique seus pontos fracos e revise apenas eles. Faça pelo menos 3 simulados completos no tempo real da prova. Durma bem nos dias anteriores ao exame.",
      "Use a plataforma PasseiPMPE todos os dias, mesmo que por apenas 20 minutos. A consistência supera a intensidade quando se trata de aprendizado.",
    ],
  },
  {
    slug: "gabarito-resultado-ultimo-concurso-pmpe",
    title: "Gabarito e Resultado do Último Concurso da PMPE",
    summary:
      "O gabarito oficial da prova objetiva foi divulgado pela banca. Veja as respostas corretas, como calcular sua pontuação e quando saem os resultados preliminares.",
    category: "noticias",
    author: "Redação PasseiPMPE",
    authorInitials: "RP",
    date: "2025-04-05",
    readingTime: 3,
    featured: false,
    coverGradient: "linear-gradient(135deg, #7c1d1d 0%, #dc2626 50%, #f87171 100%)",
    body: [
      "O gabarito oficial da prova objetiva do último concurso da Polícia Militar de Pernambuco foi publicado pela banca CESPE/CEBRASPE. Candidatos que realizaram a prova podem conferir suas respostas e calcular a pontuação preliminar.",
      "Para calcular sua nota, some o número de questões que você acertou em cada disciplina. A prova objetiva tem 120 questões no total, distribuídas entre as disciplinas do edital.",
      "O gabarito definitivo, após análise de recursos, será publicado em 30 dias. Candidatos que identificarem possíveis erros nas questões podem interpor recurso pelo site da banca dentro do prazo de 5 dias úteis.",
      "O resultado preliminar, com a nota da prova objetiva de cada candidato, está previsto para ser divulgado em maio de 2025. Candidatos com nota acima do ponto de corte avançarão para as etapas seguintes: TAF, exame de saúde e investigação social.",
      "Fique atento ao cronograma oficial e acompanhe as atualizações no PasseiPMPE para ser sempre o primeiro a saber das novidades do concurso.",
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(current: Post, count = 3): Post[] {
  const sameCategory = posts.filter((p) => p.slug !== current.slug && p.category === current.category);
  const others = posts.filter((p) => p.slug !== current.slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, count);
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}
