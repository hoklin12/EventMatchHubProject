import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface NavItemProps {
  icon: LucideIcon
  href: string
  isActive?: boolean
}

export function NavItem({ icon: Icon, href, isActive }: NavItemProps) {
  const pathname = usePathname()
  const active = isActive || pathname === href

  return (
    <Link
      href={href}
      className={`flex p-3 rounded-lg transition items-center justify-center ${
        active
          ? 'bg-primary-foreground text-primary'
          : 'text-primary-foreground hover:bg-primary-foreground hover:text-primary'
      }`}
    >
      <Icon
        size={20}
        className={active ? 'text-primary' : 'text-gray-400'}
      />
    </Link>
  )
}
