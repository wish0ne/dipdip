/**
 * 레시피 데이터를 Supabase에 upsert하는 스크립트
 *
 * 사용법:
 *   npx tsx scripts/seed-recipes.ts
 *
 * recipes.json 파일을 수정한 뒤 이 스크립트를 실행하면
 * 새 레시피는 추가되고, 기존 레시피는 업데이트됩니다.
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

if (!url || !key) {
  console.error("환경변수를 설정해주세요 (.env.local):");
  console.error("  NEXT_PUBLIC_SUPABASE_URL");
  console.error("  SUPABASE_SECRET_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

const recipesPath = resolve(__dirname, "recipes.json");
const recipes = JSON.parse(readFileSync(recipesPath, "utf-8"));

async function seed() {
  console.log(`${recipes.length}개 레시피를 upsert합니다...\n`);

  const { data, error } = await supabase
    .from("recipes")
    .upsert(recipes, { onConflict: "id", ignoreDuplicates: false })
    .select("id, name");

  if (error) {
    console.error("Upsert 실패:", error.message);
    process.exit(1);
  }

  console.log(`${data.length}개 레시피 upsert 완료:`);
  for (const r of data) {
    console.log(`  [${r.id}] ${r.name}`);
  }
}

seed();
