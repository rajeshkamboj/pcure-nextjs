import React from 'react';
import { ShieldCheck, BookOpen, HeartPulse, Users } from 'lucide-react';
import { AUTHORS } from '../data/mockData';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#718074]">
          <button onClick={() => onNavigate('home')} className="hover:text-[#1E4D30] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#1a281e] font-medium">About PatientScure</span>
        </div>

        {/* Hero Banner */}
        <div className="border-b border-[#ded5c5] pb-8 mb-10 text-center sm:text-left">
          <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">
            Our Purpose & Ethos
          </span>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#14261B] mt-2 mb-4 leading-tight">
            Restoring Authentic Classical Ayurveda to Modern Public Health
          </h1>
          <p className="text-base sm:text-lg text-[#4d5c50] leading-relaxed">
            PatientScure was founded to counter commercial dilution, pseudo-scientific claims, and oversimplified wellness fads. We present rigorous, classical Ayurvedic medicine derived directly from the Brihat Trayi Samhitas, reviewed by accredited Ayurvedic clinicians.
          </p>
        </div>

        {/* 3 Pillars Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl border border-[#ded5c5] p-6 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#EAF2ED] text-[#1E4D30] flex items-center justify-center mb-4">
              <BookOpen size={20} />
            </div>
            <h3 className="font-editorial font-bold text-lg text-[#16271b] mb-2">Classical Textual Rigor</h3>
            <p className="text-xs sm:text-sm text-[#4d5c50] leading-relaxed">
              Every pathological mechanism (Samprapti) and dietary rule (Pathya-Apathya) is anchored in foundational scriptures: Charaka, Sushruta, and Ashtanga Hridaya.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#ded5c5] p-6 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#EAF2ED] text-[#1E4D30] flex items-center justify-center mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-editorial font-bold text-lg text-[#16271b] mb-2">Vaidya Peer Review</h3>
            <p className="text-xs sm:text-sm text-[#4d5c50] leading-relaxed">
              All therapeutic recipes and herbal monographs undergo clinical verification by BAMS and MD (Ayurveda) doctors to ensure safety, accurate dosage, and contraindication notices.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#ded5c5] p-6 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#EAF2ED] text-[#1E4D30] flex items-center justify-center mb-4">
              <HeartPulse size={20} />
            </div>
            <h3 className="font-editorial font-bold text-lg text-[#16271b] mb-2">Modern Safety Standards</h3>
            <p className="text-xs sm:text-sm text-[#4d5c50] leading-relaxed">
              We explicitly identify 'red flag' emergency symptoms and advise readers when classical home remedies must yield to modern diagnostic emergency care.
            </p>
          </div>
        </div>

        {/* Editorial Board Section */}
        <div className="bg-white rounded-xl border border-[#ded5c5] p-6 sm:p-8 mb-12 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} className="text-[#1E4D30]" />
            <h2 className="text-xl sm:text-2xl font-editorial font-bold text-[#14261B]">
              Our Editorial & Clinical Board
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5a6a5d] mb-6">
            Meet the experienced Ayurvedic physicians who supervise, author, and fact-check our medical library.
          </p>

          <div className="space-y-6">
            {Object.values(AUTHORS).map((author) => (
              <div key={author.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-lg bg-[#FAF8F5] border border-[#e8e0d2]">
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className="w-16 h-16 rounded-full object-cover border border-[#ded5c5] shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="font-editorial font-bold text-lg text-[#16271b]">{author.name}</h3>
                  <div className="text-xs font-semibold text-[#8B6B3E] mb-1">{author.credentials}</div>
                  <div className="text-xs text-[#1E4D30] font-medium mb-2">{author.role}</div>
                  <p className="text-xs text-[#4f5f52] leading-relaxed">
                    Over 15+ years of clinical consultation and classical pharmacognosy practice, dedicated to providing ethical, unbiased health information.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-6 text-xs sm:text-sm text-amber-900 leading-relaxed">
          <h4 className="font-bold uppercase tracking-wider mb-2 text-amber-800">
            Important Medical Disclaimer
          </h4>
          <p>
            The content provided on PatientScure is intended strictly for educational, informational, and lifestyle purposes. It is not designed to replace individual medical diagnoses, physician examinations, or personalized prescription treatments. Always seek the advice of a qualified Ayurvedic doctor (Vaidya) or registered medical healthcare professional regarding any serious chronic illness.
          </p>
        </div>

      </div>
    </div>
  );
};
