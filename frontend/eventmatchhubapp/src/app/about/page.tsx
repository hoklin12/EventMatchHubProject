import IntroPage from "../components/sections/about/intro"
import MainLayout from "../components/main-layout"
import { SiteFooter } from "../components/site/site-footer"
import { SiteHeader } from "../components/site/site-header"

export default function AboutPage() {
  return (
    <MainLayout>
      <SiteHeader />
      <IntroPage />
      <SiteFooter />
    </MainLayout>
  )
}
