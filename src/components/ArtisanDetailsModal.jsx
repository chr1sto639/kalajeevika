import React, { useState } from 'react';
import { 
  X, MapPin, Phone, MessageSquare, Award, CheckCircle2, 
  QrCode, Wheat, Sparkles, ExternalLink, Copy, Check, ShieldCheck
} from 'lucide-react';

export const ArtisanDetailsModal = ({ artisan, craftTitle, craftPrice, onClose, language = 'en' }) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  if (!artisan) return null;

  const upiId = artisan.upiId || 'artisan.crafts@okhdfcbank';
  const cleanPhone = artisan.phone?.replace(/[^0-9]/g, '') || '919845211029';
  
  const whatsappMessage = encodeURIComponent(
    `Namaste ${artisan.name} ji! I saw your wonderful artwork "${craftTitle || 'Handicraft'}" on Kalajeevika. I would like to purchase it directly from you for ₹${craftPrice || 'fair price'}.`
  );

  // Real UPI deep link scheme
  const upiPayUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(artisan.name)}&am=${craftPrice || ''}&cu=INR&tn=${encodeURIComponent(`Kalajeevika - ${craftTitle || 'Craft'}`)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Banner with traditional warm pattern */}
        <div className="h-32 bg-gradient-to-r from-terracotta-700 via-marigold-600 to-amber-700 relative p-4 flex items-start justify-between">
          <span className="text-[11px] font-bold text-white/95 uppercase tracking-wider bg-black/25 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
            Verified Artisan Profile • कारीगर परिचय
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Header & Avatar */}
        <div className="px-6 pb-6 relative pt-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-14 mb-4">
            <img
              src={artisan.avatar}
              alt={artisan.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg bg-stone-200"
            />
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <h3 className="text-xl font-bold text-stone-900 font-serif-craft">{artisan.name}</h3>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-xs text-stone-500 font-medium">{artisan.lineage}</p>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-stone-600 mt-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                <span>{artisan.village}, {artisan.state}</span>
              </div>
            </div>
          </div>

          {/* Farmer & Agricultural Roots Card */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
              <Wheat className="w-4 h-4 text-amber-700" />
              <span>{language === 'hi' ? 'कृषि व ग्रामीण आजीविका' : 'Agrarian & Harvest Heritage'}</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "{artisan.farmerArtisanNote || "Balancing ancestral farming in monsoon with traditional handcrafting during winter harvest. Every piece carries rural soil harmony."}"
            </p>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
            <div className="bg-[#FAF7F2] border border-stone-200 p-2.5 rounded-xl">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Pehchan Artisan ID</span>
              <span className="font-mono font-bold text-stone-800">{artisan.pehchanId || 'ART-2024-GOVT'}</span>
            </div>
            <div className="bg-[#FAF7F2] border border-stone-200 p-2.5 rounded-xl">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Artisan Cooperative</span>
              <span className="font-semibold text-stone-800 truncate block">{artisan.craftCommunity || 'Local Artisan Guild'}</span>
            </div>
          </div>

          {/* Direct 100% UPI Payment Section */}
          <div className="bg-gradient-to-br from-[#FAF7F2] to-amber-50/60 border border-amber-200 rounded-2xl p-4 mb-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-terracotta-600" />
                Direct UPI Payment (100% to Artisan)
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Zero Platform Cut
              </span>
            </div>

            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-stone-200 mb-3">
              <div className="text-xs font-mono font-bold text-stone-800 truncate pr-2">
                {upiId}
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="text-[11px] font-semibold text-terracotta-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1 whitespace-nowrap transition-colors"
              >
                {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
              </button>
            </div>

            {/* Quick Mobile App Deeplinks */}
            <div className="flex items-center gap-2">
              <a
                href={upiPayUrl}
                className="flex-1 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-center text-xs font-bold text-stone-800 shadow-2xs transition-colors"
              >
                Pay via GPay / PhonePe / Paytm
              </a>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all transform active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call Creator</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
