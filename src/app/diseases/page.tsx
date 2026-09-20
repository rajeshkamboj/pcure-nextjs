import type { Metadata } from "next";
import { Diseases } from "@/views/Diseases";
import { ContentService } from "@/services/contentService";
import { toDiseaseListItem } from "@/lib/listItems";

// ISR: re-generate at most every 10 minutes (must be a literal; keep in sync with WP_REVALIDATE_SECONDS).
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Ailment & Disease Directory (Roga Nidana) | PatientsCure",
  description:
    "In-depth Ayurvedic clinical guides on common disorders: root imbalances (Nidana), doshic pathogenesis (Samprapti), classical symptoms, dietary guidelines and physician-approved home remedies.",
};

export default async function DiseasesPage() {
  const diseases = await ContentService.getAllDiseases();

  return <Diseases initialDiseases={diseases.map(toDiseaseListItem)} />;
}
