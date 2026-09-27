import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'kalajeevika_db.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initial Seed Data for Indigenous Crafts
const INITIAL_CRAFTS = [
  {
    id: "craft-1",
    title: "Vriksha-Jeevan (Tree of Life) Madhubani Painting",
    titleHi: "वृक्ष-जीवन मधुबनी लोक चित्रकला",
    craftType: "Madhubani / Mithila Art",
    craftCategory: "Painting & Folk Art",
    giTag: "GI Reg. No. 105 (Bihar)",
    price: 3450,
    marketValuation: {
      rawMaterialCost: 480,
      laborHours: 28,
      hourlyWage: 85,
      craftComplexityScore: 8.8,
      localHaatPrice: 1800,
      metroBoutiquePrice: 4200,
      globalExportPrice: 6800,
      fairLivingPrice: 3450,
      profitToArtisanPercent: 78
    },
    materials: ["Handmade Neem Paper", "Turmeric Juice", "Soot Lampblack", "Bamboo Nib Pen"],
    dimensions: "18 x 24 inches",
    creationTime: "4 Days (28 crafting hours)",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    audioStory: "Our grandmothers in Jitwarpur village painted these sacred trees on clay walls during harvest to welcome prosperity. Every leaf holds birds singing to the monsoon clouds.",
    audioStoryHi: "जितवारपुर गाँव में हमारी दादी-नानी ये पवित्र जीवन-वृक्ष मिट्टी की दीवारों पर बनाती थीं। हर पत्ती में बादलों को पुकारती चिड़ियाँ बसती हैं।",
    artisan: {
      name: "Radha Devi Thakur",
      nameHi: "राधा देवी ठाकुर",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      village: "Jitwarpur, Madhubani District",
      state: "Bihar",
      lineage: "4th Generation Mithila Folk Artist",
      pehchanId: "ART-BH-2023-8841",
      phone: "+91 98452 11029",
      upiId: "radhadevi.crafts@okhdfcbank",
      craftCommunity: "Mithila Mahila Kalakar Samiti",
      verified: true,
      giCertified: true,
      farmerArtisanNote: "Cultivates ancestral paddy fields in monsoon and creates Madhubani artworks in winter harvest season."
    },
    tags: ["Eco-friendly", "Natural Pigments", "GI Tagged", "Heritage", "Zero Plastic"],
    createdAt: new Date().toISOString()
  },
  {
    id: "craft-2",
    title: "Terracotta Panchmukhi Diya & Sacred Urli",
    titleHi: "हस्तनिर्मित पंचमुखी टेराकोटा दीप और उरली",
    craftType: "Bankura & Gorakhpur Terracotta",
    craftCategory: "Clay & Pottery",
    giTag: "GI Reg. No. 402 (Uttar Pradesh)",
    price: 1850,
    marketValuation: {
      rawMaterialCost: 290,
      laborHours: 16,
      hourlyWage: 80,
      craftComplexityScore: 7.5,
      localHaatPrice: 850,
      metroBoutiquePrice: 2400,
      globalExportPrice: 3800,
      fairLivingPrice: 1850,
      profitToArtisanPercent: 82
    },
    materials: ["Ganges Alluvial Silt Clay", "Husk Ash", "Wood-fired Kiln", "Natural Red Ochre"],
    dimensions: "12 inch diameter, 3.2 kg",
    creationTime: "3 Days including 18hr sun dry",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    audioStory: "I shaped this sacred Urli using river silt dug after the floods. The clay cools the room, and when illuminated at dusk, the five flames honor earth, water, fire, wind, and sky.",
    audioStoryHi: "बाढ़ के बाद गंगा किनारे की चिकनी मिट्टी से मैंने यह दीप गढ़ा है। शाम को जब ये पाँचों दिए जलते हैं, तो पंचभूतों को नमन करते हैं।",
    artisan: {
      name: "Rameshwar Prajapati",
      nameHi: "रामेश्वर प्रजापति",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      village: "Aurangabad, Gorakhpur",
      state: "Uttar Pradesh",
      lineage: "Potter Guild (Kumbhakar) Tradition - 38 years on the wheel",
      pehchanId: "ART-UP-2021-4192",
      phone: "+91 94503 62118",
      upiId: "ramesh.kumhar@icici",
      craftCommunity: "Gorakhpur Maati Shilp Parishad",
      verified: true,
      giCertified: true,
      farmerArtisanNote: "Smallholder farmer cultivating wheat; pottery is the generational soul of the Prajapati household."
    },
    tags: ["Wood Fired", "100% Biodegradable", "GI Certified", "Hand-thrown", "Festival Heirloom"],
    createdAt: new Date().toISOString()
  },
  {
    id: "craft-3",
    title: "Royal Cobalt Blue Pottery Floral Floral Vase",
    titleHi: "शाही जयपुरिया ब्लू पॉटरी नक्काशीदार फूलदान",
    craftType: "Jaipur Blue Pottery",
    craftCategory: "Ceramics & Glaze",
    giTag: "GI Reg. No. 64 (Rajasthan)",
    price: 2750,
    marketValuation: {
      rawMaterialCost: 520,
      laborHours: 22,
      hourlyWage: 85,
      craftComplexityScore: 9.0,
      localHaatPrice: 1400,
      metroBoutiquePrice: 3600,
      globalExportPrice: 5500,
      fairLivingPrice: 2750,
      profitToArtisanPercent: 75
    },
    materials: ["Quartz Stone Powder", "Fuller's Earth (Multani Mitti)", "Cobalt Oxide", "Natural Resin"],
    dimensions: "14 inch height",
    creationTime: "5 Days (Low heat charcoal baking)",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
    audioStory: "Unlike clay pottery, this contains zero clay. We grind quartz stones by hand and paint turquoise Persian arabesques that our ancestors brought to Jaipur royal courts.",
    audioStoryHi: "इस मिट्टी के बर्तन में मिट्टी नहीं होती, यह क्वार्ट्ज़ पत्थर और गोंद से बनता है। इस पर नीला कोबाल्ट रंग सदियों से जयपुर के महलों की शान रहा है।",
    artisan: {
      name: "Mohammad Ishaq Khan",
      nameHi: "मोहम्मद इसहाक खान",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      village: "Kot Jewar, Jaipur",
      state: "Rajasthan",
      lineage: "Ustad Tradition - Master Craftsman Awardee 2018",
      pehchanId: "ART-RJ-2019-9021",
      phone: "+91 98290 44321",
      upiId: "ishaq.pottery@paytm",
      craftCommunity: "Jaipur Blue Pottery Karigar Sangh",
      verified: true,
      giCertified: true,
      farmerArtisanNote: "Works with a rural cooperative of 15 women artisans in Kot Jewar village."
    },
    tags: ["Clay-Free", "Quartz Craft", "Cobalt Glaze", "Jaipur Royal Heritage", "GI Tagged"],
    createdAt: new Date().toISOString()
  },
  {
    id: "craft-4",
    title: "Lost-Wax Brass Dhokra Tribal Dancing Figurine",
    titleHi: "ढोकरा ढलाई आदिवासी नृत्य प्रतिमा (कांस्य व पीतल)",
    craftType: "Dhokra Bell Metal Casting",
    craftCategory: "Metal Craft",
    giTag: "GI Reg. No. 83 (Bastar, Chhattisgarh)",
    price: 4200,
    marketValuation: {
      rawMaterialCost: 780,
      laborHours: 34,
      hourlyWage: 90,
      craftComplexityScore: 9.4,
      localHaatPrice: 2100,
      metroBoutiquePrice: 5800,
      globalExportPrice: 8900,
      fairLivingPrice: 4200,
      profitToArtisanPercent: 80
    },
    materials: ["Recycled Brass & Bronze", "Bee Wax Strands", "Anthill Soil", "River Silt"],
    dimensions: "10 x 5 inches, 1.4 kg solid metal",
    creationTime: "7 Days (Each mould is broken, making every piece 100% unique)",
    image: "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&w=800&q=80",
    audioStory: "Our Maria tribal ancestors cast this bronze dance figure using the 4,000-year-old lost-wax technique, unchanged since Mohenjo-daro's dancing girl. Each wax string is twisted by hand.",
    audioStoryHi: "4000 साल पुरानी मोम ढलाई कला से यह बस्तर की नृत्यांगना बनी है। जब सांचा टूटता है, तो दुनिया में सिर्फ एक ही ऐसी मूर्ति जन्म लेती है।",
    artisan: {
      name: "Mangal Ram Ghadwa",
      nameHi: "मंगल राम घड़वा",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      village: "Kondagaon, Bastar",
      state: "Chhattisgarh",
      lineage: "Bastar Tribal Ghadwa Clan - 6th Generation",
      pehchanId: "ART-CG-2022-7714",
      phone: "+91 97521 83042",
      upiId: "mangal.ghadwa@axl",
      craftCommunity: "Bastar Shilpi Gram Sahakari Samiti",
      verified: true,
      giCertified: true,
      farmerArtisanNote: "Forest gatherer and subsistence paddy cultivator in Bastar woods."
    },
    tags: ["Lost Wax Casting", "Non-Ferrous Bell Metal", "GI Certified", "Tribal Folk Heirloom", "Museum Grade"],
    createdAt: new Date().toISOString()
  }
];

