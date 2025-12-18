

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<"guest" | "participant" | "organizer">("guest");
  const [userName, setUserName] = useState("User");
  const [userAvatar, setUserAvatar] = useState("");

  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    setMounted(true);

    const role = localStorage.getItem("userRole") as "guest" | "participant" | "organizer" | null;
    const name = localStorage.getItem("userName");
    const avatar = localStorage.getItem("userAvatar");

    if (role === "participant" || role === "organizer") {
      setUserRole(role);
    }
    if (name) {
      setUserName(name);
    }
    if (avatar) {
      setUserAvatar(avatar);
    }
  }, []);

  const getNavLinks = () => {
    if (userRole === "organizer") {
      return [
        { href: "/", label: "Home" },
        { href: "/organizer/general", label: "General" },
        { href: "/organizer/event", label: "My Events" },
      ];
    }

    const baseLinks = [
      { href: "/", label: "Home" },
      { href: "/events", label: "Browse Events" },
      { href: "/about", label: "About" },
    ];

    if (userRole === "participant") {
      return [...baseLinks, { href: "/participant/overview", label: "Overview" }];
    }

    return baseLinks; // guest
  };

  const navLinks = mounted ? getNavLinks() : [];

  const getLinkClass = (href: string) => {
    if (!mounted) return "text-muted-foreground hover:text-foreground hover:bg-muted/50";
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return isActive
      ? "text-foreground bg-muted/50"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50";
  };

  // ========================
  // ORGANIZER HEADER (Clean fixed top bar)
  // ========================
  if (userRole === "organizer") {
    return (
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/emh_logo.png"
                alt="Event Match Hub"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                EVENT MATCH HUB
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${getLinkClass(
                    link.href
                  )}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

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

              {/* User Avatar Dropdown */}
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
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/organizer/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
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

          {/* Mobile Navigation for Organizer */}
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
              </nav>
            </div>
          )}
        </div>
      </header>
    );
  }

  // ========================
  // DEFAULT HEADER (Guest & Participant)
  // ========================
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 shadow-sm z-50">
      <div className="container mx-auto px-4 relative z-50">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/emh_logo.png"
              alt="Event Match Hub"
              className="w-10 h-10 object-contain"
            />
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
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${getLinkClass(
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
                {/* Notification Bell (for logged-in participant) */}
                <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </Button>

                {/* User Dropdown */}
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
                      <Link href="/participant/account-settings">
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

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 h-5" /> : <Menu className="h-5 h-5" />}
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


// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import {
//   Bell,
//   Plus,
//   Settings,
//   LogOut,
//   User,
//   Menu,
//   X,
//   FolderOpen,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { Badge } from "../ui/badge";
// import { Calendar, Award, Sparkles } from "lucide-react";

// // Dummy notifications matching your screenshot
// const dummyNotifications = [
//   { id: 1, title: "Event Reminders", message: "Get notified about upcoming events you're registered for", icon: Calendar, time: "Just now", read: false },
//   { id: 2, title: "New Events", message: "Receive updates about new events in your interests", icon: Sparkles, time: "2 hours ago", read: false },
//   { id: 3, title: "Certificate Updates", message: "Get notified when new certificates are issued", icon: Award, time: "1 day ago", read: true },
//   { id: 4, title: "Marketing Emails", message: "Receive news, tips, and special offers", icon: Bell, time: "3 days ago", read: true },
//   { id: 5, title: "Event Updates", message: "Changes to events you're attending", icon: Calendar, time: "5 hours ago", read: false },
//   { id: 6, title: "Messages", message: "New messages from organizers", icon: Bell, time: "Yesterday", read: false },
// ];

// export function SiteHeader() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [userRole, setUserRole] = useState<"guest" | "participant" | "organizer">("guest");
//   const [userName, setUserName] = useState("User");
//   const [userAvatar, setUserAvatar] = useState("");
//   const [notificationsOpen, setNotificationsOpen] = useState(false);
//   const [notifications, setNotifications] = useState(dummyNotifications);

//   const router = useRouter();
//   const pathname = usePathname();

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

//     // Load notification read status
//     const saved = localStorage.getItem("notificationsRead");
//     if (saved) {
//       const readIds = JSON.parse(saved);
//       setNotifications(prev => prev.map(n => ({ ...n, read: readIds.includes(n.id) })));
//     }

//     // Listen for profile updates
//     const updateUser = () => {
//       const updatedName = localStorage.getItem("userName") || "User";
//       const updatedAvatar = localStorage.getItem("userAvatar") || "";
//       setUserName(updatedName);
//       setUserAvatar(updatedAvatar);
//     };

//     window.addEventListener("profileUpdated", updateUser);
//     window.addEventListener("storage", updateUser);

//     return () => {
//       window.removeEventListener("profileUpdated", updateUser);
//       window.removeEventListener("storage", updateUser);
//     };
//   }, []);

//   const unreadCount = notifications.filter(n => !n.read).length;

//   const markAsRead = (id: number) => {
//     setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
//     const readIds = notifications.filter(n => n.read || n.id === id).map(n => n.id);
//     localStorage.setItem("notificationsRead", JSON.stringify(readIds));
//   };

//   const markAllAsRead = () => {
//     setNotifications(prev => prev.map(n => ({ ...n, read: true })));
//     localStorage.setItem("notificationsRead", JSON.stringify(notifications.map(n => n.id)));
//   };

//   const getNavLinks = () => {
//     if (userRole === "organizer") {
//       return [
//         { href: "/", label: "Home" },
//         { href: "/organizer/general", label: "General" },
//         { href: "/organizer/event", label: "My Events" },
//       ];
//     }

//     const baseLinks = [
//       { href: "/", label: "Home" },
//       { href: "/events", label: "Browse Events" },
//       { href: "/about", label: "About" },
//     ];

//     if (userRole === "participant") {
//       return [...baseLinks, { href: "/participant/overview", label: "Overview" }];
//     }

//     return baseLinks;
//   };

//   const navLinks = mounted ? getNavLinks() : [];

//   const getLinkClass = (href: string) => {
//     if (!mounted) return "text-muted-foreground hover:text-foreground hover:bg-muted/50";
//     const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
//     return isActive
//       ? "text-foreground bg-muted/50"
//       : "text-muted-foreground hover:text-foreground hover:bg-muted/50";
//   };

//   // Organizer Header
//   if (userRole === "organizer") {
//     return (
//       <>
//         <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 shadow-sm">
//           {/* ... organizer header code unchanged ... */}
//           {/* (Keep your existing organizer header code here) */}
//         </header>

//         {/* Notifications Modal */}
//         <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
//           {/* Modal content from previous message */}
//         </Dialog>
//       </>
//     );
//   }

//   // Default Header (Guest & Participant)
//   return (
//     <>
//       <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 shadow-sm z-50">
//         <div className="container mx-auto px-4 relative z-50">
//           <div className="flex h-16 items-center justify-between">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
//               <img src="/emh_logo.png" alt="Event Match Hub" className="w-10 h-10 object-contain" />
//               <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-900">
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

//             {/* Right Side Actions */}
//             <div className="flex items-center gap-2">
//               {userRole === "guest" ? (
//                 <>
//                   <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
//                     <Link href="/login">Sign In</Link>
//                   </Button>
//                   <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90" asChild>
//                     <Link href="/signup">Get Started</Link>
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   {/* Notification Bell with Modal */}
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="relative hidden sm:inline-flex"
//                     onClick={() => setNotificationsOpen(true)}
//                   >
//                     <Bell className="h-5 w-5" />
//                     {unreadCount > 0 && (
//                       <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
//                     )}
//                   </Button>

//                   {/* User Dropdown */}
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="rounded-full p-1">
//                         <Avatar className="h-9 w-9">
//                           <AvatarImage src={userAvatar} alt={userName} />
//                           <AvatarFallback className="bg-purple-100 text-purple-700">
//                             {userName.charAt(0).toUpperCase()}
//                           </AvatarFallback>
//                         </Avatar>
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-56 z-[999]">
//                       <DropdownMenuLabel>
//                         <div className="flex flex-col space-y-1">
//                           <p className="text-sm font-medium leading-none">{userName}</p>
//                           <p className="text-xs leading-none text-muted-foreground">
//                             Participant Account
//                           </p>
//                         </div>
//                       </DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem asChild>
//                         <Link href="/participant/profile">
//                           <User className="mr-2 h-4 w-4" /> Profile
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem asChild>
//                         <Link href="/participant/portfolios">
//                           <FolderOpen className="mr-2 h-4 w-4" /> Portfolio
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem asChild>
//                         <Link href="/participant/account-settings">
//                           <Settings className="mr-2 h-4 w-4" /> Settings
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem onClick={handleLogout} className="text-red-600">
//                         <LogOut className="mr-2 h-4 w-4" /> Log out
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </>
//               )}

//               {/* Mobile Menu Toggle */}
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

//           {/* Mobile Navigation */}
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

//                 {userRole === "guest" && (
//                   <>
//                     <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
//                       Sign In
//                     </Link>
//                     <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
//                       Get Started
//                     </Link>
//                   </>
//                 )}
//               </nav>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Notifications Modal */}
//       <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
//         <DialogContent className="sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle className="flex items-center justify-between">
//               Notifications
//               {unreadCount > 0 && (
//                 <Badge variant="destructive">{unreadCount} New</Badge>
//               )}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 max-h-96 overflow-y-auto">
//             {notifications.map((notif) => {
//               const Icon = notif.icon;
//               return (
//                 <div
//                   key={notif.id}
//                   className={`p-4 rounded-lg border ${notif.read ? "bg-muted/50" : "bg-background border-primary/20"}`}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className={`p-2 rounded-full ${notif.read ? "bg-muted" : "bg-primary/10"}`}>
//                       <Icon className={`w-5 h-5 ${notif.read ? "text-muted-foreground" : "text-primary"}`} />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className={`font-medium ${notif.read ? "text-muted-foreground" : ""}`}>
//                         {notif.title}
//                       </h4>
//                       <p className={`text-sm ${notif.read ? "text-muted-foreground" : "text-foreground"}`}>
//                         {notif.message}
//                       </p>
//                       <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {unreadCount > 0 && (
//             <div className="border-t pt-4">
//               <Button variant="outline" size="sm" className="w-full" onClick={markAllAsRead}>
//                 Mark all as read
//               </Button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }