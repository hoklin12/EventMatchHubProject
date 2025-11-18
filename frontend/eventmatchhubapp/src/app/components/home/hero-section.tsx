"use client"

import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Search, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
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
            Connect with opportunities, participate in amazing events,
            and get verified certificates for your achievements.
          </p>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-2xl mx-auto mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search events, categories, or locations..." className="pl-10 h-10 text-base" />
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
  )
}
