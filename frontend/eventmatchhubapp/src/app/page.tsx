

import MainLayout from "./components/main-layout"
import { CTASection } from "./components/sections/events/cta-section"
import { RecommendedEventsSection } from "./components/sections/events/recommended-event-section"
import { CategoryGrid } from "./components/sections/home/category-grid"
import { HeroSection } from "./components/sections/home/hero-section"
import { SiteFooter } from "./components/site/site-footer"
import { SiteHeader } from "./components/site/site-header"

export default function HomePage() {
  const categories = [
    { name: "Technology", icon: "💻", count: 245, color: "bg-blue-100 text-blue-700" },
    { name: "Business", icon: "💼", count: 189, color: "bg-purple-100 text-purple-700" },
    { name: "Arts & Culture", icon: "🎨", count: 156, color: "bg-pink-100 text-pink-700" },
    { name: "Sports", icon: "⚽", count: 134, color: "bg-green-100 text-green-700" },
    { name: "Education", icon: "📚", count: 198, color: "bg-orange-100 text-orange-700" },
    { name: "Health", icon: "🏥", count: 112, color: "bg-red-100 text-red-700" },
  ]

  const recommendedEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Summit 2025",
      category: "Technology",
      date: "Mar 15, 2025",
      location: "San Francisco, CA",
      attendees: 450,
      image: "/ai-conference.png",
      featured: true,
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      category: "Business",
      date: "Mar 22, 2025",
      location: "Online",
      attendees: 320,
      image: "/digital_mkt.png",
      featured: false,
    },
    {
      id: 3,
      title: "Contemporary Art Exhibition",
      category: "Arts & Culture",
      date: "Apr 5, 2025",
      location: "New York, NY",
      attendees: 280,
      image: "/art-exhibition.png",
      featured: true,
    },
  ]

  return (
    <MainLayout>
      <SiteHeader />
      <HeroSection />
      <CategoryGrid categories={categories} />
      <RecommendedEventsSection events={recommendedEvents} />
      <CTASection />
      <SiteFooter />
    </MainLayout>
  )
}
