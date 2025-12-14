
import { SiteFooter } from "@/app/components/site/site-footer";
import { SiteHeader } from "@/app/components/site/site-header";
import PortfolioViewPage from "../PortfolioViewPage";


export default function Page() {
  

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PortfolioViewPage />


      <SiteFooter />
    </div>
  )
}
