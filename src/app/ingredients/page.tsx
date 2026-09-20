import type { Metadata } from "next";
import { Ingredients } from "@/views/Ingredients";
import { ContentService } from "@/services/contentService";
import { toIngredientListItem } from "@/lib/listItems";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Classical Medicinal Plants, Spices & Herbs | PatientsCure",
  description:
    "The dravyaguna encyclopedia of Indian medicine: properties (Rasa, Guna, Virya, Vipaka), actions, safe dosage boundaries and classical clinical indications for individual herbs and spices.",
};

export default async function IngredientsPage() {
  const ingredients = await ContentService.getAllIngredients();

  return <Ingredients initialIngredients={ingredients.map(toIngredientListItem)} />;
}
