import React, { useState } from 'react';
import { 
  Package, TrendingUp, DollarSign, Award, Plus, Eye, 
  Trash2, QrCode, Phone, MessageSquare, CheckCircle2, ShieldCheck, ArrowRight 
} from 'lucide-react';

export const ArtisanDashboard = ({ 
  crafts, 
  onNavigateToUpload, 
  onSelectCertificate, 
  onSelectArtisan,
  language = 'en' 
}) => {
  // Calculate total portfolio value and fair wages
  const totalValue = crafts.reduce((sum, c) => sum + (c.price || 0), 0);
  const avgProfit = Math.round(
    crafts.reduce((sum, c) => sum + (c.marketValuation?.profitToArtisanPercent || 80), 0) / crafts.length
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Profile Summary */}
      <div className="bg-gradient-to-r from-terracotta-800 via-amber-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border-2 border-amber-300/40 p-1 flex items-center justify-center text-3xl shadow-md">
              🪔
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif-craft">
                  {language === 'hi' ? 'कारीगर कार्यक्षेत्र (Artisan Workspace)' : 'Artisan Workspace & Catalog'}
                </h1>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  Verified Creator
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-1">
                Manage your creations, track fair market earnings, and print GI authenticity certificates.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToUpload}
            className="bg-gradient-to-r from-marigold-500 to-amber-500 hover:from-marigold-600 hover:to-amber-600 text-stone-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-xs sm:text-sm flex items-center justify-center gap-2 transform active:scale-95 whitespace-nowrap self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'hi' ? 'नया शिल्प अपलोड करें' : '+ Snap & Upload New Craft'}</span>
          </button>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-stone-300 uppercase block">Active Masterpieces</span>
            <span className="text-xl sm:text-2xl font-black text-amber-300">{crafts.length} Pieces</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-stone-300 uppercase block">Direct Catalog Value</span>
            <span className="text-xl sm:text-2xl font-black text-amber-300">₹{totalValue.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-stone-300 uppercase block">Creator Direct Income</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-300">{avgProfit}% Net</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-stone-300 uppercase block">Platform Fee Cut</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-300">0% (Zero)</span>
          </div>
        </div>
      </div>

      {/* Craft Inventory List */}
      <div className="bg-white rounded-3xl border border-[#E8DCBF] p-6 shadow-warm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
          <div>
            <h3 className="font-bold text-stone-900 text-base sm:text-lg font-serif-craft">
              {language === 'hi' ? 'आपकी प्रकाशित कलाकृतियाँ' : 'Your Live Catalog & Masterpieces'}
            </h3>
            <p className="text-xs text-stone-500">
              Each piece is showcased directly to patrons with your verified farmer/artisan provenance.
            </p>
          </div>
          <span className="text-xs font-bold text-terracotta-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
            {crafts.length} Listed
          </span>
        </div>

        <div className="space-y-4">
          {crafts.map((craft) => (
            <div
              key={craft.id}
              className="bg-[#FCFAF6] border border-stone-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-terracotta-300 transition-colors"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={craft.image}
                  alt={craft.title}
                  className="w-16 h-16 rounded-xl object-cover border border-amber-200 shadow-xs flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-stone-900 text-sm truncate font-serif-craft">
                      {craft.title}
                    </h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                      Live
                    </span>
                  </div>
                  <p className="text-xs text-terracotta-700 font-semibold">{craft.craftType}</p>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    Creator: {craft.artisan?.name} • {craft.artisan?.village}
                  </p>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Selling Price</span>
                  <span className="text-lg font-black text-stone-900">₹{craft.price.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectCertificate(craft)}
                    className="p-2.5 rounded-xl bg-white hover:bg-amber-50 text-stone-700 hover:text-terracotta-700 border border-stone-200 shadow-2xs transition-colors"
                    title="View & Print Certificate"
                  >
                    <Award className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectArtisan(craft.artisan, craft.title, craft.price)}
                    className="p-2.5 rounded-xl bg-white hover:bg-amber-50 text-stone-700 hover:text-terracotta-700 border border-stone-200 shadow-2xs transition-colors"
                    title="View Provenance Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${craft.artisan?.phone?.replace(/[^0-9]/g, '') || '919845211029'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xs transition-colors"
                    title="Test WhatsApp Inquiry"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
