/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "@/app/components/ui/input"
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/emh_logo_white.png" alt="Event Match Hub" className="h-15 w-15 rounded-lg" />
              <span className="text-xl font-bold">Event Match Hub</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your all-in-one platform for discovering events, managing applications, and building a trustworthy digital
              portfolio with verified certificates.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* For Participants */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">For Participants</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/my-events" className="hover:text-white transition-colors">
                  My Events
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-white transition-colors">
                  My Certificates
                </Link>
              </li>
              <li>
                <Link href="/dashboard/participant" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* For Organizers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">For Organizers</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/event-management" className="hover:text-white transition-colors">
                  Manage Events
                </Link>
              </li>
              <li>
                <Link href="/event-management/create" className="hover:text-white transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/dashboard/organizer" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  Become an Organizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/about#careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
            <p className="text-sm text-slate-300 mb-4">
              Subscribe to get the latest events and opportunities delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; 2025 Event Match Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
