"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Editorial Inquiry',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Editorial Inquiry', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#718074]">
          <Link href="/" className="hover:text-[#1E4D30]">Home</Link>
          <span>/</span>
          <span className="text-[#1a281e] font-medium">Contact Editorial Team</span>
        </div>

        {/* Section Heading */}
        <div className="border-b border-[#ded5c5] pb-6 mb-8">
          <span className="text-xs font-semibold text-[#8B6B3E] uppercase tracking-widest">
            Inquiries & Scientific Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#14261B] mt-2 mb-3">
            Contact PatientScure
          </h1>
          <p className="text-sm sm:text-base text-[#4d5c50] leading-relaxed">
            Have a question about our research, an Ayurvedic remedy, a source we have cited, or something you believe should be corrected? We welcome constructive feedback, source suggestions, and insights from qualified Ayurvedic practitioners and knowledgeable readers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="md:col-span-7 bg-white rounded-xl border border-[#ded5c5] p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-editorial font-bold text-lg text-[#16271b] mb-2">Message Delivered Successfully</h3>
                <p className="text-xs sm:text-sm text-[#546457] leading-relaxed max-w-sm mx-auto mb-6">
                  Thank you for contacting PatientScure. Your message has been received. We review research feedback, source suggestions, and reader inquiries and will respond when a response is appropriate.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Editorial Inquiry', message: '' });
                  }}
                  className="px-4 py-2 bg-[#1E4D30] text-white text-xs font-semibold rounded cursor-pointer hover:bg-[#163a24] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block font-semibold text-[#223326] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-[#192b1e] placeholder-[#8f9b91] focus:outline-none focus:border-[#1E4D30]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#223326] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-[#192b1e] placeholder-[#8f9b91] focus:outline-none focus:border-[#1E4D30]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#223326] mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-[#192b1e] focus:outline-none focus:border-[#1E4D30]"
                  >
                    <option value="Editorial Inquiry">Research & Content Feedback</option>
                    <option value="Remedy Suggestion">Ayurvedic Remedy / Nuskha Suggestion</option>
                    <option value="Practitioner Collaboration">Ayurvedic Expert Feedback</option>
                    <option value="General Question">General Reader Question</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#223326] mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, reference request, or feedback..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#d8d0c2] rounded-lg text-[#192b1e] placeholder-[#8f9b91] focus:outline-none focus:border-[#1E4D30]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#1E4D30] hover:bg-[#163a24] disabled:bg-[#a0b59f] text-white font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <Send size={15} />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office & Direct Contact Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#FAF7F0] rounded-xl border border-[#ded5c5] p-6 text-xs sm:text-sm">
              <h3 className="font-editorial font-bold text-lg text-[#16271b] mb-4 pb-2 border-b border-[#e2d9cb]">
                Contact & Feedback
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#1E4D30] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1f2f22]">Editorial Contact</div>
                    <a href="mailto:hello@patientscure.com" className="text-[#1E4D30] hover:underline">
                      hello@patientscure.com
                    </a>
                  </div>
                </div>

                {/* <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#1E4D30] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1f2f22]">About PatientScure</div>
                    <div className="text-[#59695d]">PatientScure is an independent health-information website. We do not maintain a public office or physical visitor address. Our content is developed through research of publicly available sources, traditional Ayurvedic knowledge, and insights from Ayurvedic experts. For editorial or research-related communication, please use the email address above.</div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#ded5c5] p-6 text-xs text-[#5a6a5d] leading-relaxed">
              <h4 className="font-bold text-[#1d2d20] mb-2 uppercase tracking-wide">
                Please Note: Emergency Care
              </h4>
              <p>
                PatientScure is an educational health-information website and does not provide medical diagnosis, treatment, emergency care, or individual clinical consultation. Information on this website is intended for general educational purposes and should not replace advice from a qualified healthcare professional. If you have an urgent or serious medical concern, contact an appropriate healthcare professional or local emergency medical service.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
