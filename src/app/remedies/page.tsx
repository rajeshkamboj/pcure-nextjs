import type { Metadata } from "next";
import { Remedies } from "@/views/Remedies";
import { ContentService } from "@/services/contentService";
import { toRemedyListItem } from "@/lib/listItems";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Classical Desi Nuskhe (Home Remedies Library) | PatientsCure",
  description:
    "Time-tested home remedies made from spices, medicinal roots and herbal decoctions, with preparation methods, timing (Anupana), target dosha and contraindications.",
};

export default async function RemediesPage() {
  const remedies = await ContentService.getAllRemedies();

  return <Remedies initialRemedies={remedies.map(toRemedyListItem)} />;
}
