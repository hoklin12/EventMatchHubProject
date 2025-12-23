

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "./ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import {
//   Bell,
//   Plus,
//   Settings,
//   LogOut,
//   User,
//   Menu,
//   X,
//   FolderOpen,
//   LayoutDashboard,
//   CalendarDays,
// } from "lucide-react";
// import { useState, useEffect } from "react";

// export function SiteHeader() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [userRole, setUserRole] = useState<"guest" | "participant" | "organizer">("guest");
//   const [userName, setUserName] = useState("User");
//   const [userAvatar, setUserAvatar] = useState("");

//   const router = useRouter();
//   const pathname = usePathname();

//   // Load user data from localStorage on mount
//   useEffect(() => {
//     setMounted(true);
//     const role = localStorage.getItem("userRole") as "guest" | "participant" | "organizer" | null;
//     const name = localStorage.getItem("userName");
//     const avatar = localStorage.getItem("userAvatar");

//     if (role === "participant" || role === "organizer") {
//       setUserRole(role);
//     }
//     if (name) setUserName(name);
//     if (avatar) setUserAvatar(avatar);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userAvatar");
//     localStorage.removeItem("authToken");

//     setUserRole("guest");
//     setUserName("User");
//     setUserAvatar("");

//     router.push("/");
//   };

//   // Navigation links based on role
//   const getNavLinks = () => {
//     const baseLinks = [
//       { href: "/", label: "Home" },
//       { href: "/events", label: "Browse Events" },
//       { href: "/about", label: "About" },
//     ];

//     if (userRole === "organizer") {
//       return [
//         { href: "/", label: "Home" },
//         { href: "/organizer/general", label: "Dashboard" },
//         { href: "/organizer/event", label: "My Events" },
//       ];
//     }

//     if (userRole === "participant") {
//       return [...baseLinks, { href: "/participant/overview", label: "My Events" }];
//     }

//     return baseLinks; // guest
//   };

//   const navLinks = mounted ? getNavLinks() : [];

//   const getLinkClass = (href: string) => {
//     if (!mounted) return "text-muted-foreground hover:text-foreground hover:bg-muted/50";
//     const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
//     return isActive
//       ? "text-foreground bg-muted/50"
//       : "text-muted-foreground hover:text-foreground hover:bg-muted/50";
//   };

//   // ========================
//   // ORGANIZER HEADER
//   // ========================
//   if (userRole === "organizer") {
//     return (
//       <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
//         <div className="container mx-auto px-4">
//           <div className="flex h-16 items-center justify-between">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
//               <img src="/emh_logo.png" alt="Event Match Hub" className="w-10 h-10 object-contain" />
//               <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                 EVENT MATCH HUB
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center gap-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${getLinkClass(link.href)}`}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

//             {/* Right Actions */}
//             <div className="flex items-center gap-3">
//               {/* Create Event Button */}
//               <Button
//                 size="icon"
//                 className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
//                 asChild
//               >
//                 <Link href="/organizer/event/create">
//                   <Plus className="h-5 w-5" />
//                 </Link>
//               </Button>

//               {/* Notifications */}
//               <Button variant="ghost" size="icon" className="relative">
//                 <Bell className="h-5 w-5" />
//                 <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
//               </Button>

//               {/* User Dropdown */}
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="icon" className="rounded-full">
//                     <Avatar className="h-9 w-9">
//                       <AvatarImage src={userAvatar} alt={userName} />
//                       <AvatarFallback className="bg-purple-100 text-purple-700">
//                         {userName.charAt(0).toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-56 mt-2">
//                   <DropdownMenuLabel>
//                     <div className="flex flex-col">
//                       <p className="font-medium">{userName}</p>
//                       <p className="text-xs text-muted-foreground">Organizer Account</p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem asChild>
//                     <Link href="/organizer/profile" className="flex items-center">
//                       <User className="mr-2 h-4 w-4" />
//                       Profile
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href="/account-settings" className="flex items-center">
//                       <Settings className="mr-2 h-4 w-4" />
//                       Settings
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={handleLogout} className="text-red-600">
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Log out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               {/* Mobile Menu */}
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="md:hidden"
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               >
//                 {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Nav */}
//           {mobileMenuOpen && (
//             <div className="md:hidden py-4 border-t">
//               <nav className="flex flex-col space-y-1">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${getLinkClass(link.href)}`}
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//               </nav>
//             </div>
//           )}
//         </div>
//       </header>
//     );
//   }

