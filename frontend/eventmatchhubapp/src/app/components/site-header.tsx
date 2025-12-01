/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User, Menu, X, FolderOpen } from "lucide-react";
import { useState, useEffect } from "react";

interface SiteHeaderProps {
  userName?: string;
  userAvatar?: string;
}

export function SiteHeader({ userName, userAvatar }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<
    "guest" | "participant" | "organizer"
  >("guest");

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole("guest");
    router.push("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);

      const role = localStorage.getItem("userRole");
      if (role === "participant" || role === "organizer") {
        setUserRole(role);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const getNavLinks = (role: "guest" | "participant" | "organizer") => {
    const baseLinks = [
      { href: "/", label: "Home" },
      { href: "/events", label: "Browse Events" },
      { href: "/about", label: "About" },
    ];

    if (role === "participant") {
      return [
        ...baseLinks,
        { href: "/participant/overview", label: "Overview" },
      ];
    } else if (role === "organizer") {
      return [
        ...baseLinks,
        { href: "/overview/organizer", label: "Overview" },
        { href: "/event-management", label: "My Events" },
        { href: "/messages", label: "Messages" },
      ];
    }

    return baseLinks; // guest
  };

  const navLinks = mounted ? getNavLinks(userRole) : [];

  const getLinkClass = (href: string) => {
    if (!mounted)
      return "text-muted-foreground hover:text-foreground hover:bg-muted/50";

    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);
    return isActive
      ? "text-foreground bg-muted/50"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 shadow-sm z-50">
      <div className="container mx-auto px-4 relative z-50">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/emh_logo.png"
              alt="Event Match Hub"
              className="w-15 h-15 object-contain"
            />
            <span className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-900">
              EVENT MATCH HUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${getLinkClass(
                  link.href
                )}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {userRole === "guest" ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex"
                  asChild
                >
                  <Link href="/login" className="text-xs">
                    Sign In
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                  asChild
                >
                  <Link href="/signup" className="text-xs">
                    Get Started
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden sm:inline-flex"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={userAvatar || "/professional-headshot.png"}
                          alt={userName || "User"}
                        />
                        <AvatarFallback>
                          {userName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 z-[999]">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {userName || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {userRole === "organizer"
                            ? "Organizer Account"
                            : "Participant Account"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* Divider */}
                    <div className="border-t border-gray-200" />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/participant/profile"
                        className="cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/participant/portfolio"
                        className="cursor-pointer"
                      >
                        <FolderOpen className="mr-2 h-4 w-4" />
                        Portfolio
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/participant/settings"
                        className="cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {/* Divider */}
                    <div className="border-t border-gray-200" />
                    {/* LOGOUT */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600"
                    >
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
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${getLinkClass(
                    link.href
                  )}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {userRole === "guest" && (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:opacity-90"
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
  );
}
