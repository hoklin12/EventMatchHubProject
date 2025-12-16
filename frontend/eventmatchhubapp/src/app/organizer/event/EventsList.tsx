'use client'

import { useState, useRef, useEffect } from 'react'
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
} from 'lucide-react'

interface Event {
  id: string
  title: string
  date: string
  location: string
  category: 'Technology' | 'Business'
  registered: number
  capacity: number
  price: string
  status: 'Active' | 'Draft' | 'Completed'
}

const allEvents: Event[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Summit 2025',
    date: 'Monday, October 22, 2025',
    location: 'CADT',
    category: 'Technology',
    registered: 100,
    capacity: 120,
    price: '$2.00',
    status: 'Active',
  },
  {
    id: '2',
    title: 'AI & Machine Learning Summit 2025',
    date: 'Monday, October 22, 2025',
    location: 'CADT',
    category: 'Technology',
    registered: 100,
    capacity: 120,
    price: '$2.00',
    status: 'Active',
  },
  {
    id: '3',
    title: 'AI & Machine Learning Summit 2025',
    date: 'Monday, October 22, 2025',
    location: 'CADT',
    category: 'Business',
    registered: 100,
    capacity: 120,
    price: '$2.00',
    status: 'Draft',
  },
  {
    id: '4',
    title: 'AI & Machine Learning Summit 2025',
    date: 'Monday, October 22, 2025',
    location: 'CADT',
    category: 'Technology',
    registered: 100,
    capacity: 120,
    price: '$2.00',
    status: 'Completed',
  },
]

const categoryOptions = ['all', 'Technology', 'Business'] as const
type CategoryOption = typeof categoryOptions[number]
type ViewMode = 'list' | 'card'
type Tab = 'all' | 'active' | 'completed'

export function EventsList() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>('all')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenMenuId(null)
        setIsCategoryDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredEvents = allEvents.filter((event) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && event.status === 'Active') ||
      (activeTab === 'completed' && event.status === 'Completed')

    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory

    return matchesTab && matchesSearch && matchesCategory
  })

  const handleAction = (action: string, event: Event) => {
    console.log(`Action: ${action} on event ID ${event.id}`, event)
    setOpenMenuId(null)
  }

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const ActionMenu = ({ event }: { event: Event }) => (
    <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
      <button
        onClick={() => handleAction('view', event)}
        className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition"
      >
        View
      </button>
      <button
        onClick={() => handleAction('edit', event)}
        className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition"
      >
        Edit
      </button>
      <button
        onClick={() => handleAction('copy-link', event)}
        className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition"
      >
        Copy Link
      </button>
      <button
        onClick={() => handleAction('duplicate', event)}
        className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition"
      >
        Duplicate
      </button>
      <button
        onClick={() => handleAction('delete', event)}
        className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10 transition"
      >
        Delete
      </button>
    </div>
  )

  const getCategoryLabel = (cat: CategoryOption) => {
    return cat === 'all' ? 'All Categories' : cat
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Events</h1>
        <button
          onClick={() => console.log('Navigate to create event page')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
        >
          <Plus size={20} />
          Create Event
        </button>
      </div>

      {/* Search + Category Dropdown */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search for events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="flex items-center justify-between gap-8 px-4 py-2 w-48 border border-border rounded-lg bg-background hover:bg-muted transition"
          >
            <span>{getCategoryLabel(selectedCategory)}</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-20">
              {categoryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedCategory(option)
                    setIsCategoryDropdownOpen(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition flex items-center justify-between"
                >
                  {getCategoryLabel(option)}
                  {selectedCategory === option && <Check size={16} className="text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Toggle + Tabs */}
      <div className="flex flex-col sm:flex-row justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-primary text-primary-foreground rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                viewMode === 'list' ? 'bg-primary-foreground text-primary shadow-sm' : 'opacity-70'
              }`}
            >
              <LayoutList size={18} /> List
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                viewMode === 'card' ? 'bg-primary-foreground text-primary shadow-sm' : 'opacity-70'
              }`}
            >
              <Grid3X3 size={18} /> Card
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'all' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'active' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'completed' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Event</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Registered</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id} className="border-b border-border hover:bg-muted/20 transition">
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar size={20} className="text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <Calendar size={14} /> {event.date}{' '}
                          <span className="mx-2">•</span>
                          <MapPin size={14} /> {event.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.category === 'Technology'
                          ? 'bg-muted text-foreground'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">
                        {event.registered}/{event.capacity}
                      </span>
                      <div className="w-24 bg-muted/30 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium">{event.price}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : event.status === 'Draft'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 relative">
                    <button
                      onClick={() => toggleMenu(event.id)}
                      className="p-2 hover:bg-muted rounded-lg transition"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openMenuId === event.id && <ActionMenu event={event} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View - Fixed title truncation + working menu + no cutoff */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
            >
              {/* Title + Three Dots Button */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-foreground text-lg flex-1 min-w-0 pr-4">
                  <span className="block truncate">{event.title}</span>
                </h3>
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(event.id)}
                    className="p-2 hover:bg-muted rounded-lg transition flex-shrink-0"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {openMenuId === event.id && <ActionMenu event={event} />}
                </div>
              </div>

              {/* Rest of card content */}
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                <Calendar size={14} /> {event.date}{' '}
                <span className="mx-2">•</span>
                <MapPin size={14} /> {event.location}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.category === 'Technology'
                      ? 'bg-muted text-foreground'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {event.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : event.status === 'Draft'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <div className="text-sm font-medium mb-2">
                Registered: {event.registered}/{event.capacity}
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2 mb-4">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                />
              </div>

              <div className="text-xl font-bold">{event.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}