class Database {
  constructor() {
    this.data = {
      crafts: [],
      inquiries: [],
      artisans: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(fileContent);
      } else {
        this.data.crafts = INITIAL_CRAFTS;
        this.persist();
      }
    } catch (err) {
      console.error('Error loading database file, initializing with seeds:', err);
      this.data.crafts = INITIAL_CRAFTS;
      this.persist();
    }
  }

  persist() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to database file:', err);
    }
  }

  // Crafts API
  getAllCrafts(filters = {}) {
    let result = [...this.data.crafts];

    if (filters.category && filters.category !== 'All Crafts') {
      result = result.filter(c => c.craftCategory === filters.category);
    }
    if (filters.state && filters.state !== 'All States') {
      result = result.filter(c => c.artisan?.state === filters.state);
    }
    if (filters.maxPrice) {
      result = result.filter(c => c.price <= Number(filters.maxPrice));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.craftType.toLowerCase().includes(q) ||
        c.artisan?.name.toLowerCase().includes(q) ||
        c.artisan?.village.toLowerCase().includes(q)
      );
    }

    return result;
  }

  getCraftById(id) {
    return this.data.crafts.find(c => c.id === id);
  }

  addCraft(craft) {
    const newCraft = {
      ...craft,
      id: craft.id || `craft-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.data.crafts.unshift(newCraft);
    this.persist();
    return newCraft;
  }

  // Inquiries API
  addInquiry(inquiry) {
    const newInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.data.inquiries.push(newInquiry);
    this.persist();
    return newInquiry;
  }

  getStats() {
    return {
      totalCrafts: this.data.crafts.length,
      totalInquiries: this.data.inquiries.length,
      totalCatalogValue: this.data.crafts.reduce((sum, c) => sum + (c.price || 0), 0),
      dbEngine: 'Persistent JSON Document Store / SQLite Compatible'
    };
  }
}

export const db = new Database();
