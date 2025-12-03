

import IntroPage from "../components/sections/about/intro"
import MainLayout from "../components/main-layout"
import { SiteFooter } from "../components/site/site-footer"

import { SiteHeader } from "../components/site/site-header"
import IntroEvents from "../components/sections/events/IntroEvents"

export default function EventsPage() {
  

  return (
    <MainLayout>
      <SiteHeader />
      <IntroEvents />
      <SiteFooter />
    </MainLayout>
  )
}
