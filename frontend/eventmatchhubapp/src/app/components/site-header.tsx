/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Bell, Settings, LogOut, User, Menu, X } from "lucide-react"
import { useState } from "react"

interface SiteHeaderProps {
  variant?: "default" | "participant" | "organizer"
  userName?: string
  userAvatar?: string
}

export function SiteHeader({ variant = "default", userName, userAvatar }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // const getNavLinks = () => {
  //   switch (variant) {
  //     case "participant":
  //       return [
  //         { href: "/dashboard/participant", label: "Dashboard" },
  //         { href: "/events", label: "Explore Events" },
  //         { href: "/my-registrations", label: "My Registrations" },
  //         { href: "/messages", label: "Messages" },
  //       ]
  //     case "organizer":
  //       return [
  //         { href: "/dashboard/organizer", label: "Dashboard" },
  //         { href: "/event-management", label: "My Events" },
  //         { href: "/messages", label: "Messages" },
  //         { href: "#analytics", label: "Analytics" },
  //       ]
  //     default:
  //       return [
  //         { href: "/", label: "Home" },
  //         { href: "/events", label: "Browse Events" },
  //         { href: "/about", label: "About" },
  //       ]
  //   }
  // }

    const getNavLinks = () => {
    const commonLinks = [
      { href: "/", label: "Home" },
      { href: "/events", label: "Browse Events" },
      { href: "/about", label: "About" },
    ]

    const roleLinks =
      variant === "participant"
        ? [{ href: "/overview", label: "Overview" }]
        : variant === "organizer"
        ? [
            { href: "/dashboard/organizer", label: "Dashboard" },
            { href: "/event-management", label: "My Events" },
            { href: "/messages", label: "Messages" },
          ]
        : []

    return [...commonLinks, ...roleLinks]
  }

  const navLinks = getNavLinks()

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/emh_logo.png" alt="Event Match Hub" className="w-15 h-15 object-contain" />
            <span className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-900">EVENT MATCH HUB</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
                  index === 0
                    ? "text-foreground bg-muted/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {variant === "default" ? (
              // Public header actions
              <>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                  <Link href="/login" className="text-xs">Sign In</Link>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90" asChild>
                  <Link href="/signup" className="text-xs">Get Started</Link>
                </Button>
              </>
            ) : (
              // Authenticated user actions
              <>
                <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex" asChild>
                  <Link href="/settings">
                    <Settings className="w-5 h-5" />
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={userAvatar || "/professional-headshot.png"} alt={userName || "User"} />
                        <AvatarFallback>{userName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {variant === "organizer" ? "Organizer Account" : "Participant Account"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    index === 0
                      ? "text-foreground bg-muted/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {variant === "default" && (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md transition-opacity hover:opacity-90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
