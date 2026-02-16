"use client";

import { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { tasteFilterOptions } from "@/data/recipes";
import type { TasteProfile } from "@/types/recipe";

function ExpandableChips({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: (expanded: boolean) => React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-1.5">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground/70"
      >
        {label}
        {count > 0 && (
          <span className="bg-brand-500 text-white text-[10px] rounded-full px-1.5 leading-4">
            {count}
          </span>
        )}
        <ChevronDown
          className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {children(expanded)}
    </div>
  );
}

interface RecipeFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedTastes: (keyof TasteProfile)[];
  onTasteToggle: (taste: keyof TasteProfile) => void;
  ingredientOptions: { name: string; icon: string }[];
  selectedIngredients: string[];
  onIngredientToggle: (name: string) => void;
  resultCount: number;
}

export function RecipeFilter({
  search,
  onSearchChange,
  selectedTastes,
  onTasteToggle,
  ingredientOptions,
  selectedIngredients,
  onIngredientToggle,
  resultCount,
}: RecipeFilterProps) {
  return (
    <div className="px-4 space-y-3">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="소스 조합, 레시피 검색..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-card border border-border rounded-xl py-3 pl-10 pr-10 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Taste filter chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-medium text-muted-foreground/70">맛</span>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {tasteFilterOptions.map((taste) => (
            <button
              key={taste.key}
              onClick={() => onTasteToggle(taste.key)}
              className={`shrink-0 px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                selectedTastes.includes(taste.key)
                  ? "bg-brand-500 text-white"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              {taste.icon} {taste.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient filter chips (expandable) */}
      {ingredientOptions.length > 0 && (
        <ExpandableChips
          label="재료"
          count={selectedIngredients.length}
        >
          {(expanded) => (
            <div
              className={
                expanded
                  ? "flex flex-wrap gap-1.5"
                  : "flex gap-1.5 overflow-x-auto scrollbar-hide pb-1"
              }
            >
              {ingredientOptions.map((ing) => (
                <button
                  key={ing.name}
                  onClick={() => onIngredientToggle(ing.name)}
                  className={`shrink-0 px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                    selectedIngredients.includes(ing.name)
                      ? "bg-brand-500 text-white"
                      : "bg-card text-muted-foreground border border-border"
                  }`}
                >
                  {ing.icon} {ing.name}
                </button>
              ))}
            </div>
          )}
        </ExpandableChips>
      )}

      {/* Result count */}
      <div className="flex items-center justify-end">
        <span className="text-xs text-muted-foreground">
          <span className="text-brand-500 font-bold">{resultCount}</span>개
          레시피
        </span>
      </div>
    </div>
  );
}
