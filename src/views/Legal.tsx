import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText } from 'lucide-react';

interface LegalProps {
  type: 'privacy' | 'terms';
  onNavigate?: (page: string) => void;
}

export const Legal: React.FC<LegalProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#718074]">
          <Link href="/" className="hover:text-[#1E4D30]">Home</Link>
          <span>/</span>
          <span className="text-[#1a281e] font-medium">{isPrivacy ? 'Privacy Policy' : 'Terms of Service'}</span>
        </div>

        {/* Section Heading */}
        <div className="border-b border-[#ded5c5] pb-6 mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest mb-1">
            <FileText size={14} />
            <span>Editorial Governance & Legal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#14261B]">
            {isPrivacy ? 'PatientScure Privacy Policy' : 'Terms of Service & Medical Disclaimer'}
          </h1>
          <p className="text-xs sm:text-sm text-[#637366] mt-2">
            Last updated: February 2026 • Effective immediately
          </p>
        </div>

        {/* Editorial Body */}
        <div className="bg-white rounded-xl border border-[#ded5c5] p-6 sm:p-10 shadow-xs space-y-6 text-sm text-[#38483c] leading-relaxed">
          {isPrivacy ? (
            <>
              <section className="space-y-3">
                <h2 className="font-editorial font-bold text-xl text-[#14261B]">1. Commitment to Health Data Privacy</h2>
                <p>
                  At PatientScure, we believe personal wellness research should remain private. We do not sell, rent, or monetize your health search queries, reading patterns, or contact records to third-party advertising syndicates, pharmaceutical insurers, or data aggregators.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-editorial font-bold text-xl text-[#14261B]">2. Information We Collect</h2>
                <p>
                  We only collect information that you deliberately provide—such as when contacting our medical editorial desk, submitting feedback on a Desi Nuskha, or subscribing to our weekly Ayurvedic digest. Technical data is limited to anonymous telemetry (such as page speed analytics and browser compatibility) strictly utilized to optimize site accessibility.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-editorial font-bold text-xl text-[#14261B]">3. Cookies & Local Storage</h2>
                <p>
                  We utilize minimal essential local storage to remember your reading bookmarks, preferred font sizing, and recently viewed monographs. No invasive cross-site tracking pixels or commercial retargeting cookies are loaded on PatientScure.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-editorial font-bold text-xl text-[#14261B]">4. Editorial Independence</h2>
                <p>
                  PatientScure is an independent knowledge publication. Any proprietary Ayurvedic product reviews or clinical trials cited in monographs are scrutinized against classical Brihat Trayi standards and free from sponsored pharmaceutical influence.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <h2 className="font-editorial font-bold text-xl text-[#14261B]">1. Non-Diagnostic Medical Notice</h2>
                <p>
                  All educational content, diagnostic descriptions (Roga Nidana), herbal profiles (Dravyaguna), and home remedies (Desi Nuskhe) published on PatientScure are compiled strictly for informational, cultural, and historical wellness enlightenment.
                </p>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 font-medium">
                  PatientScure does not formulate individual medical advice, suggest physician diagnosis, or prescribe pharmaceutical protocols. Always consult a licensed Ayurvedic physician (BAMS/MD) or your primary healthcare provider before commencing any herbal regimen or altering existing pharmaceutical treatments.
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="font-editorial font-bold text-xl text-[#14261B]">2. Safe Consumption of Home Remedies (Desi Nuskhe)</h2>
                <p>
                  While traditional Ayurvedic herbs possess millennia of clinical observation, individual bodily constitutions (Prakriti) and biological tolerances vary widely. You are responsible for inspecting raw ingredients for known personal allergies, ensuring the purity of sourced kitchen spices, and respecting contraindication warnings.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-editorial font-bold text-xl text-[#14261B]">3. Intellectual Property</h2>
                <p>
                  The structured monographs, synthesized clinical tables, and editorial commentaries curated on PatientScure are protected by international copyright laws. Classical Sanskrit verses (Shlokas) from Charaka Samhita and Sushruta Samhita reside in the public domain, but our editorial translations and synthesis are proprietary.
                </p>
              </section>
            </>
          )}

          <div className="pt-6 border-t border-[#f0ebd5] flex items-center gap-2 text-xs text-[#6e7d71]">
            <ShieldCheck size={16} className="text-[#1E4D30]" />
            <span>PatientScure Medical & Legal Standards Committee</span>
          </div>
        </div>

      </div>
    </div>
  );
};
