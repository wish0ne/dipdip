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
  const [sortBy, setSortBy] = useState<"popular" | "latest">("popular");

  const handleTasteToggle = (taste: keyof TasteProfile) => {
    setSelectedTastes((prev) =>
      prev.includes(taste) ? prev.filter((t) => t !== taste) : [...prev, taste]
    );
  };

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

    // Sort
    if (sortBy === "popular") {
      result.sort((a, b) => b.likes - a.likes);
    } else {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [recipes, search, selectedTastes, sortBy]);

  return (
    <>
      <RecipeFilter
        search={search}
        onSearchChange={setSearch}
        selectedTastes={selectedTastes}
        onTasteToggle={handleTasteToggle}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultCount={filteredRecipes.length}
      />

      <div className="px-4 mt-4 space-y-3">
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
