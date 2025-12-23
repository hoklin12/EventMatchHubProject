import { SiteFooter } from "@/app/components/site/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import PortfoliosManager from "./Portfolios-Manager";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PortfoliosManager />

      <SiteFooter />
    </div>
  );
}
