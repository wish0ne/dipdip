export interface Ingredient {
  name: string;
  amount: string;
  icon: string;
  category: "base" | "oil" | "seasoning" | "topping" | "herb";
}

export interface TasteProfile {
  spicy: number;
  nutty: number;
  fresh: number;
  umami: number;
  salty: number;
}

export interface Recipe {
  id: string;
  name: string;
  author: string;
  description: string;
  ingredients: Ingredient[];
  tasteProfile: TasteProfile;
  tags: string[];
  pairings: string[];
  likes: number;
  comments: number;
  createdAt: string;
}
