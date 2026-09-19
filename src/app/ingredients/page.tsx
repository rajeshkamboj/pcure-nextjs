import { ContentService } from "@/services/contentService";
import { IngredientsListClient } from "@/components/IngredientsListClient";
import { INGREDIENTS } from "@/data/mockData";

export const revalidate = 600;

export default async function IngredientsPage() {
  let ingredients: Awaited<ReturnType<typeof ContentService.getAllIngredients>> = [];
  try {
    ingredients = await ContentService.getAllIngredients();
    if (!ingredients.length) ingredients = INGREDIENTS;
  } catch (e) {
    console.error("Failed to load ingredients:", e);
    ingredients = INGREDIENTS;
  }
  return <IngredientsListClient initialIngredients={ingredients} />;
}
