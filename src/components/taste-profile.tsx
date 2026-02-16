"use client";

import type { TasteProfile } from "@/data/recipes";
import { tasteLabels } from "@/data/recipes";

const colorMap: Record<keyof TasteProfile, string> = {
  spicy: "bg-taste-spicy",
  nutty: "bg-taste-nutty",
  fresh: "bg-taste-fresh",
  umami: "bg-taste-umami",
  salty: "bg-taste-salty",
};

const textColorMap: Record<keyof TasteProfile, string> = {
  spicy: "text-taste-spicy",
  nutty: "text-taste-nutty",
  fresh: "text-taste-fresh",
  umami: "text-taste-umami",
  salty: "text-taste-salty",
};

export function TasteProfileChart({ profile }: { profile: TasteProfile }) {
  const entries = Object.entries(profile) as [keyof TasteProfile, number][];

  return (
    <div className="space-y-2.5">
      {entries.map(([key, value]) => {
        const { label } = tasteLabels[key];
        return (
          <div key={key} className="flex items-center gap-2.5">
            <span className="text-xs text-muted-foreground w-11 text-right font-medium">
              {label}
            </span>
            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${colorMap[key]}`}
                style={{ width: `${value}%` }}
              />
            </div>
            <span
              className={`text-xs font-bold w-7 text-right ${textColorMap[key]}`}
            >
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
