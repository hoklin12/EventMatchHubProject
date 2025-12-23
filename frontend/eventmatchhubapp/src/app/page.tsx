

import MainLayout from "./components/main-layout"
import { CTASection } from "./components/sections/events/cta-section"
import { RecommendedEventsSection } from "./components/sections/events/recommended-event-section"
import { CategoryGrid } from "./components/sections/home/category-grid"
import { HeroSection } from "./components/sections/home/hero-section"
import { SiteFooter } from "./components/site/site-footer"
import { SiteHeader } from "./components/site-header"
import { getRecommendedEvents } from "@/lib/data/event-datas"

export default function HomePage() {
  const categories = [
    {
      name: "Technology",
      icon: "💻",
      count: 245,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Business",
      icon: "💼",
      count: 189,
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Arts & Culture",
      icon: "🎨",
      count: 156,
      color: "bg-pink-100 text-pink-700",
    },
    {
      name: "Sports",
      icon: "⚽",
      count: 134,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Education",
      icon: "📚",
      count: 198,
      color: "bg-orange-100 text-orange-700",
    },
    {
      name: "Health",
      icon: "🏥",
      count: 112,
      color: "bg-red-100 text-red-700",
    },
  ];
  const recommended = getRecommendedEvents();

  return (
    <MainLayout>
      <SiteHeader />
      {/* <HeroSection />*/}
      <HeroSection/>
      <CategoryGrid categories={categories} />
      {/* Divider */}
      <div className="border-t border-gray-200" />
      <RecommendedEventsSection events={recommended} />
      {/* Divider */}
      <div className="border-t border-gray-200" />
      <CTASection />
      <SiteFooter />
    </MainLayout>
  );
}
