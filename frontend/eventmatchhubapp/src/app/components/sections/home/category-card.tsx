import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Category } from "@/app/types"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border border-gray-200 rounded-lg">
      <CardContent className="p-6 text-center space-y-2">
        <div className="text-4xl mb-2">{category.icon}</div>
        <h3 className="font-semibold">{category.name}</h3>
        <Badge variant="secondary" className={category.color}>
          {category.count} events
        </Badge>
      </CardContent>
    </Card>
  )
}
