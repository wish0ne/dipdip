import type { TasteProfile } from "@/types/recipe";

export type { TasteProfile } from "@/types/recipe";

export const tasteLabels: Record<keyof TasteProfile, { label: string; icon: string; color: string }> = {
  spicy: { label: "매운맛", icon: "🌶️", color: "var(--color-taste-spicy)" },
  nutty: { label: "고소함", icon: "🥜", color: "var(--color-taste-nutty)" },
  fresh: { label: "상큼함", icon: "🍋", color: "var(--color-taste-fresh)" },
  umami: { label: "감칠맛", icon: "🍖", color: "var(--color-taste-umami)" },
  salty: { label: "짠맛", icon: "🧂", color: "var(--color-taste-salty)" },
};

export const tasteFilterOptions = [
  { key: "spicy" as const, label: "매콤", icon: "🌶️" },
  { key: "nutty" as const, label: "고소", icon: "🥜" },
  { key: "fresh" as const, label: "상큼", icon: "🍋" },
  { key: "umami" as const, label: "감칠맛", icon: "🍖" },
  { key: "salty" as const, label: "짠맛", icon: "🧂" },
];
