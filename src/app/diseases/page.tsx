import { ContentService } from "@/services/contentService";
import { DiseasesListClient } from "@/components/DiseasesListClient";
import { DISEASES } from "@/data/mockData";

export const revalidate = 600;

export default async function DiseasesPage() {
  let diseases: Awaited<ReturnType<typeof ContentService.getAllDiseases>> = [];
  try {
    diseases = await ContentService.getAllDiseases();
    if (!diseases.length) diseases = DISEASES;
  } catch (e) {
    console.error("Failed to load diseases:", e);
    diseases = DISEASES;
  }
  return <DiseasesListClient initialDiseases={diseases} />;
}
