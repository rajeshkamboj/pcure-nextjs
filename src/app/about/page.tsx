import type { Metadata } from "next";
import { About } from "@/views/About";

export const metadata: Metadata = {
  title: "About PatientsCure | Classical Ayurveda, Reviewed by Vaidyas",
  description:
    "PatientsCure presents classical Ayurvedic medicine drawn from the Brihat Trayi Samhitas and reviewed by accredited Ayurvedic clinicians.",
};

export default function AboutPage() {
  return <About />;
}
