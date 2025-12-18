"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  LayoutList,
  Grid3X3,
  Plus,
  Calendar,
  MapPin,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: "Technology" | "Business";
  registered: number;
  capacity: number;
  price: string;
  status: "Active" | "Draft" | "Completed";
}

const allEvents: Event[] = [
  {
    id: "1",
    title: "AI & Machine Learning Summit 2025",
    date: "Monday, October 22, 2025",
    location: "CADT",
    category: "Technology",
    registered: 100,
    capacity: 120,
    price: "$2.00",
    status: "Active",
  },
  {
    id: "2",
    title: "Digital Marketing Conference 2025",
    date: "Wednesday, November 5, 2025",
    location: "RUPP Convention Center",
    category: "Business",
    registered: 85,
    capacity: 100,
    price: "$5.00",
    status: "Active",
  },
  {
    id: "3",
    title: "Web Development Bootcamp",
    date: "Friday, September 12, 2025",
    location: "Online",
    category: "Technology",
    registered: 150,
    capacity: 200,
    price: "Free",
    status: "Draft",
  },
  {
    id: "4",
    title: "Startup Pitch Competition",
    date: "Saturday, August 30, 2025",
    location: "Phnom Penh",
    category: "Business",
    registered: 45,
    capacity: 50,
    price: "$10.00",
    status: "Completed",
  },
];

const categoryOptions = ["all", "Technology", "Business"] as const;
type CategoryOption = typeof categoryOptions[number];
type ViewMode = "list" | "card";
type Tab = "all" | "active" | "completed";

