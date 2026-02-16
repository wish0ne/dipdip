import { Header } from "@/components/header";
import { RecipeFeed } from "@/components/recipe-feed";
import { supabase } from "@/lib/supabase";
import { toRecipe } from "@/lib/mappers";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false });

  const recipes = error || !data ? [] : data.map(toRecipe);

  return (
    <div className="pb-6">
      <Header />
      <RecipeFeed recipes={recipes} />
    </div>
  );
}