//   // ========================
//   // DEFAULT HEADER (Guest & Participant)
//   // ========================
//   return (
//     <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 shadow-sm z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
//             <img src="/emh_logo.png" alt="Event Match Hub" className="w-10 h-10 object-contain" />
//             <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-900">
//               EVENT MATCH HUB
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${getLinkClass(link.href)}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Right Actions */}
//           <div className="flex items-center gap-2">
//             {userRole === "guest" ? (
//               <>
//                 <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
//                   <Link href="/login">Sign In</Link>
//                 </Button>
//                 <Button
//                   size="sm"
//                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
//                   asChild
//                 >
//                   <Link href="/signup">Get Started</Link>
//                 </Button>
//               </>
//             ) : (
//               <>
//                 {/* Notification Bell */}
//                 <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex">
//                   <Bell className="h-5 w-5" />
//                   <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
//                 </Button>

//                 {/* User Dropdown */}
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="rounded-full p-1">
//                       <Avatar className="h-9 w-9">
//                         <AvatarImage src={userAvatar} alt={userName} />
//                         <AvatarFallback className="bg-purple-100 text-purple-700">
//                           {userName.charAt(0).toUpperCase()}
//                         </AvatarFallback>
//                       </Avatar>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="w-56 z-[999]">
//                     <DropdownMenuLabel>
//                       <div className="flex flex-col space-y-1">
//                         <p className="text-sm font-medium leading-none">{userName}</p>
//                         <p className="text-xs leading-none text-muted-foreground">
//                           Participant Account
//                         </p>
//                       </div>
//                     </DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem asChild>
//                       <Link href="/participant/profile">
//                         <User className="mr-2 h-4 w-4" /> Profile
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem asChild>
//                       <Link href="/participant/portfolios">
//                         <FolderOpen className="mr-2 h-4 w-4" /> Portfolio
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem asChild>
//                       <Link href="/account-settings">
//                         <Settings className="mr-2 h-4 w-4" /> Settings
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem onClick={handleLogout} className="text-red-600">
//                       <LogOut className="mr-2 h-4 w-4" /> Log out
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </>
//             )}

//             {/* Mobile Menu */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <nav className="flex flex-col space-y-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${getLinkClass(link.href)}`}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               {userRole === "guest" && (
//                 <>
//                   <Link
//                     href="/login"
//                     className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     href="/signup"
//                     className="mx-4 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:opacity-90"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     Get Started
//                   </Link>
//                 </>
//               )}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Bell,
  Plus,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  FolderOpen,
} from "lucide-react";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<"guest" | "participant" | "organizer">("guest");
  const [userName, setUserName] = useState("User");
  const [userAvatar, setUserAvatar] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "guest" | "participant" | "organizer" | null;
    const name = localStorage.getItem("userName");
    const avatar = localStorage.getItem("userAvatar");
    if (role === "participant" || role === "organizer") {
      setUserRole(role);
    }
    if (name) setUserName(name);
    if (avatar) setUserAvatar(avatar);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("authToken");
    setUserRole("guest");
    setUserName("User");
    setUserAvatar("");
    router.push("/");
  };

  const getLinkClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return isActive
      ? "text-foreground bg-muted/50"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";
  };

  // Navigation links (only used in mobile or non-organizer desktop)
  const getNavLinks = () => {
    const baseLinks = [
      { href: "/", label: "Home" },
      { href: "/events", label: "Browse Events" },
      { href: "/about", label: "About" },
    ];

    if (userRole === "organizer") {
      return [
        { href: "/", label: "Home" },
        { href: "/organizer/general", label: "Dashboard" },
        { href: "/organizer/event", label: "My Events" },
      ];
    }

    if (userRole === "participant") {
      return [...baseLinks, { href: "/participant/overview", label: "My Events" }];
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  // ========================
  // ORGANIZER HEADER - NO NAV LINKS ON DESKTOP
  // ========================
  if (userRole === "organizer") {
    return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/emh_logo.png" alt="Event Match Hub" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                EVENT MATCH HUB
              </span>
            </Link>

            {/* Desktop: NO NAVIGATION LINKS FOR ORGANIZER */}
            <div className="hidden md:block flex-1" /> {/* Empty spacer to balance layout */}

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Create Event */}
              <Button
                size="icon"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                asChild
              >
                <Link href="/organizer/event/create">
                  <Plus className="h-5 w-5" />
                </Link>
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <p className="font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">Organizer Account</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/organizer/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account-settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - STILL SHOWS LINKS */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${getLinkClass(link.href)}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    );
  }

  // ========================
  // DEFAULT HEADER (Guest & Participant) - UNCHANGED
  // ========================
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/emh_logo.png" alt="Event Match Hub" className="w-10 h-10 object-contain" />
            <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-900">
              EVENT MATCH HUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${getLinkClass(link.href)}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {userRole === "guest" ? (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                  asChild
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-1">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 z-[999]">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Participant Account
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/participant/profile">
                        <User className="mr-2 h-4 w-4" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/participant/portfolios">
                        <FolderOpen className="mr-2 h-4 w-4" /> Portfolio
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account-settings">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                  className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${getLinkClass(link.href)}`}
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
                    className="mx-4 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:opacity-90"
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