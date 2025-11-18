import { SiteHeader } from "../site-header"

interface HeaderProps {
  variant?: "default" | "participant" | "organizer"
  userName?: string
  userAvatar?: string
}

export function Header({ variant = "default", userName, userAvatar }: HeaderProps) {
  return <SiteHeader variant={variant} userName={userName} userAvatar={userAvatar} />
}
