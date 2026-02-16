"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Recipe } from "@/types/recipe";
import { TasteProfileChart } from "@/components/taste-profile";
import { ShareButton } from "@/components/share-button";
import { SaveImageButton } from "@/components/save-image-button";

const categoryLabels: Record<string, string> = {
  base: "베이스",
  oil: "오일",
  seasoning: "양념",
  topping: "토핑",
  herb: "허브",
};

export function RecipeDetailContent({ recipe }: { recipe: Recipe }) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pb-6">
      {/* Hero */}
      <div className="relative h-44 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
        <span className="text-6xl">🍲</span>
        <div className="absolute top-3 left-3">
          <Link
            href="/"
            className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium flex items-center gap-1 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로
          </Link>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <SaveImageButton
            targetRef={contentRef}
            fileName={recipe.name}
            className="bg-white/90 backdrop-blur-sm rounded-lg p-2 hover:bg-white transition-colors"
          />
          <ShareButton
            url={`/recipe/${recipe.id}`}
            recipeName={recipe.name}
          />
        </div>
      </div>

      {/* Content — capture area */}
      <div ref={contentRef} className="px-4 -mt-3 bg-background">
        <h1 className="text-xl font-extrabold mt-5">{recipe.name}</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          {recipe.author}
        </p>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          {recipe.description}
        </p>

        {/* Tags */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-brand-500 bg-brand-50 px-2.5 py-0.5 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Ingredients */}
        <section className="mt-6">
          <h2 className="text-[15px] font-bold mb-3">📝 재료 & 비율</h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {recipe.ingredients.map((ing, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 ${
                  i < recipe.ingredients.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <span className="text-xl">{ing.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-foreground">{ing.name}</span>
                  <span className="text-[11px] text-muted-foreground ml-1.5">
                    ({categoryLabels[ing.category]})
                  </span>
                </div>
                <span className="text-sm font-bold text-brand-500 shrink-0">
                  {ing.amount}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Taste Profile */}
        <section className="mt-6">
          <h2 className="text-[15px] font-bold mb-3">🎯 맛 프로필</h2>
          <div className="bg-card rounded-2xl border border-border p-4">
            <TasteProfileChart profile={recipe.tasteProfile} />
          </div>
        </section>

        {/* Pairings */}
        <section className="mt-6 pb-4">
          <h2 className="text-[15px] font-bold mb-3">
            🤝 이 소스와 잘 어울리는 재료
          </h2>
          <div className="flex gap-2 flex-wrap">
            {recipe.pairings.map((pairing) => (
              <span
                key={pairing}
                className="px-3.5 py-2 bg-card border border-border rounded-xl text-[13px] text-foreground"
              >
                {pairing}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
