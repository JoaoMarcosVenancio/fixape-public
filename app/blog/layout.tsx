import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
