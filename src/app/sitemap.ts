import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: recipes } = await supabase
    .from("recipes")
    .select("id, created_at");

  const recipeEntries: MetadataRoute.Sitemap = (recipes ?? []).map(
    (recipe) => ({
      url: `https://dipdip-silk.vercel.app/recipe/${recipe.id}`,
      lastModified: recipe.created_at,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [
    {
      url: "https://dipdip-silk.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...recipeEntries,
  ];
}
