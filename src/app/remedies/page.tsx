import { ContentService } from "@/services/contentService";
import { RemediesListClient } from "@/components/RemediesListClient";
import { REMEDIES } from "@/data/mockData";

export const revalidate = 600;

export default async function RemediesPage() {
  let remedies: Awaited<ReturnType<typeof ContentService.getAllRemedies>> = [];
  try {
    remedies = await ContentService.getAllRemedies();
    if (!remedies.length) remedies = REMEDIES;
  } catch (e) {
    console.error("Failed to load remedies:", e);
    remedies = REMEDIES;
  }
  return <RemediesListClient initialRemedies={remedies} />;
}
