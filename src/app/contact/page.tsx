import type { Metadata } from "next";
import { Contact } from "@/views/Contact";

export const metadata: Metadata = {
  title: "Contact the Editorial Team | PatientsCure",
  description:
    "Questions about botanical citations, suggestions for a desi nuskha, or feedback on a clinical monograph? Contact the PatientsCure editorial board.",
};

export default function ContactPage() {
  return <Contact />;
}
