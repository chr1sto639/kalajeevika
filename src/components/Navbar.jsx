import React, { useState } from 'react';
import { 
  Camera, ShoppingBag, Calculator, Users, Globe, Volume2, 
  Menu, X, Sparkles, Feather, HelpCircle, ShieldCheck, 
  Flame, LayoutDashboard, Heart, ArrowRight, RefreshCw, UserCheck
} from 'lucide-react';

export const Navbar = ({ 
  userRole,
  setUserRole,
  activeTab, 
  setActiveTab, 
  language, 
  setLanguage,
  savedCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGuiding, setIsGuiding] = useState(false);

  // Audio voice guide
  const playVoiceGuide = () => {
    if (!('speechSynthesis' in window)) return;
    if (isGuiding) {
      window.speechSynthesis.cancel();
      setIsGuiding(false);
      return;
    }

    const text = userRole === 'artisan'
      ? (language === 'hi' 
          ? 'आप कारीगर पोर्टल में हैं। यहाँ आप कैमरे से फोटो खींचकर, बोलकर कहानी सुनाकर, अपने हस्तशिल्प को सीधे खरीदारों तक पहुंचा सकते हैं।'
          : 'You are in the Artisan Portal. Snap photos, record folklore stories in your native voice, and set fair prices directly to your bank account.')
      : (language === 'hi'
          ? 'आप कलाजीविका हाट में हैं। यहाँ भारत के ग्रामीण कारीगरों और किसानों द्वारा बने असली हस्तशिल्प सीधे 0% बिचौलिया शुल्क पर उपलब्ध हैं।'
          : 'You are in the Buyer Haat. Browse authentic GI handicrafts and buy directly from rural artisans with zero middleman commission.');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsGuiding(false);
    utterance.onerror = () => setIsGuiding(false);

    setIsGuiding(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleRoleSwitch = (newRole) => {
    setUserRole(newRole);
    if (newRole === 'artisan') {
      setActiveTab('studio');
    } else {
      setActiveTab('marketplace');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EB]/95 backdrop-blur-md border-b border-[#EADDC5] shadow-xs">
      {/* Auspicious Tricolor Gradient Stripe */}
      <div className="h-1 bg-gradient-to-r from-terracotta-600 via-marigold-500 to-emerald-700"></div>

      {/* Role Announcement Bar */}
      <div className="bg-[#F4ECE1] border-b border-[#EADDC5] py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Currently viewing as:</span>
            <span className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
              userRole === 'artisan' 
                ? 'bg-terracotta-100 text-terracotta-800 border border-terracotta-200' 
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {userRole === 'artisan' ? '🎨 Artisan & Farmer Mode (कारीगर मंच)' : '🛍️ Buyer & Patron Mode (कला प्रेमी हाट)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRoleSwitch(userRole === 'artisan' ? 'buyer' : 'artisan')}
              className="font-bold text-terracotta-700 hover:text-terracotta-900 underline flex items-center gap-1 text-[11px] transition-colors"
            >
              <span>{userRole === 'artisan' ? 'Switch to Buyer View →' : 'Are you an Artisan? Upload Craft →'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleRoleSwitch(userRole)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-terracotta-600 via-marigold-500 to-terracotta-800 flex items-center justify-center text-white shadow-warm group-hover:scale-105 transition-transform">
              <span className="text-2xl select-none">🪔</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display-royal text-xl sm:text-2xl font-black text-stone-900 tracking-wider">
                  KALAJEEVIKA
                </span>
                <span className="text-[11px] font-bold text-terracotta-700 font-serif bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300">
                  कलाजीविका
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wide hidden sm:block">
                {userRole === 'artisan' ? 'Artisan AI Upload & Valuation Studio' : 'Fair Trade Indigenous Craft Haat'}
              </p>
            </div>
          </div>

          {/* DUAL ROLE SEGMENTED SWITCHER (CENTER) */}
          <div className="hidden lg:flex items-center p-1 bg-stone-200/80 rounded-2xl border border-stone-300/60 shadow-inner">
            <button
              onClick={() => handleRoleSwitch('artisan')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                userRole === 'artisan'
                  ? 'bg-terracotta-600 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'कारीगर (Artisan Mode)' : 'Artisan / Creator'}</span>
            </button>

            <button
              onClick={() => handleRoleSwitch('buyer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                userRole === 'buyer'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'खरीदार (Buyer Mode)' : 'Patron / Buyer'}</span>
            </button>
          </div>

          {/* Desktop Navigation Links (Contextual to Active Role) */}
          <nav className="hidden md:flex items-center gap-1.5">
            {userRole === 'artisan' ? (
              /* ARTISAN NAVIGATION */
              <>
                <button
                  onClick={() => setActiveTab('studio')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'studio'
                      ? 'bg-terracotta-600 text-white shadow-md'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>{language === 'hi' ? 'AI स्टूडियो' : 'AI Upload Studio'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-terracotta-600 text-white shadow-md'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{language === 'hi' ? 'मेरी कलाकृतियाँ' : 'My Catalog'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'pricing'
                      ? 'bg-terracotta-600 text-white shadow-md'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Calculator className="w-4 h-4" />
                  <span>{language === 'hi' ? 'मूल्य निर्धारक' : 'Price Engine'}</span>
                </button>
              </>
            ) : (
              /* BUYER NAVIGATION */
              <>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'marketplace'
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{language === 'hi' ? 'हस्तशिल्प हाट' : 'Explore Haat'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('artisans')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'artisans'
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{language === 'hi' ? 'कारीगर परिचय' : 'Meet Artisans'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === 'pricing'
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'hi' ? 'न्यायसंगत व्यापार' : 'Fair Living Wage'}</span>
                </button>
              </>
            )}
          </nav>

          {/* Right Utility: Audio Assistant + Language */}
          <div className="hidden md:flex items-center gap-2">
            {/* Audio Guide Button */}
            <button
              onClick={playVoiceGuide}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold border transition-all ${
                isGuiding 
                  ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 shadow-2xs'
              }`}
              title="Voice Assistant"
            >
              <Volume2 className={`w-4 h-4 ${isGuiding ? 'text-amber-700 animate-bounce' : 'text-stone-500'}`} />
              <span>{isGuiding ? 'Stop Voice' : 'Audio Guide'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold bg-[#FAF6EF] hover:bg-amber-50 text-stone-800 border border-stone-200 shadow-2xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-terracotta-600" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Role Action Button */}
            {userRole === 'artisan' ? (
              <button
                onClick={() => setActiveTab('studio')}
                className="bg-gradient-to-r from-terracotta-600 to-marigold-600 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-md transition-all flex items-center gap-1.5 transform active:scale-95"
              >
                <Camera className="w-4 h-4" />
                <span>Snap New Craft</span>
              </button>
            ) : (
              <button
                onClick={() => handleRoleSwitch('artisan')}
                className="bg-gradient-to-r from-terracotta-600 to-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-md transition-all flex items-center gap-1.5 transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sell As Artisan</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleRoleSwitch(userRole === 'artisan' ? 'buyer' : 'artisan')}
              className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-900 rounded-xl"
            >
              {userRole === 'artisan' ? 'Buy' : 'Sell'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-5 space-y-2">
          {/* Mobile Role Switcher */}
          <div className="grid grid-cols-2 gap-2 mb-3 p-1 bg-stone-100 rounded-2xl">
            <button
              onClick={() => { handleRoleSwitch('artisan'); setMobileMenuOpen(false); }}
              className={`py-2 text-xs font-bold rounded-xl text-center ${
                userRole === 'artisan' ? 'bg-terracotta-600 text-white' : 'text-stone-700'
              }`}
            >
              🎨 Artisan Portal
            </button>
            <button
              onClick={() => { handleRoleSwitch('buyer'); setMobileMenuOpen(false); }}
              className={`py-2 text-xs font-bold rounded-xl text-center ${
                userRole === 'buyer' ? 'bg-emerald-700 text-white' : 'text-stone-700'
              }`}
            >
              🛍️ Buyer Haat
            </button>
          </div>

          {userRole === 'artisan' ? (
            <>
              <button
                onClick={() => { setActiveTab('studio'); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold bg-stone-50 text-stone-800"
              >
                <Camera className="w-4 h-4 text-terracotta-600" />
                <span>AI Photo & Voice Upload Studio</span>
              </button>
              <button
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold bg-stone-50 text-stone-800"
              >
                <LayoutDashboard className="w-4 h-4 text-terracotta-600" />
                <span>My Listed Crafts Catalog</span>
              </button>
              <button
                onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold bg-stone-50 text-stone-800"
              >
                <Calculator className="w-4 h-4 text-terracotta-600" />
                <span>AI Market Price Engine</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setActiveTab('marketplace'); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold bg-stone-50 text-stone-800"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>Explore Craft Haat</span>
              </button>
              <button
                onClick={() => { setActiveTab('artisans'); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold bg-stone-50 text-stone-800"
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Meet Artisans & Farmers</span>
              </button>
              <button
                onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold bg-stone-50 text-stone-800"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Fair Trade Transparency</span>
              </button>
            </>
          )}

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
            <button
              onClick={() => { playVoiceGuide(); setMobileMenuOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-50 text-amber-900 font-bold rounded-2xl text-xs border border-amber-200"
            >
              <Volume2 className="w-4 h-4" />
              <span>Voice Guide</span>
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-4 py-2.5 bg-stone-100 text-stone-800 font-bold rounded-2xl text-xs"
            >
              {language === 'en' ? 'हिन्दी' : 'English'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
