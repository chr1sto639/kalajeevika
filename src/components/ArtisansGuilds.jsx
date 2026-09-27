import React from 'react';
import { MapPin, Phone, MessageSquare, Award, CheckCircle2, Wheat, QrCode, ArrowRight, ShieldCheck } from 'lucide-react';

export const ArtisansGuilds = ({ crafts, onSelectArtisan, language = 'en', onNavigateToStudio }) => {
  // Extract unique artisans
  const uniqueArtisans = Array.from(
    new Map(crafts.map((c) => [c.artisan.name, { artisan: c.artisan, sampleCraft: c }])).values()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
          <Wheat className="w-4 h-4 text-amber-700" />
          <span>Folk Heritage & Agrarian Lineage • शिल्पी परिवार</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-serif-craft text-stone-900">
          {language === 'hi' ? 'मिलिए हमारे किसान-कारीगरों से' : 'Meet the Master Artisans & Farmer Guilds'}
        </h1>
        <p className="mt-3 text-stone-600 text-sm md:text-base leading-relaxed">
          {language === 'hi'
            ? 'भारत के सुदूर गाँवों में रहकर सदियों पुरानी कला को जीवित रखने वाले शिल्पी। फसल की कटाई के साथ मिट्टी, पीतल, लकड़ी और प्राकृतिक रंगों में जान फूंकने वाले सच्चे रचनाकार।'
            : 'Sustaining centuries of craft wisdom across rural India. Working the soil during monsoons and fashioning timeless handicrafts during harvest seasons.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueArtisans.map(({ artisan, sampleCraft }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-art transition-all p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header profile */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-200 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base md:text-lg font-bold text-stone-900 font-serif-craft">
                      {artisan.name}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-stone-500">{artisan.lineage}</p>
                  <div className="flex items-center gap-1 text-xs text-stone-600 mt-1">
                    <MapPin className="w-3 h-3 text-terracotta-600" />
                    <span>{artisan.village}, {artisan.state}</span>
                  </div>
                </div>
              </div>

              {/* Farmer and Agriculture Connection */}
              <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-amber-200/80 mb-4 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase tracking-wide text-[10px] mb-1">
                  <Wheat className="w-3.5 h-3.5 text-amber-700" />
                  <span>Agricultural & Seasonal Craft Schedule</span>
                </div>
                <p className="text-stone-700 italic">
                  "{artisan.farmerArtisanNote || 'Cultivates ancestral paddy fields and crafts generational folk pieces.'}"
                </p>
              </div>

              {/* Guild and Ministry Card */}
              <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                <div className="flex justify-between">
                  <span className="text-stone-400">Pehchan ID:</span>
                  <span className="font-mono font-semibold text-stone-800">{artisan.pehchanId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Craft Guild:</span>
                  <span className="font-medium text-stone-800 truncate max-w-[180px]">{artisan.craftCommunity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Primary Craft:</span>
                  <span className="font-bold text-terracotta-700">{sampleCraft.craftType}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
              <button
                onClick={() => onSelectArtisan(artisan, sampleCraft.title, sampleCraft.price)}
                className="flex-1 bg-stone-100 hover:bg-amber-100 text-stone-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Full Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://wa.me/${artisan.phone?.replace(/[^0-9]/g, '') || '919845211029'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl shadow-xs transition-colors"
                title="Direct WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Artisan Onboarding Callout */}
      <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 rounded-3xl p-8 text-center max-w-3xl mx-auto shadow-sm">
        <h3 className="text-xl md:text-2xl font-bold font-serif-craft text-stone-900">
          Are you a rural craftsman or artisan guild member?
        </h3>
        <p className="text-stone-600 text-xs md:text-sm mt-2 max-w-xl mx-auto">
          Join Kalajeevika for free. Use our AI camera & voice tool to upload your handicrafts in minutes without paperwork or middleman cuts.
        </p>
        <button
          onClick={onNavigateToStudio}
          className="mt-5 inline-flex items-center gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
        >
          <span>Open AI Studio & Upload Craft</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
