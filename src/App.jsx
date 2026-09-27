import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ArtisanStudio } from './components/ArtisanStudio';
import { ArtisanDashboard } from './components/ArtisanDashboard';
import { Marketplace } from './components/Marketplace';
import { ArtisansGuilds } from './components/ArtisansGuilds';
import { PricingTab } from './components/PricingTab';
import { ArtisanDetailsModal } from './components/ArtisanDetailsModal';
import { CertificateModal } from './components/CertificateModal';
import { ARTISAN_CRAFTS } from './data/craftsData';
import { api } from './services/api';
import { Heart, Sparkles, ShieldCheck, Phone, Mail, Wheat, ExternalLink, Camera, ShoppingBag, ArrowRight, Database } from 'lucide-react';

export function App() {
  // Top-level Role: 'artisan' (uploader/creator screen) or 'buyer' (patron marketplace screen)
  const [userRole, setUserRole] = useState('artisan');
  const [activeTab, setActiveTab] = useState('studio');
  const [language, setLanguage] = useState('en');
  const [crafts, setCrafts] = useState(ARTISAN_CRAFTS);
  const [dbStatus, setDbStatus] = useState('connecting');

  // Load crafts from persistent database on mount
  useEffect(() => {
    async function loadData() {
      const health = await api.checkHealth();
      if (health.status === 'ok') {
        setDbStatus('connected');
        const dbCrafts = await api.getCrafts();
        if (dbCrafts && dbCrafts.length > 0) {
          setCrafts(dbCrafts);
        }
      } else {
        setDbStatus('local');
      }
    }
    loadData();
  }, []);

  // Modal States
  const [selectedArtisanData, setSelectedArtisanData] = useState(null);
  const [selectedCertificateCraft, setSelectedCertificateCraft] = useState(null);

  // Add newly created craft from Studio & persist to DB
  const handleAddNewCraft = async (newCraft) => {
    setCrafts([newCraft, ...crafts]);
    await api.createCraft(newCraft);
  };

  const handleOpenArtisanModal = (artisan, craftTitle, craftPrice) => {
    setSelectedArtisanData({ artisan, craftTitle, craftPrice });
  };

  const handleOpenCertificateModal = (craft) => {
    setSelectedCertificateCraft(craft);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EB] flex flex-col font-sans selection:bg-terracotta-500 selection:text-white">
      {/* Navigation with Role Switcher */}
      <Navbar
        userRole={userRole}
        setUserRole={setUserRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Database & Platform Connectivity Indicator */}
      <div className="bg-[#FAF5EB] border-b border-[#E8DCBF] px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] text-stone-600">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {dbStatus === 'connected' ? 'Database Connected (Persistent DB)' : 'Database Active (Local Sync)'}
            </span>
            <span className="text-stone-300">•</span>
            <span>{crafts.length} Masterpieces Live</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Direct to Artisan Bank Account
            </span>
            <span className="text-stone-300">•</span>
            <span>0% Platform Commission</span>
          </div>
        </div>
      </div>

      {/* Main Content Area: Strictly segmented by User Role */}
      <main className="flex-1">
        {userRole === 'artisan' ? (
          /* ============================================================ */
          /* 🎨 ARTISAN PORTAL (PHOTO UPLOAD, VOICE STORY, FAIR PRICING)  */
          /* ============================================================ */
          <div>
            {activeTab === 'studio' && (
              <ArtisanStudio
                onAddCraft={handleAddNewCraft}
                language={language}
                onSwitchToMarketplace={() => {
                  setUserRole('buyer');
                  setActiveTab('marketplace');
                }}
              />
            )}

            {activeTab === 'dashboard' && (
              <ArtisanDashboard
                crafts={crafts}
                onNavigateToUpload={() => setActiveTab('studio')}
                onSelectCertificate={handleOpenCertificateModal}
                onSelectArtisan={handleOpenArtisanModal}
                language={language}
              />
            )}

            {activeTab === 'pricing' && (
              <PricingTab
                language={language}
                onNavigateToStudio={() => setActiveTab('studio')}
              />
            )}
          </div>
        ) : (
          /* ============================================================ */
          /* 🛍️ BUYER PORTAL (HAAT DISCOVERY, PROVENANCE, DIRECT 100% UPI)*/
          /* ============================================================ */
          <div>
            {activeTab === 'marketplace' && (
              <Marketplace
                crafts={crafts}
                onSelectArtisan={handleOpenArtisanModal}
                onSelectCertificate={handleOpenCertificateModal}
                language={language}
                onNavigateToStudio={() => {
                  setUserRole('artisan');
                  setActiveTab('studio');
                }}
              />
            )}

            {activeTab === 'artisans' && (
              <ArtisansGuilds
                crafts={crafts}
                onSelectArtisan={handleOpenArtisanModal}
                language={language}
                onNavigateToStudio={() => {
                  setUserRole('artisan');
                  setActiveTab('studio');
                }}
              />
            )}

            {activeTab === 'pricing' && (
              <PricingTab
                language={language}
                onNavigateToStudio={() => {
                  setUserRole('artisan');
                  setActiveTab('studio');
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedArtisanData && (
        <ArtisanDetailsModal
          artisan={selectedArtisanData.artisan}
          craftTitle={selectedArtisanData.craftTitle}
          craftPrice={selectedArtisanData.craftPrice}
          language={language}
          onClose={() => setSelectedArtisanData(null)}
        />
      )}

      {selectedCertificateCraft && (
        <CertificateModal
          craft={selectedCertificateCraft}
          language={language}
          onClose={() => setSelectedCertificateCraft(null)}
        />
      )}

      {/* Cultural Indian Artisan Footer */}
      <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t-4 border-terracotta-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Brand & Mission */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🪔</span>
                <span className="font-display-royal text-xl font-bold tracking-wider text-white">
                  KALAJEEVIKA
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                कलाजीविका (Art & Livelihood) is an AI initiative bridging rural Indian folk artisans, potters, and agrarian creators directly with patrons across India and the globe.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Middlemen • 100% Direct UPI</span>
              </div>
            </div>

            {/* Column 2: Distinct Portals */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Dedicated Portals
              </h4>
              <ul className="text-xs space-y-2 text-stone-400">
                <li>
                  <button 
                    onClick={() => { setUserRole('artisan'); setActiveTab('studio'); }}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    • 🎨 <strong>Artisan Portal:</strong> Camera Snap & Voice Story
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setUserRole('artisan'); setActiveTab('dashboard'); }}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    • 🗂️ <strong>My Catalog:</strong> Active Listings & Provenance
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setUserRole('buyer'); setActiveTab('marketplace'); }}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    • 🛍️ <strong>Buyer Haat:</strong> 100% Direct Indian Crafts
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setUserRole('buyer'); setActiveTab('artisans'); }}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    • 🌾 <strong>Meet Artisans:</strong> Pehchan ID & Crop Heritage
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Indian Crafts Covered */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Preserved Indigenous Crafts
              </h4>
              <ul className="text-xs space-y-2 text-stone-400">
                <li>• Madhubani & Mithila Painting (Bihar)</li>
                <li>• Bankura & Gorakhpur Terracotta (UP/Bengal)</li>
                <li>• Jaipur Royal Cobalt Blue Pottery (Rajasthan)</li>
                <li>• Dhokra Lost-Wax Bell Metal (Chhattisgarh)</li>
                <li>• Channapatna Eco Wooden Toys (Karnataka)</li>
                <li>• Warli Sacred Canvas Art (Maharashtra)</li>
              </ul>
            </div>

            {/* Column 4: Artisan Support Helpline */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Artisan Village Support
              </h4>
              <p className="text-xs text-stone-400 mb-3">
                Toll-free rural support desk assisting artisans with photo capture, UPI setup, and GI certification.
              </p>
              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>1800-KALA-JEEVIKA (Toll-Free)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>support@kalajeevika.org</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} Kalajeevika (कलाजीविका). Dedicated to the hands that mould earth and weave heritage.
            </p>
            <div className="flex items-center gap-1 text-stone-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>for Indian Folk Artisans & Agrarian Creators</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
