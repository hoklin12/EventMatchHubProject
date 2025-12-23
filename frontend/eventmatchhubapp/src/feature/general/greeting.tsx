'use client'

export function Greeting() {
  // Dummy user data - matches your login dummy
  const user = {
    name: "Livita Touch",
  }

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold text-foreground mb-2">Hello, {user.name}</h1>
      <p className="text-muted-foreground">Manage and track all your events</p>
    </div>
  )
}