import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { BackToTop } from "@/components/BackToTop";

interface FooterPost {
  id: number;
  title: string;
  slug: string;
}

async function getLatestPosts(cpt: string, limit: number = 4): Promise<FooterPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL || "https://your-site.com/wp-json";
    const url = `${baseUrl}/wp/v2/${cpt}?per_page=${limit}&orderby=date&order=desc&_fields=id,title,slug`;
    
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${cpt}:`, res.status);
      return [];
    }

    const data = await res.json();
    return data.map((post: any) => ({
      id: post.id,
      title: post.title.rendered || post.title,
      slug: post.slug,
    }));
  } catch (error) {
    console.error(`Error fetching ${cpt}:`, error);
    return [];
  }
}

/** Server component: fetches latest posts from WordPress CPTs. */
export const Footer: React.FC = async () => {
  const diseasesPosts = await getLatestPosts("diseases", 4);
  const remediesPosts = await getLatestPosts("remedies", 4);
  return (
    <footer className="bg-[#14261B] text-[#D0DED4] pt-14 pb-10 border-t border-[#233d2c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#233f2d]">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              prefetch={false}
              aria-label="PatientsCure home"
              className="flex items-center gap-3 group"
            >
              <Image
                src="/images/logo.png"
                alt="PatientsCure"
                width={420}
                height={120}
                sizes="160px"
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
              {diseasesPosts.length > 0 ? (
                <>
                  {diseasesPosts.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/diseases/${post.slug}`}
                        prefetch={false}
                        className="hover:text-white hover:underline transition-colors"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/diseases" prefetch={false} className="text-[#64B584] hover:underline font-medium">
                      Browse All Conditions →
                    </Link>
                  </li>
                </>
              ) : (
                <li className="text-[#7a8a7e]">No conditions available</li>
              )}
            </ul>
          </div>

          {/* Column 3: Desi Nuskhe & Materia Medica */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              Remedies & Herbs
            </h4>
            <ul className="space-y-2 text-xs text-[#b8c9bd]">
              {remediesPosts.length > 0 ? (
                <>
                  {remediesPosts.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/remedies/${post.slug}`}
                        prefetch={false}
                        className="hover:text-white hover:underline transition-colors"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/remedies" prefetch={false} className="text-[#64B584] hover:underline font-medium">
                      Explore All Desi Nuskhe →
                    </Link>
                  </li>
                </>
              ) : (
                <li className="text-[#7a8a7e]">No remedies available</li>
              )}
            </ul>
          </div>

          {/* Column 4: Institutional & Legal */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              About & Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#b8c9bd]">
              <li>
                <Link href="/about" prefetch={false} className="hover:text-white transition-colors">
                  Our Editorial Board
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={false} className="hover:text-white transition-colors">
                  Contact Editors
                </Link>
              </li>
              <li>
                <Link href="/privacy" prefetch={false} className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" prefetch={false} className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Warning */}
        <div className="py-6 border-b border-[#233f2d] text-xs text-[#93a697] leading-relaxed">
          <strong className="text-[#b9ccc0] uppercase font-bold">Medical Disclaimer: </strong>
          PatientsCure provides evidence-informed classical Ayurvedic health information for educational purposes only. The articles, desi nuskhe formulations, and botanical profiles are not intended to substitute professional medical diagnosis, clinical consultation, or emergency care. Never disregard qualified medical advice or delay seeking care because of something you read on this website.
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#879b8c] gap-4">
          <div>
            © {new Date().getFullYear()} PatientsCure Health Publication. All rights reserved. Classical Samhita texts revered.
          </div>

          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
