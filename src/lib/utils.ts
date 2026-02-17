import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TasteProfile } from "@/types/recipe"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const tasteEmojis: Record<keyof TasteProfile, string> = {
  spicy: "🌶️",
  nutty: "🥜",
  fresh: "🍋",
  umami: "🍖",
  salty: "🧂",
};

export function getDominantTasteEmoji(profile: TasteProfile): string {
  let maxKey: keyof TasteProfile = "umami";
  let maxVal = -1;
  for (const key of Object.keys(tasteEmojis) as (keyof TasteProfile)[]) {
    if (profile[key] > maxVal) {
      maxVal = profile[key];
      maxKey = key;
    }
  }
  return tasteEmojis[maxKey];
}
