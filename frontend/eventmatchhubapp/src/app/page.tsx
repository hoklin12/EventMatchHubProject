import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Calendar,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  MessageSquare,
  FileCheck,
  BarChart3,
  Shield,
  CheckCircle2,
  Brain,
  Bell,
} from "lucide-react"
import { SiteHeader } from "./components/site-header"
import { SiteFooter } from "./components/site-footer"

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
      image: "/marketing-workshop.png",
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

  // const participantFeatures = [
  //   {
  //     icon: Search,
  //     title: "Wide Range of Events",
  //     description: "Access volunteer programs, competitions, and workshops all in one centralized platform.",
  //   },
  //   {
  //     icon: Sparkles,
  //     title: "Personalized Recommendations",
  //     description: "Get AI-powered event suggestions based on your interests, skills, and location.",
  //   },
  //   {
  //     icon: FileCheck,
  //     title: "Simplified Applications",
  //     description: "Apply through customizable, user-friendly forms with streamlined processes.",
  //   },
  //   {
  //     icon: MessageSquare,
  //     title: "Direct Communication",
  //     description: "Chat directly with event organizers for updates, clarifications, and support.",
  //   },
  //   {
  //     icon: Award,
  //     title: "Verified Certificates",
  //     description: "Build credibility with blockchain-verified digital certificates and portfolios.",
  //   },
  //   {
  //     icon: Shield,
  //     title: "Transparency & Trust",
  //     description: "Track authentic records of your participation with complete transparency.",
  //   },
  // ]

  // const organizerFeatures = [
  //   {
  //     icon: Calendar,
  //     title: "Centralized Management",
  //     description: "Post, manage, and monitor multiple events efficiently from one dashboard.",
  //   },
  //   {
  //     icon: FileCheck,
  //     title: "Customizable Forms",
  //     description: "Create registration forms tailored to collect exactly the information you need.",
  //   },
  //   {
  //     icon: Brain,
  //     title: "AI Applicant Summaries",
  //     description: "Get AI-generated summaries for faster and more accurate participant selection.",
  //   },
  //   {
  //     icon: Bell,
  //     title: "Built-in Communication",
  //     description: "Use integrated chat and notifications to stay connected with participants.",
  //   },
  //   {
  //     icon: Award,
  //     title: "Automated Certificates",
  //     description: "Generate and verify certificates automatically to ensure authenticity.",
  //   },
  //   {
  //     icon: BarChart3,
  //     title: "Reports & Analytics",
  //     description: "Access detailed insights to measure event success and participant engagement.",
  //   },
  // ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="default" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Discover Your Next Event
            </Badge>
            <h1 className="text-5xl font-bold text-balance">
              Find Events That Match Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Interests
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Connect with opportunities, participate in amazing events, and get verified certificates for your
              achievements.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-2xl mx-auto mt-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search events, categories, or locations..." className="pl-10 h-12 text-base" />
              </div>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 px-8">
                Search
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">1,234+</div>
                <div className="text-sm text-muted-foreground">Active Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Participants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Browse by Category</h2>
          <p className="text-muted-foreground">Explore events across different interests and industries</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
                <Badge variant="secondary" className={category.color}>
                  {category.count} events
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-4">For Participants</Badge>
            <h2 className="text-3xl font-bold mb-3">Everything You Need to Succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access a wide range of opportunities and build your verified digital portfolio with ease
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {participantFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-700 mb-4">For Organizers</Badge>
            <h2 className="text-3xl font-bold mb-3">Powerful Tools for Event Management</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Streamline your event operations with AI-powered features and comprehensive analytics
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizerFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Recommended Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3">Recommended for You</h2>
              <p className="text-muted-foreground">Personalized event suggestions based on your interests</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  {event.featured && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{event.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4" />
                      {event.attendees} attendees
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href={`/registration?event=${event.id}`}>Register Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-12 text-center space-y-6">
            <Award className="w-16 h-16 mx-auto" />
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-blue-50 max-w-2xl mx-auto">
              Join thousands of participants and organizers building their verified digital portfolio
            </p>
            <div className="flex flex-wrap gap-6 justify-center pt-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Verified Certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Secure & Trusted</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/events">Find Events</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/signup">Create Event</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <SiteFooter />
    </div>
  )
}
