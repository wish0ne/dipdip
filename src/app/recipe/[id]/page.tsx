import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toRecipe } from "@/lib/mappers";
import { TasteProfileChart } from "@/components/taste-profile";
import { ShareButton } from "./share-button";

export const dynamic = "force-dynamic";

const getRecipe = cache(async (id: string) => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return toRecipe(data);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);
  if (!recipe) return { title: "레시피를 찾을 수 없습니다" };
  return {
    title: `${recipe.name} - DipDip`,
    description: recipe.description,
    openGraph: {
      title: `${recipe.name} - DipDip 훠궈 소스 레시피`,
      description: recipe.description,
    },
  };
}

function formatLikes(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  const categoryLabels: Record<string, string> = {
    base: "베이스",
    oil: "오일",
    seasoning: "양념",
    topping: "토핑",
    herb: "허브",
  };

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
          <ShareButton recipeName={recipe.name} />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-3">
        <h1 className="text-xl font-extrabold mt-2">{recipe.name}</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          {recipe.author} · ❤️ {formatLikes(recipe.likes)} · 💬{" "}
          {recipe.comments}
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
        <section className="mt-6">
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
