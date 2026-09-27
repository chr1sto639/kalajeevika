import React from 'react';
import { X, Award, ShieldCheck, QrCode, Download, Share2, CheckCircle2, Feather, MapPin } from 'lucide-react';

export const CertificateModal = ({ craft, onClose, language = 'en' }) => {
  if (!craft) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateId = `KJ-CERT-${craft.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const issueDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FCFAF6] rounded-2xl shadow-2xl border-4 border-[#C85A32]/30 p-6 md:p-8 my-8 text-[#292524]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Outer Border Frame */}
        <div className="border-2 border-[#D97706]/40 p-6 rounded-xl relative bg-white shadow-inner">
          {/* Corner Ornamental Marks */}
          <div className="absolute top-2 left-2 text-[#C85A32] text-xs font-serif">❖</div>
          <div className="absolute top-2 right-2 text-[#C85A32] text-xs font-serif">❖</div>
          <div className="absolute bottom-2 left-2 text-[#C85A32] text-xs font-serif">❖</div>
          <div className="absolute bottom-2 right-2 text-[#C85A32] text-xs font-serif">❖</div>

          {/* Header */}
          <div className="text-center pb-4 border-b border-amber-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 border border-amber-300 text-terracotta-700 mb-2">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="font-display-royal text-xl md:text-2xl font-bold tracking-wider text-stone-900 uppercase">
              कलाजीविका • KALAJEEVIKA
            </h2>
            <p className="text-xs tracking-widest text-[#B64620] uppercase font-semibold mt-0.5">
              Official Certificate of Artisan Authenticity & Provenance
            </p>
            <p className="text-[10px] text-stone-400 font-mono mt-1">Certificate No: {certificateId}</p>
          </div>

          {/* Body Content */}
          <div className="py-5 space-y-4">
            <div className="text-center">
              <p className="text-xs text-stone-500 uppercase tracking-wider">This acknowledges that the masterwork</p>
              <h3 className="font-serif-craft text-lg md:text-xl font-bold text-terracotta-800 mt-1">
                "{craft.title}"
              </h3>
              <span className="inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                {craft.craftType} • {craft.giTag || 'GI Certified Regional Craft'}
              </span>
            </div>

            <div className="bg-[#FAF6EF] p-4 rounded-xl border border-stone-200 text-xs md:text-sm space-y-2">
              <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">Master Artisan / Creator:</span>
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  {craft.artisan?.name}
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">Village & Geotag:</span>
                <span className="font-semibold text-stone-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                  {craft.artisan?.village}, {craft.artisan?.state}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">Artisan Guild / Pehchan ID:</span>
                <span className="font-mono text-stone-800 font-semibold">{craft.artisan?.pehchanId || 'ART-IND-2024-Verified'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-stone-500 font-medium">Natural Raw Materials:</span>
                <span className="text-stone-800 font-medium text-right max-w-xs">{craft.materials?.join(', ')}</span>
              </div>
            </div>

            {/* Authenticity Guarantee statement */}
            <p className="text-center text-xs text-stone-600 italic px-4 leading-relaxed font-serif">
              "Certified 100% handcrafted with generational indigenous techniques. Free from mechanized reproduction or exploitative middlemen. Every purchase directly sustains the creator's family and rural heritage."
            </p>
          </div>

          {/* Footer Seals & Verification */}
          <div className="pt-4 border-t border-amber-200 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-stone-100 border border-stone-300 rounded-lg flex items-center justify-center p-1">
                <QrCode className="w-12 h-12 text-stone-800" />
              </div>
              <div className="text-[11px] text-stone-500 leading-tight">
                <p className="font-bold text-stone-800">Scan to Verify Provenance</p>
                <p>GI Indication Verified</p>
                <p className="text-[10px] text-stone-400">Date: {issueDate}</p>
              </div>
            </div>

            <div className="text-center">
              <div className="font-serif italic text-base text-terracotta-700 border-b border-stone-400 pb-0.5 px-4 font-bold">
                {craft.artisan?.name}
              </div>
              <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold block mt-1">
                Authorized Artisan Signatory
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 print:hidden">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${craft.title} - Kalajeevika Provenance`,
                  text: `Authentic handcrafted ${craft.craftType} by ${craft.artisan?.name} from ${craft.artisan?.village}.`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Craft Certificate link copied to clipboard!');
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Certificate</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-terracotta-600 hover:bg-terracotta-700 rounded-xl shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
