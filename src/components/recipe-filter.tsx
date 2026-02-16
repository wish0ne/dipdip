"use client";

import { Search, X } from "lucide-react";
import { tasteFilterOptions } from "@/data/recipes";
import type { TasteProfile } from "@/data/recipes";

interface RecipeFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedTastes: (keyof TasteProfile)[];
  onTasteToggle: (taste: keyof TasteProfile) => void;
  sortBy: "popular" | "latest";
  onSortChange: (sort: "popular" | "latest") => void;
  resultCount: number;
}

export function RecipeFilter({
  search,
  onSearchChange,
  selectedTastes,
  onTasteToggle,
  sortBy,
  onSortChange,
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

      {/* Sort tabs + result count */}
      <div className="flex items-center justify-between">
        <div className="flex bg-muted rounded-lg p-0.5 gap-0.5">
          <button
            onClick={() => onSortChange("popular")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              sortBy === "popular"
                ? "bg-card text-foreground shadow-sm font-bold"
                : "text-muted-foreground"
            }`}
          >
            인기순
          </button>
          <button
            onClick={() => onSortChange("latest")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              sortBy === "latest"
                ? "bg-card text-foreground shadow-sm font-bold"
                : "text-muted-foreground"
            }`}
          >
            최신순
          </button>
        </div>
        <span className="text-xs text-muted-foreground">
          <span className="text-brand-500 font-bold">{resultCount}</span>개
          레시피
        </span>
      </div>
    </div>
  );
}
