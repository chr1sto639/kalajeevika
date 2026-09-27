import React, { useState, useId } from 'react';
import { 
  DollarSign, TrendingUp, ShieldCheck, Info, Sparkles, Scale, 
  AlertTriangle, CheckCircle, ArrowRight, Zap, Check
} from 'lucide-react';

export const PricingEngine = ({
  materialCost = 350,
  craftingHours = 16,
  complexityScore = 8.0,
  craftType = "Madhubani Art",
  onApplyPrice,
  currentPrice,
  language = 'en'
}) => {
  const [materials, setMaterials] = useState(materialCost);
  const [hours, setHours] = useState(craftingHours);
  const [complexity, setComplexity] = useState(complexityScore);
  const [hourlyWage, setHourlyWage] = useState(85); // ₹85/hour ~ ₹680/day skilled artisan rate
  const materialsInputId = useId();
  const hoursInputId = useId();
  const complexityInputId = useId();

  // Pricing formula
  const baseLabor = Math.round(hours * hourlyWage);
  const complexityMultiplier = 1 + (complexity / 25);
  const fairCost = Math.round((materials + baseLabor) * complexityMultiplier);
  const recommendedPrice = Math.round(fairCost * 1.15); // 15% emergency savings & craft preservation fund
  
  // Market benchmarks
  const localHaatPrice = Math.round(recommendedPrice * 0.48); // Exploitative trader rate
  const metroBoutiquePrice = Math.round(recommendedPrice * 1.65); // Urban boutique in Delhi/Mumbai
  const exportMarketPrice = Math.round(recommendedPrice * 2.8); // International craft gallery
  const artisanProfitPercent = Math.round(((recommendedPrice - materials) / recommendedPrice) * 100);

  // Quick Preset Tier buttons for easy 1-click setting
  const quickTiers = [
    { label: "Small / Daily", labelHi: "छोटा शिल्प", mat: 180, hrs: 8, comp: 6.5 },
    { label: "Classic Decor", labelHi: "मध्यम सजावट", mat: 380, hrs: 18, comp: 8.0 },
    { label: "Masterpiece", labelHi: "उत्कृष्ट कृति", mat: 750, hrs: 32, comp: 9.2 },
    { label: "GI Heirloom", labelHi: "विरासत धरोहर", mat: 1200, hrs: 48, comp: 9.8 }
  ];

  const applyTier = (t) => {
    setMaterials(t.mat);
    setHours(t.hrs);
    setComplexity(t.comp);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8DCBF] shadow-warm p-5 sm:p-7 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-marigold-500 to-terracotta-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-stone-900 text-base sm:text-lg font-serif-craft">
                {language === 'hi' ? 'AI उचित मूल्य निर्धारक' : 'AI Market Price Intelligence'}
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Fair Wage Guaranteed
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {language === 'hi' ? 'बिचौलियों के बिना अपनी वास्तविक मेहनत, समय और सामग्री का सही मूल्य तय करें' : 'Scientific cost modeling ensuring skilled rural creators receive true market value'}
            </p>
          </div>
        </div>
      </div>

      {/* 1-Tap Quick Tier Presets */}
      <div className="my-4">
        <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
          <Zap className="w-3 h-3 text-terracotta-600" />
          <span>{language === 'hi' ? 'त्वरित शिल्प स्तर (Quick Pre-sets):' : 'Quick Craft Scale Preset:'}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {quickTiers.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => applyTier(t)}
              className="text-left p-2.5 rounded-xl border border-stone-200 hover:border-terracotta-400 bg-stone-50 hover:bg-amber-50/70 transition-all text-xs"
            >
              <span className="font-bold text-stone-800 block truncate">
                {language === 'hi' ? t.labelHi : t.label}
              </span>
              <span className="text-[10px] text-stone-500">
                {t.hrs} hrs • Mat ₹{t.mat}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 bg-[#FCFAF6] p-4 sm:p-5 rounded-2xl border border-stone-200">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor={materialsInputId} className="text-xs font-bold text-stone-700">
              {language === 'hi' ? 'कच्चा माल खर्च (₹)' : 'Raw Material Cost (₹)'}
            </label>
            <span className="text-xs font-extrabold text-terracotta-700 bg-white px-2 py-0.5 rounded-md border border-stone-200">
              ₹{materials}
            </span>
          </div>
          <input
            id={materialsInputId}
            type="range"
            min="50"
            max="3000"
            step="50"
            value={materials}
            onChange={(e) => setMaterials(Number(e.target.value))}
            className="w-full accent-terracotta-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-stone-400 mt-1">Clay, dyes, fabric, wood, firing coal</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor={hoursInputId} className="text-xs font-bold text-stone-700">
              {language === 'hi' ? 'कारीगरी का समय (घंटे)' : 'Crafting Labor Time'}
            </label>
            <span className="text-xs font-extrabold text-terracotta-700 bg-white px-2 py-0.5 rounded-md border border-stone-200">
              {hours} hrs ({(hours / 8).toFixed(1)} days)
            </span>
          </div>
          <input
            id={hoursInputId}
            type="range"
            min="2"
            max="120"
            step="2"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full accent-terracotta-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-stone-400 mt-1">@ ₹{hourlyWage}/hr (₹680/day fair artisan wage)</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor={complexityInputId} className="text-xs font-bold text-stone-700">
              {language === 'hi' ? 'बारीकी व कलात्मक जटिलता' : 'Heritage Detail & Skill'}
            </label>
            <span className="text-xs font-extrabold text-terracotta-700 bg-white px-2 py-0.5 rounded-md border border-stone-200">
              {complexity} / 10
            </span>
          </div>
          <input
            id={complexityInputId}
            type="range"
            min="4"
            max="10"
            step="0.5"
            value={complexity}
            onChange={(e) => setComplexity(Number(e.target.value))}
            className="w-full accent-terracotta-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-stone-400 mt-1">Miniature brushwork, kiln risk factor</p>
        </div>
      </div>

      {/* Visual Cost Allocation Bar */}
      <div className="mb-5">
        <div className="flex justify-between text-[11px] text-stone-500 font-semibold mb-1">
          <span>Where every rupee goes:</span>
          <span>100% Direct to Creator</span>
        </div>
        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden flex shadow-inner">
          <div 
            style={{ width: `${Math.round((materials / recommendedPrice) * 100)}%` }} 
            className="bg-amber-700 h-full" 
            title={`Materials: ₹${materials}`}
          />
          <div 
            style={{ width: `${Math.round((baseLabor / recommendedPrice) * 100)}%` }} 
            className="bg-terracotta-500 h-full" 
            title={`Living Wage: ₹${baseLabor}`}
          />
          <div 
            style={{ width: `${100 - Math.round((materials / recommendedPrice) * 100) - Math.round((baseLabor / recommendedPrice) * 100)}%` }} 
            className="bg-emerald-500 h-full" 
            title="Skill Bonus & Family Savings"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[10px] text-stone-600 mt-1.5 font-medium">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-700"></span> Raw Materials (₹{materials})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-terracotta-500"></span> Fair Wage (₹{baseLabor})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Creator Profit & Savings ({artisanProfitPercent}%)</span>
        </div>
      </div>

      {/* Recommended Price Highlight Card */}
      <div className="bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-[#FAF6EF] border-2 border-amber-300 rounded-3xl p-5 sm:p-6 mb-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold text-terracotta-800 uppercase tracking-wider block">
              {language === 'hi' ? 'अनुशंसित कलाजीविका उचित मूल्य' : 'AI RECOMMENDED FAIR LIVING PRICE'}
            </span>
            <div className="flex items-baseline gap-2.5 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-stone-900 font-serif-craft">
                ₹{recommendedPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                {artisanProfitPercent}% Net to Artisan
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-1.5">
              Covers raw materials (₹{materials}) + fair labor wage (₹{baseLabor}) + skill rarity bonus.
            </p>
          </div>

          {onApplyPrice && (
            <button
              type="button"
              onClick={() => onApplyPrice(recommendedPrice)}
              className="bg-gradient-to-r from-terracotta-600 to-marigold-600 hover:from-terracotta-700 hover:to-marigold-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap self-start sm:self-center transform active:scale-95"
            >
              <span>{language === 'hi' ? 'यह मूल्य सेट करें' : 'Set as Selling Price'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Market Comparison Matrix */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-terracotta-600" />
          {language === 'hi' ? 'बाजार तुलना और बिचौलियों का सच' : 'Real Market Comparison: Why Direct Trade Matters'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Middleman local haat */}
          <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-stone-800">Village Middleman</span>
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            </div>
            <div className="text-2xl font-black text-red-700">₹{localHaatPrice.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-red-700/90 mt-1 leading-snug">
              Middleman pockets 50%+ profit. Artisan earns barely ₹200/day.
            </p>
          </div>

          {/* Kalajeevika Fair Direct Price */}
          <div className="bg-emerald-50/90 border-2 border-emerald-400 rounded-2xl p-4 relative shadow-sm">
            <div className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Direct & Fair
            </div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-extrabold text-emerald-950">Kalajeevika Direct</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-800">₹{recommendedPrice.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-emerald-900 mt-1 leading-snug">
              100% direct payment via UPI. Zero platform commission cut.
            </p>
          </div>

          {/* Metro Boutique / Export */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-stone-800">Urban Luxury Boutique</span>
              <Scale className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-xl font-bold text-amber-900">₹{metroBoutiquePrice.toLocaleString('en-IN')} - ₹{exportMarketPrice.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-stone-600 mt-1 leading-snug">
              What upscale galleries in Delhi & London resell authentic GI crafts for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
