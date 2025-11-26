import Link from "next/link"
import { Card, CardContent } from "@/app/components/ui/card"
import { Award, CheckCircle2 } from "lucide-react"
import { Button } from "../ui/button"

export function CTASection() {
  return (
    <section className="py-16 container mx-auto px-4">
      <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-12 text-center space-y-6">
          <Award className="w-16 h-16 mx-auto" />

          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>

          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Join thousands of participants and organizers building their verified digital portfolio.
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
              className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/signup">Create Event</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
