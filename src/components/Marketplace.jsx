import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Volume2, Award, MessageSquare, 
  ExternalLink, CheckCircle2, Wheat, ShieldCheck, Tag, Heart, 
  Sparkles, QrCode, Play, Pause, ChevronRight, SlidersHorizontal, RefreshCcw
} from 'lucide-react';
import { CRAFT_CATEGORIES, INDIAN_STATES } from '../data/craftsData';

export const Marketplace = ({ 
  crafts, 
  onSelectArtisan, 
  onSelectCertificate, 
  language = 'en',
  onNavigateToStudio
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Crafts');
  const [selectedState, setSelectedState] = useState('All States');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [playingCraftId, setPlayingCraftId] = useState(null);
  const [likedCrafts, setLikedCrafts] = useState({});

  // Filter crafts
  const filteredCrafts = crafts.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.craftType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.artisan.village.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All Crafts' || c.craftCategory === selectedCategory;
    const matchesState = selectedState === 'All States' || c.artisan.state === selectedState;
    const matchesPrice = c.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesState && matchesPrice;
  });

  const toggleLike = (id) => {
    setLikedCrafts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlayVoice = (craft) => {
    if (!('speechSynthesis' in window)) return;

    if (playingCraftId === craft.id) {
      window.speechSynthesis.cancel();
      setPlayingCraftId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = language === 'hi' && craft.audioStoryHi ? craft.audioStoryHi : craft.audioStory;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;

    utterance.onend = () => setPlayingCraftId(null);
    utterance.onerror = () => setPlayingCraftId(null);

    setPlayingCraftId(craft.id);
    window.speechSynthesis.speak(utterance);
  };

  const categoryIcons = {
    "All Crafts": "🪔",
    "Clay & Pottery": "🏺",
    "Painting & Folk Art": "🎨",
    "Ceramics & Glaze": "🍶",
    "Metal Craft": "🪙",
    "Woodcraft & Toys": "🪵",
    "Handloom & Weaving": "🧵"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner with Traditional Art Aesthetic */}
      <div className="relative rounded-3xl bg-gradient-to-r from-terracotta-900 via-stone-900 to-indigoCraft-900 text-white p-7 sm:p-10 md:p-12 mb-8 overflow-hidden shadow-xl border border-amber-500/20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3.5 border border-amber-300/30 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>100% Direct-from-Artisan Fair Trade</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-craft tracking-tight">
            कलाजीविका हाट • Heritage Haat
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
            Discover authentic Geographical Indication (GI) folk arts, terracotta pottery, and tribal metalworks. Every rupee goes directly to rural artisan and farmer households with 0% platform fee.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToStudio}
              className="bg-gradient-to-r from-marigold-500 to-amber-500 hover:from-marigold-600 hover:to-amber-600 text-stone-950 font-bold px-5 py-3 rounded-2xl shadow-lg transition-all text-xs sm:text-sm flex items-center gap-2 transform active:scale-95"
            >
              <span>+ List Your Craft (कारीगर जोड़ें)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-stone-300 flex items-center gap-2 bg-black/30 px-3.5 py-2.5 rounded-xl border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{crafts.length} Authentic Masterpieces Available</span>
            </div>
          </div>
        </div>

        {/* Traditional Hindi script watermark */}
        <div className="absolute -right-8 -bottom-10 text-white/5 font-display-royal text-[200px] select-none pointer-events-none hidden sm:block">
          कला
        </div>
      </div>

      {/* Visual Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CRAFT_CATEGORIES.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
              selectedCategory === cat
                ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-md scale-105'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span>{categoryIcons[cat] || "✨"}</span>
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Secondary Search & State Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E9DFCF] shadow-xs mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by craft, village, artisan..."
              className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-terracotta-500 outline-none"
            />
          </div>

          {/* State of Origin */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full py-2.5 px-3 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:ring-2 focus:ring-terracotta-500 outline-none"
            >
              {INDIAN_STATES.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col justify-center px-1">
            <div className="flex justify-between text-xs text-stone-600 mb-1">
              <span>Budget: Under ₹{maxPrice.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-stone-400">Max ₹10k</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="250"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-terracotta-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Grid of Crafts */}
      {filteredCrafts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
          <p className="text-base text-stone-600 font-medium">No artisanal pieces found matching your current filter.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All Crafts');
              setSelectedState('All States');
              setMaxPrice(10000);
            }}
            className="mt-4 text-xs font-semibold text-terracotta-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-colors border border-amber-200 inline-flex items-center gap-1.5"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredCrafts.map((craft) => {
            const isPlaying = playingCraftId === craft.id;
            const isLiked = likedCrafts[craft.id];

            return (
              <div 
                key={craft.id}
                className="bg-white rounded-3xl border border-[#E8DCBF] shadow-warm hover:shadow-art transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Image Section */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={craft.image}
                    alt={craft.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* GI Tag Badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-white/95 text-terracotta-800 shadow-sm backdrop-blur-xs flex items-center gap-1 border border-stone-200">
                      <ShieldCheck className="w-3 h-3 text-terracotta-600" />
                      {craft.giTag || 'GI Certified'}
                    </span>
                  </div>

                  {/* Heart Like Button */}
                  <button
                    onClick={() => toggleLike(craft.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-red-500 shadow-sm transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Audio Story Button on Card */}
                  <button
                    onClick={() => handlePlayVoice(craft)}
                    className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all ${
                      isPlaying 
                        ? 'bg-red-600 text-white ring-4 ring-red-200 animate-pulse' 
                        : 'bg-stone-900/85 hover:bg-stone-900 text-white backdrop-blur-xs'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Listening...' : 'Hear Story'}</span>
                  </button>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Craft Tradition Header */}
                    <div className="flex items-center justify-between text-[11px] text-terracotta-700 font-bold mb-1 uppercase tracking-wider">
                      <span>{craft.craftType}</span>
                      <span className="text-stone-400 font-normal">{craft.creationTime || 'Handmade'}</span>
                    </div>

                    <h3 className="font-bold text-stone-900 text-base sm:text-lg font-serif-craft line-clamp-1">
                      {craft.title}
                    </h3>

                    {/* Story Snippet */}
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 italic font-serif leading-relaxed">
                      "{craft.audioStory}"
                    </p>

                    {/* ARTISAN & FARMER CREDENTIALS CARD */}
                    <div 
                      onClick={() => onSelectArtisan(craft.artisan, craft.title, craft.price)}
                      className="mt-3.5 p-3 rounded-2xl bg-[#FCFAF6] hover:bg-amber-50/80 border border-stone-200 transition-colors cursor-pointer group/artisan"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={craft.artisan.avatar}
                          alt={craft.artisan.name}
                          className="w-10 h-10 rounded-xl object-cover border border-amber-200 shadow-xs"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-xs text-stone-900 truncate">
                              {craft.artisan.name}
                            </span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-stone-500 truncate">
                            <MapPin className="w-3 h-3 text-terracotta-600 flex-shrink-0" />
                            <span>{craft.artisan.village}, {craft.artisan.state}</span>
                          </div>
                        </div>

                        <span className="text-[10px] text-terracotta-700 font-semibold bg-white px-2 py-1 rounded-lg border border-stone-200 group-hover/artisan:border-terracotta-300">
                          Profile →
                        </span>
                      </div>

                      {/* Agrarian Note */}
                      {craft.artisan.farmerArtisanNote && (
                        <div className="mt-2 pt-2 border-t border-stone-200/60 flex items-center gap-1.5 text-[10px] text-stone-600">
                          <Wheat className="w-3 h-3 text-amber-700 flex-shrink-0" />
                          <span className="truncate">{craft.artisan.farmerArtisanNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="mt-5 pt-3 border-t border-stone-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                          AI Fair Living Price
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl sm:text-2xl font-black text-stone-900 font-serif-craft">
                            ₹{craft.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                            {craft.marketValuation?.profitToArtisanPercent || 80}% Direct
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectCertificate(craft)}
                        className="text-[11px] text-terracotta-700 hover:text-terracotta-800 font-semibold flex items-center gap-1 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-xl border border-amber-200 transition-colors"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>GI Stamp</span>
                      </button>
                    </div>

                    {/* Direct Buy Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://wa.me/${craft.artisan.phone?.replace(/[^0-9]/g, '') || '919845211029'}?text=${encodeURIComponent(
                          `Namaste ${craft.artisan.name} ji! I want to buy your artwork "${craft.title}" (₹${craft.price}) listed on Kalajeevika.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-xs transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => onSelectArtisan(craft.artisan, craft.title, craft.price)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-xs transition-all"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Pay via UPI</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