export function EventsList() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEvents = allEvents.filter((event) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && event.status === "Active") ||
      (activeTab === "completed" && event.status === "Completed");
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesTab && matchesSearch && matchesCategory;
  });

  const handleAction = (action: string, event: Event) => {
    alert(`You clicked "${action}" on "${event.title}"`);
    setOpenMenuId(null);
  };

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const getCategoryLabel = (cat: CategoryOption) => {
    return cat === "all" ? "All Categories" : cat;
  };

  const ActionMenu = ({ event }: { event: Event }) => (
    <div className="absolute right-0 top-full mt-3 w-56 bg-card border border-border rounded-2xl shadow-2xl py-3 z-[9999]">
      {["View", "Edit", "Copy Link", "Duplicate"].map((action) => (
        <button
          key={action}
          onClick={() => handleAction(action.toLowerCase().replace(" ", "-"), event)}
          className="w-full px-6 py-3 text-left text-base hover:bg-muted transition"
        >
          {action}
        </button>
      ))}
      <div className="border-t border-border mx-4 my-2" />
      <button
        onClick={() => handleAction("delete", event)}
        className="w-full px-6 py-3 text-left text-base text-destructive hover:bg-destructive/10 transition"
      >
        Delete
      </button>
    </div>
  );
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div ref={containerRef} className="w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 pt-24">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Events</h1>
              <p className="text-lg sm:text-xl text-muted-foreground mt-3">
                Manage and browse all your events
              </p>
            </div>
            <button
            onClick={() => router.push("/organizer/event/create")}  
            className="flex items-center gap-4 px-6 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition shadow-xl font-semibold text-lg whitespace-nowrap"
            >
              <Plus size={24} />
              Create Event
            </button>
          </div>

          {/* Search + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={24} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border border-border rounded-2xl bg-background focus:outline-none focus:ring-4 focus:ring-primary/30 transition text-base"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full flex items-center justify-between gap-6 px-6 py-4 border border-border rounded-2xl bg-background hover:bg-muted transition"
              >
                <span className="font-medium text-lg">{getCategoryLabel(selectedCategory)}</span>
                <ChevronDown
                  size={24}
                  className={`transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-card border border-border rounded-2xl shadow-2xl py-3 z-[9999]">
                  {categoryOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedCategory(option);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-base hover:bg-muted transition flex items-center justify-between"
                    >
                      {getCategoryLabel(option)}
                      {selectedCategory === option && <Check size={22} className="text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* View Mode + Tabs */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="flex bg-muted/50 rounded-2xl p-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition font-medium text-base ${
                    viewMode === "list"
                      ? "bg-background text-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutList size={22} /> List
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition font-medium text-base ${
                    viewMode === "card"
                      ? "bg-background text-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3X3 size={22} /> Card
                </button>
              </div>
            </div>

            <div className="flex bg-muted/50 rounded-2xl p-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-8 py-3 rounded-xl text-base font-medium transition ${
                  activeTab === "all"
                    ? "bg-background text-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`px-8 py-3 rounded-xl text-base font-medium transition ${
                  activeTab === "active"
                    ? "bg-background text-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-8 py-3 rounded-xl text-base font-medium transition ${
                  activeTab === "completed"
                    ? "bg-background text-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* List View */}
          {viewMode === "list" && (
            <div className="w-full bg-card border border-border rounded-3xl shadow-xl overflow-visible">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-muted/30 border-b border-border">
                    <tr>
                      <th className="text-left px-8 py-6 text-base font-semibold text-muted-foreground">Event</th>
                      <th className="text-left px-8 py-6 text-base font-semibold text-muted-foreground">Category</th>
                      <th className="text-left px-8 py-6 text-base font-semibold text-muted-foreground">Registered</th>
                      <th className="text-left px-8 py-6 text-base font-semibold text-muted-foreground">Price</th>
                      <th className="text-left px-8 py-6 text-base font-semibold text-muted-foreground">Status</th>
                      <th className="px-8 py-6"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="border-b border-border hover:bg-muted/20 transition">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center flex-shrink-0">
                              <Calendar size={36} className="text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground text-xl">{event.title}</h3>
                              <p className="text-base text-muted-foreground flex items-center gap-3 mt-1">
                                <Calendar size={18} /> {event.date}
                                <span className="mx-2">•</span>
                                <MapPin size={18} /> {event.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`px-5 py-2 rounded-full text-sm font-semibold ${
                              event.category === "Technology"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {event.category}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-5">
                            <span className="font-bold text-xl">
                              {event.registered}/{event.capacity}
                            </span>
                            <div className="w-40 bg-muted/30 rounded-full h-4">
                              <div
                                className="bg-primary h-4 rounded-full transition-all"
                                style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-3xl font-bold text-primary">{event.price}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`px-5 py-2 rounded-full text-sm font-semibold ${
                              event.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : event.status === "Draft"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 relative">
                          <button
                            onClick={() => toggleMenu(event.id)}
                            className="p-4 hover:bg-muted rounded-2xl transition"
                          >
                            <MoreVertical size={26} />
                          </button>
                          {openMenuId === event.id && <ActionMenu event={event} />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Card View */}
          {viewMode === "card" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative bg-card border border-border rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {/* 3 Dots Menu - Always Visible */}
                  <div className="absolute top-6 right-6 z-[9999]">
                    <button
                      onClick={() => toggleMenu(event.id)}
                      className="p-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl transition shadow-lg border border-border"
                    >
                      <MoreVertical size={26} />
                    </button>
                    {openMenuId === event.id && <ActionMenu event={event} />}
                  </div>

                  {/* Card Content */}
                  <div className="p-8 pt-20">
                    <div className="w-full h-56 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl mb-8 flex items-center justify-center">
                      <Calendar size={96} className="text-primary/50" />
                    </div>

                    <h3 className="font-bold text-2xl text-foreground mb-5 line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-lg text-muted-foreground mb-8 flex items-center gap-4">
                      <Calendar size={22} /> {event.date}
                      <span className="mx-3">•</span>
                      <MapPin size={22} /> {event.location}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                      <span
                        className={`px-6 py-3 rounded-full text-base font-semibold ${
                          event.category === "Technology"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {event.category}
                      </span>
                      <span
                        className={`px-6 py-3 rounded-full text-base font-semibold ${
                          event.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : event.status === "Draft"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-center justify-between text-lg">
                        <span className="font-bold">
                          Registered: {event.registered}/{event.capacity}
                        </span>
                        <span className="text-muted-foreground">
                          {Math.round((event.registered / event.capacity) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-5">
                        <div
                          className="bg-primary h-5 rounded-full transition-all"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                      <div className="text-4xl font-bold text-primary">{event.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}