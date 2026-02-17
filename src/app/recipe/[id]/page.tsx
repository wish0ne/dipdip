import { cache } from "react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toRecipe } from "@/lib/mappers";
import { RecipeDetailContent } from "./recipe-detail-content";
import { RecipeJsonLd } from "@/components/recipe-json-ld";

export const revalidate = 3600;

const getRecipe = cache(async (id: string) => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return toRecipe(data);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);
  if (!recipe) return { title: "레시피를 찾을 수 없습니다" };
  return {
    title: recipe.name,
    description: recipe.description,
    alternates: {
      canonical: `/recipe/${id}`,
    },
    openGraph: {
      title: `${recipe.name} - DipDip 훠궈 소스 레시피`,
      description: recipe.description,
      type: "article",
      url: `/recipe/${id}`,
      images: [{ url: "/logo.png", alt: recipe.name }],
    },
    twitter: {
      card: "summary",
      title: `${recipe.name} - DipDip`,
      description: recipe.description,
      images: ["/logo.png"],
    },
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <>
      <RecipeJsonLd recipe={recipe} />
      <RecipeDetailContent recipe={recipe} />
    </>
  );
}
