import { Home } from "lucide-react"
import { MAIN_SECTIONS } from "../../constants/wizardNavigation"

export function MainSection() {
  return (
<div className="px-4 pt-3 pb-4 border-b border-gray-200 w-full px-4 py-3 mb-3">

      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">Main</h4>

      <div className="space-y-0">
        {MAIN_SECTIONS.map((item) => (
          <a key={item.id} href="#" className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 py-2">
            <Home className="w-3 h-3" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
