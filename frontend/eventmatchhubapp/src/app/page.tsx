import { HeroSection } from "./components/home/hero-section";
import { CategoryGrid } from "./components/home/category-grid";
import { RecommendedEventsSection } from "./components/events/recommended-event-section";
import { CTASection } from "./components/events/cta-section";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { getRecommendedEvents } from "@/lib/data/event-datas";

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
    <div className="min-h-screen bg-background">
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
    </div>
  );
}
