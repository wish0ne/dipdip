import Link from "next/link";
import type { Recipe } from "@/types/recipe";

function formatLikes(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <article className="bg-card rounded-2xl p-4 border border-border hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold text-foreground truncate">
              {recipe.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {recipe.author}
            </p>
          </div>
          <div className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center text-xl shrink-0 ml-3">
            🍲
          </div>
        </div>

        <p className="text-[13px] text-muted-foreground mt-2.5 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex gap-1.5 mt-2.5 flex-wrap">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-brand-500 bg-brand-50 px-2.5 py-0.5 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-3 pt-2.5 border-t border-border">
          <span className="text-xs text-muted-foreground">
            ❤️ {formatLikes(recipe.likes)}
          </span>
          <span className="text-xs text-muted-foreground">
            💬 {recipe.comments}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">📤</span>
        </div>
      </article>
    </Link>
  );
}
