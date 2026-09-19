import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#14261B] text-[#D0DED4] pt-14 pb-10 border-t border-[#233d2c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#233f2d]">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <Image
                src="/images/logo.webp"
                alt="PatientsCure"
                width={420}
                height={120}
                className="h-auto w-[160px] brightness-0 invert"
              />
            </Link>

            <p className="text-xs text-[#a2b5a6] leading-relaxed max-w-sm">
              An evidence-informed Ayurvedic health publication and clinical directory. Dedicated to classical Samhita translations, peer-reviewed Desi Nuskhe, and botanical dravyaguna wisdom.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#8BB396] pt-1">
              <ShieldCheck size={16} />
              <span>Certified Classical Ayurvedic Editorial Board</span>
            </div>
          </div>

          {/* Column 2: Disease Monographs */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              Clinical Pathologies
            </h4>
            <ul className="space-y-2 text-xs text-[#b8c9bd]">
              <li>
                <Link
                  href="/diseases/amlapitta-hyperacidity-acid-reflux"
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Acid Reflux (Amlapitta)
                </Link>
              </li>
              <li>
                <Link
                  href="/diseases/sandhivata-osteoarthritis-joint-stiffness"
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Joint Stiffness (Sandhivata)
                </Link>
              </li>
              <li>
                <Link
                  href="/diseases/kasa-pratishyaya-respiratory-congestion"
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Respiratory Cough (Kasa)
                </Link>
              </li>
              <li>
                <Link
                  href="/diseases/anidra-sleep-deprivation-insomnia"
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Insomnia (Anidra)
                </Link>
              </li>
              <li>
                <Link href="/diseases" className="text-[#64B584] hover:underline cursor-pointer font-medium">
                  Browse All Conditions →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Desi Nuskhe & Materia Medica */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              Remedies & Herbs
            </h4>
            <ul className="space-y-2 text-xs text-[#b8c9bd]">
              <li>
                <Link
                  href="/remedies/haldi-doodh-golden-turmeric-elixir"
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Golden Milk (Haldi Doodh)
                </Link>
              </li>
              <li>
                <Link
                  href="/remedies/ardraka-deepana-ginger-lemon-relish"
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Ginger Agni Relish (Ardraka)
                </Link>
              </li>
              <li>
                <Link
                  href="/ingredients/ashwagandha-indian-ginseng"
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Ashwagandha Root Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/ingredients/amla-indian-gooseberry"
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Amalaki (Indian Gooseberry)
                </Link>
              </li>
              <li>
                <Link href="/remedies" className="text-[#64B584] hover:underline cursor-pointer font-medium">
                  Explore All Desi Nuskhe →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional & Legal */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              About & Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#b8c9bd]">
              <li>
                <Link href="/about" className="hover:text-white cursor-pointer transition-colors">
                  Our Editorial Board
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white cursor-pointer transition-colors">
                  Contact Editors
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Warning */}
        <div className="py-6 border-b border-[#233f2d] text-[11px] text-[#93a697] leading-relaxed">
          <strong className="text-[#b9ccc0] uppercase font-bold">Medical Disclaimer: </strong>
          PatientsCure provides evidence-informed classical Ayurvedic health information for educational purposes only. The articles, desi nuskhe formulations, and botanical profiles are not intended to substitute professional medical diagnosis, clinical consultation, or emergency care. Never disregard qualified medical advice or delay seeking care because of something you read on this website.
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#879b8c] gap-4">
          <div>© {new Date().getFullYear()} PatientsCure Health Publication. All rights reserved. Classical Samhita texts revered.</div>

          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1e3926] hover:bg-[#254930] text-[#c2d6c7] text-xs transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
};
