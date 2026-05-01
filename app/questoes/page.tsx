import { StaticPageShell } from "@/components/site/SiteChrome";
import { QuestionPractice } from "@/components/questions/QuestionPractice";
import { getAllSoldadoQuestions, getBoards, getSubjects, getYears } from "@/lib/questions";

export default function QuestoesPage() {
  const questions = getAllSoldadoQuestions();
  const subjects = getSubjects();
  const boards = getBoards();
  const years = getYears();

  return (
    <StaticPageShell>
      <QuestionPractice questions={questions} subjects={subjects} boards={boards} years={years} />
    </StaticPageShell>
  );
}
