import type { Recipe } from "@/types/recipe";

export function RecipeJsonLd({ recipe }: { recipe: Recipe }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.description,
    author: {
      "@type": "Person",
      name: recipe.author,
    },
    recipeIngredient: recipe.ingredients.map(
      (i) => `${i.name} ${i.amount}`
    ),
    keywords: recipe.tags.join(", "),
    datePublished: recipe.createdAt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
