import React, { useState } from 'react';
import { Calculator, ShieldCheck, TrendingUp, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { PricingEngine } from './PricingCalculatorModal';

export const PricingTab = ({ language = 'en', onNavigateToStudio }) => {
  const [selectedCraftPreset, setSelectedCraftPreset] = useState('pottery');

  const presets = {
    pottery: {
      title: "Bankura / Gorakhpur Terracotta Pitcher",
      materials: 280,
      hours: 14,
      complexity: 7.2
    },
    painting: {
      title: "Madhubani Silk / Canvas Folk Painting",
      materials: 480,
      hours: 28,
      complexity: 8.8
    },
    metal: {
      title: "Lost-Wax Brass Dhokra Figurine",
      materials: 750,
      hours: 32,
      complexity: 9.4
    },
    wood: {
      title: "Channapatna Lacquer Wood Toy",
      materials: 190,
      hours: 9,
      complexity: 6.8
    }
  };

  const activePreset = presets[selectedCraftPreset];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Fair Wage Intelligence • निष्पक्ष मूल्य</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-serif-craft text-stone-900">
          {language === 'hi' ? 'शिल्पी उचित मूल्य कैलकुलेटर' : 'AI Market Price Intelligence'}
        </h1>
        <p className="mt-3 text-stone-600 text-sm md:text-base leading-relaxed">
          {language === 'hi'
            ? 'बिचौलिये अक्सर ग्रामीण शिल्पियों से औने-पौने दामों में सामान खरीदकर शहरों में भारी मुनाफे पर बेचते हैं। यह टूल आपको आपकी मेहनत, सामग्री और समय का न्यायसंगत मूल्य तय करने में मदद करता है।'
            : 'Middlemen frequently undervalue rural artisans. This interactive intelligence engine transparently factors raw materials, labor hours, and living wage standards to recommend fair market prices.'}
        </p>
      </div>

      {/* Preset selection tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <span className="text-xs font-semibold text-stone-500 mr-2">Try Craft Archetype:</span>
        <button
          onClick={() => setSelectedCraftPreset('pottery')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            selectedCraftPreset === 'pottery' 
              ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-xs' 
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          🏺 Terracotta Clay
        </button>
        <button
          onClick={() => setSelectedCraftPreset('painting')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            selectedCraftPreset === 'painting' 
              ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-xs' 
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          🎨 Madhubani Painting
        </button>
        <button
          onClick={() => setSelectedCraftPreset('metal')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            selectedCraftPreset === 'metal' 
              ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-xs' 
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          🪙 Dhokra Bell Metal
        </button>
        <button
          onClick={() => setSelectedCraftPreset('wood')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            selectedCraftPreset === 'wood' 
              ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-xs' 
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
          }`}
        >
          🪵 Channapatna Toy
        </button>
      </div>

      <PricingEngine
        key={selectedCraftPreset}
        materialCost={activePreset.materials}
        craftingHours={activePreset.hours}
        complexityScore={activePreset.complexity}
        craftType={activePreset.title}
        language={language}
      />

      {/* Educational Guide on Fair Wages */}
      <div className="mt-10 bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
        <h3 className="font-bold text-stone-900 text-lg font-serif-craft mb-3">
          How Kalajeevika Computes Fair Market Value:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <span className="font-bold text-stone-900 block mb-1">1. Fair Living Labor Rate</span>
            We benchmark a minimum baseline of ₹650–₹800/day for skilled master craftsmanship, ensuring healthcare and family nutritional security.
          </div>
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <span className="font-bold text-stone-900 block mb-1">2. Complexity & Firing Risk</span>
            Kiln losses, natural vegetable dye preparation, and fine miniature brushwork carry risk multipliers so artisans are protected against breakages.
          </div>
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <span className="font-bold text-stone-900 block mb-1">3. Direct-to-Consumer Savings</span>
            By eliminating the 3 to 4 intermediaries in conventional trade, the buyer gets authentic GI heritage at 30% below urban boutique prices while the artisan earns double.
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onNavigateToStudio}
            className="inline-flex items-center gap-2 bg-marigold-500 hover:bg-marigold-600 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs md:text-sm shadow-md transition-all"
          >
            <span>Ready to list your piece at this fair price? Open Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
