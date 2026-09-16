import React from 'react';
import { Leaf, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, slug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14261B] text-[#D0DED4] pt-14 pb-10 border-t border-[#233d2c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#233f2d]">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded bg-[#255236] text-white flex items-center justify-center">
                <Leaf size={20} />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                Patient<span className="text-[#64B584]">Scure</span>
              </span>
            </div>

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
                <button
                  onClick={() => onNavigate('disease-detail', 'amlapitta-hyperacidity-acid-reflux')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Acid Reflux (Amlapitta)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disease-detail', 'sandhivata-osteoarthritis-joint-stiffness')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Joint Stiffness (Sandhivata)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disease-detail', 'kasa-pratishyaya-respiratory-congestion')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Respiratory Cough (Kasa)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disease-detail', 'anidra-sleep-deprivation-insomnia')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Insomnia (Anidra)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('diseases')}
                  className="text-[#64B584] hover:underline cursor-pointer font-medium"
                >
                  Browse All Conditions →
                </button>
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
                <button
                  onClick={() => onNavigate('remedy-detail', 'haldi-doodh-golden-turmeric-elixir')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Golden Milk (Haldi Doodh)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('remedy-detail', 'ardraka-deepana-ginger-lemon-relish')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Ginger Agni Relish (Ardraka)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ingredient-detail', 'ashwagandha-indian-ginseng')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Ashwagandha Root Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ingredient-detail', 'amla-indian-gooseberry')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Amalaki (Indian Gooseberry)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('remedies')}
                  className="text-[#64B584] hover:underline cursor-pointer font-medium"
                >
                  Explore All Desi Nuskhe →
                </button>
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
                <button onClick={() => onNavigate('about')} className="hover:text-white cursor-pointer transition-colors">
                  Our Editorial Board
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white cursor-pointer transition-colors">
                  Contact Editors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Medical Disclaimer Warning */}
        <div className="py-6 border-b border-[#233f2d] text-[11px] text-[#93a697] leading-relaxed">
          <strong className="text-[#b9ccc0] uppercase font-bold">Medical Disclaimer: </strong>
          PatientScure provides evidence-informed classical Ayurvedic health information for educational purposes only. The articles, desi nuskhe formulations, and botanical profiles are not intended to substitute professional medical diagnosis, clinical consultation, or emergency care. Never disregard qualified medical advice or delay seeking care because of something you read on this website.
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#879b8c] gap-4">
          <div>
            © {new Date().getFullYear()} PatientScure Health Publication. All rights reserved. Classical Samhita texts revered.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1e3926] hover:bg-[#254930] text-[#c2d6c7] text-xs transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
};
