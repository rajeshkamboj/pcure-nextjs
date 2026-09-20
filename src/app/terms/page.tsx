import type { Metadata } from "next";
import { Legal } from "@/views/Legal";

export const metadata: Metadata = {
  title: "Terms of Service | PatientsCure",
};

export default function TermsPage() {
  return <Legal type="terms" />;
}
