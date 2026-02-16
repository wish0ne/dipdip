import type { Recipe } from "@/types/recipe";

export function toRecipe(row: Record<string, unknown>): Recipe {
  return {
    id: row.id as string,
    name: row.name as string,
    author: row.author as string,
    description: row.description as string,
    ingredients: row.ingredients as Recipe["ingredients"],
    tasteProfile: row.taste_profile as Recipe["tasteProfile"],
    tags: row.tags as string[],
    pairings: row.pairings as string[],
    likes: row.likes as number,
    comments: row.comments as number,
    createdAt: row.created_at as string,
  };
}
