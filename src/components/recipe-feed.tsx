"use client";

import { useState, useMemo } from "react";
import { RecipeFilter } from "@/components/recipe-filter";
import { RecipeCard } from "@/components/recipe-card";
import type { Recipe, TasteProfile } from "@/types/recipe";

export function RecipeFeed({ recipes }: { recipes: Recipe[] }) {
  const [search, setSearch] = useState("");
  const [selectedTastes, setSelectedTastes] = useState<(keyof TasteProfile)[]>(
    []
  );
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleTasteToggle = (taste: keyof TasteProfile) => {
    setSelectedTastes((prev) =>
      prev.includes(taste) ? prev.filter((t) => t !== taste) : [...prev, taste]
    );
  };

  const handleIngredientToggle = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const ingredientOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of recipes) {
      for (const i of r.ingredients) {
        if (!map.has(i.name)) {
          map.set(i.name, i.icon);
        }
      }
    }
    return Array.from(map, ([name, icon]) => ({ name, icon })).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Text search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.ingredients.some((i) => i.name.toLowerCase().includes(q)) ||
          r.author.toLowerCase().includes(q)
      );
    }

    // Taste filter (recipes with high values in selected tastes >= 50)
    if (selectedTastes.length > 0) {
      result = result.filter((r) =>
        selectedTastes.every((taste) => r.tasteProfile[taste] >= 50)
      );
    }

    // Ingredient filter (AND logic — must contain all selected ingredients)
    if (selectedIngredients.length > 0) {
      result = result.filter((r) => {
        const recipeIngredientNames = r.ingredients.map((i) => i.name);
        return selectedIngredients.every((name) =>
          recipeIngredientNames.includes(name)
        );
      });
    }

    // Sort
    result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return result;
  }, [recipes, search, selectedTastes, selectedIngredients]);

  return (
    <>
      <RecipeFilter
        search={search}
        onSearchChange={setSearch}
        selectedTastes={selectedTastes}
        onTasteToggle={handleTasteToggle}
        ingredientOptions={ingredientOptions}
        selectedIngredients={selectedIngredients}
        onIngredientToggle={handleIngredientToggle}
        resultCount={filteredRecipes.length}
      />

      <div className="px-4 mt-4 flex flex-col gap-2">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🍲</div>
            <p className="text-muted-foreground text-sm">
              조건에 맞는 레시피가 없어요.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              필터를 조정해보세요!
            </p>
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </>
  );
}
