import { ProgressDashboard } from "@/components/progress/ProgressDashboard";
import { StaticPageShell } from "@/components/site/SiteChrome";
import { getAllSoldadoQuestions } from "@/lib/questions";

export default function ProgressoPage() {
  return (
    <StaticPageShell>
      <ProgressDashboard questions={getAllSoldadoQuestions()} />
    </StaticPageShell>
  );
}
