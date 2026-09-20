import type { Metadata } from "next";
import { Legal } from "@/views/Legal";

export const metadata: Metadata = {
  title: "Privacy Policy | PatientsCure",
};

export default function PrivacyPage() {
  return <Legal type="privacy" />;
}
