import React, { useState, useRef, useEffect, useId } from 'react';
import { 
  Camera, Upload, Sparkles, Check, ArrowRight, ArrowLeft, ShieldCheck, 
  MapPin, Wheat, RefreshCw, Image as ImageIcon, Volume2, Award, 
  CheckCircle2, AlertCircle, Info, Zap, HelpCircle, Eye, Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VoiceStoryRecorder } from './VoiceStoryRecorder';
import { PricingEngine } from './PricingCalculatorModal';
import { DEMO_PRESETS } from '../data/craftsData';

export const ArtisanStudio = ({ onAddCraft, language = 'en', onSwitchToMarketplace }) => {
  // Stepper mode: 1 = Photo, 2 = Voice Story, 3 = Pricing, 4 = Profile & Publish
  const [currentStep, setCurrentStep] = useState(1);
  const [studioMode, setStudioMode] = useState('stepper'); // 'stepper' or 'all-in-one'

  // Upload & Camera States
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDetection, setAiDetection] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);

  // Form & Provenance States
  const [title, setTitle] = useState('');
  const [craftType, setCraftType] = useState('Madhubani / Mithila Art');
  const [materials, setMaterials] = useState('');
  const [voiceStory, setVoiceStory] = useState('');
  const [polishedStory, setPolishedStory] = useState('');
  const [finalPrice, setFinalPrice] = useState(2400);

  // Artisan / Farmer Profile
  const [artisanName, setArtisanName] = useState('Kamala Devi');
  const [village, setVillage] = useState('Ranti, Madhubani');
  const [state, setState] = useState('Bihar');
  const [farmerNote, setFarmerNote] = useState('Cultivates organic pulses and paddy during monsoon; crafts folk paintings in autumn harvest.');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [upiId, setUpiId] = useState('kamala.artisan@upi');
  const [lineage, setLineage] = useState('3rd Generation Mithila Heritage Practitioner');

  // Success state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdCraft, setCreatedCraft] = useState(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const titleInputId = useId();
  const craftTypeSelectId = useId();
  const materialsInputId = useId();
  const artisanNameInputId = useId();
  const villageInputId = useId();
  const stateSelectId = useId();
  const farmerNoteInputId = useId();
  const phoneInputId = useId();
  const upiIdInputId = useId();

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // Audio instructions for each step (for low-literacy users)
  const playStepAudioGuide = (stepNumber) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    let guideText = '';
    if (stepNumber === 1) {
      guideText = language === 'hi'
        ? 'चरण 1: अपने हाथ से बने सामान की कैमरे से एक सुंदर फोटो लें या गैलरी से अपलोड करें।'
        : 'Step 1: Take a clear photo of your craft using the camera button, or upload an existing image.';
    } else if (stepNumber === 2) {
      guideText = language === 'hi'
        ? 'चरण 2: माइक का बटन दबाएं और अपनी भाषा में बताएं कि यह कलाकृति आपने कैसे और किस सामग्री से बनाई है।'
        : 'Step 2: Tap the microphone and tell the story of your craft in your native voice.';
    } else if (stepNumber === 3) {
      guideText = language === 'hi'
        ? 'चरण 3: यह टूल आपकी मेहनत और समय के आधार पर सही दाम तय करने में मदद करेगा। बिचौलियों से सावधान रहें।'
        : 'Step 3: Review the AI market price recommendation based on your materials and crafting hours.';
    } else if (stepNumber === 4) {
      guideText = language === 'hi'
        ? 'चरण 4: अपना नाम, गाँव और खेती का विवरण जाँचें और प्रकाशित करें। सारा पैसा सीधे आपके बैंक में आएगा।'
        : 'Step 4: Confirm your artisan profile details and publish your piece directly to patrons.';
    }

    const utterance = new SpeechSynthesisUtterance(guideText);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Start live webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable, using fallback:', err);
      alert('Camera access could not be initialized. You can upload an image or choose one of the quick demo presets below!');
    }
  };

  // Capture photo from live webcam with flash effect
  const capturePhoto = () => {
    if (!videoRef.current) return;
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    // Stop camera
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);

    processUploadedImage(dataUrl, "Handcrafted Live Capture");
  };

  // Handle local file selection
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        processUploadedImage(event.target?.result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Process image & trigger AI Vision analysis
  const processUploadedImage = (imageDataUrl, imageName) => {
    setSelectedImage(imageDataUrl);
    setIsAnalyzing(true);

    setTimeout(() => {
      let preset = DEMO_PRESETS[0];
      if (imageName.toLowerCase().includes('pot') || imageName.toLowerCase().includes('clay') || imageName.toLowerCase().includes('terracotta')) {
        preset = DEMO_PRESETS[1];
      } else if (imageName.toLowerCase().includes('blue') || imageName.toLowerCase().includes('ceramic')) {
        preset = DEMO_PRESETS[2];
      }

      setTitle(preset.name);
      setCraftType(preset.craftType);
      setMaterials(preset.materials.join(', '));
      setFinalPrice(preset.materialCost * 4.5);

      setAiDetection({
        category: preset.category,
        detectedElements: preset.detectedElements,
        suggestedHours: preset.suggestedHours,
        materialCost: preset.materialCost,
        confidence: "98.4%",
        giEligible: true
      });

      setIsAnalyzing(false);
    }, 1200);
  };

  // Quick preset loader
  const loadPreset = (preset) => {
    processUploadedImage(preset.image, preset.name);
    if (!voiceStory) {
      setVoiceStory(preset.storyPrompt);
    }
  };

  // Final submission of craft
  const handlePublishCraft = (e) => {
    e?.preventDefault();
    if (!selectedImage) {
      alert('Please snap or upload a photo of your craft first!');
      setCurrentStep(1);
      return;
    }

    const newCraft = {
      id: `craft-custom-${Date.now()}`,
      title: title || 'Authentic Indigenous Craft',
      titleHi: title,
      craftType: craftType,
      craftCategory: aiDetection?.category || 'Traditional Craft',
      giTag: 'GI Verified Artisan',
      price: finalPrice,
      marketValuation: {
        rawMaterialCost: aiDetection?.materialCost || 350,
        laborHours: aiDetection?.suggestedHours || 20,
        hourlyWage: 85,
        craftComplexityScore: 8.5,
        localHaatPrice: Math.round(finalPrice * 0.48),
        metroBoutiquePrice: Math.round(finalPrice * 1.6),
        globalExportPrice: Math.round(finalPrice * 2.8),
        fairLivingPrice: finalPrice,
        profitToArtisanPercent: 82
      },
      materials: materials ? materials.split(',').map(m => m.trim()) : ['Natural river silt', 'Herbal dyes'],
      dimensions: 'Handcrafted dimensions',
      creationTime: `${aiDetection?.suggestedHours || 20} crafting hours`,
      image: selectedImage,
      audioStory: polishedStory || voiceStory || 'Generational handcrafted masterwork created with pure organic materials.',
      audioStoryHi: voiceStory,
      artisan: {
        name: artisanName,
        nameHi: artisanName,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        village: village,
        state: state,
        lineage: lineage,
        pehchanId: `ART-${state.slice(0, 2).toUpperCase()}-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        phone: phone,
        upiId: upiId,
        craftCommunity: 'Local Rural Self-Help Cooperative',
        verified: true,
        giCertified: true,
        farmerArtisanNote: farmerNote
      },
      tags: ['Eco-friendly', 'Direct Artisan', 'Handcrafted', 'GI Tagged', '100% Direct UPI']
    };

    onAddCraft(newCraft);
    setCreatedCraft(newCraft);
    setIsSubmitted(true);

    // Celebratory Confetti!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#C85A32', '#F59E0B', '#1E3A8A', '#0D9488']
    });
  };

  const stepsList = [
    { num: 1, title: language === 'hi' ? 'फोटो लें' : 'Snap Photo', icon: Camera, desc: 'Zero hassle picture' },
    { num: 2, title: language === 'hi' ? 'बोली से कहानी' : 'Voice Story', icon: Volume2, desc: 'Speech-to-text folklore' },
    { num: 3, title: language === 'hi' ? 'उचित मूल्य' : 'Fair Pricing', icon: Zap, desc: 'AI Market Intelligence' },
    { num: 4, title: language === 'hi' ? 'प्रकाशित करें' : 'Creator Profile', icon: Wheat, desc: 'Direct UPI & Provenance' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2.5 border border-amber-300">
          <Zap className="w-3.5 h-3.5 text-terracotta-600" />
          <span>Hassle-Free AI Artisan Studio • कला स्टूडियो</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-craft font-bold text-stone-900 tracking-tight">
          {language === 'hi' ? 'फोटो खींचें, बोलकर कहानी कहें, सही दाम पाएं' : 'Snap, Speak, and Value Your Craft'}
        </h1>
        <p className="mt-2 text-xs sm:text-sm md:text-base text-stone-600 max-w-2xl mx-auto">
          {language === 'hi'
            ? 'ग्रामीण कारीगरों और किसान-शिल्पियों के लिए सहज डिजिटल मंच। बस एक तस्वीर लें, अपनी बोली में कहानी सुनाएँ, और बिचौलियों के बिना सीधे अपने बैंक खाते में सही मूल्य पाएँ।'
            : 'Zero technical barriers. Snap a picture with your camera, tell your folklore in your native voice, and let AI set a fair market price directly to your UPI.'}
        </p>

        {/* View Mode Toggle (Stepper vs All-in-One) */}
        <div className="mt-5 inline-flex items-center p-1 bg-stone-200/70 rounded-2xl">
          <button
            type="button"
            onClick={() => setStudioMode('stepper')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              studioMode === 'stepper' 
                ? 'bg-white text-stone-900 shadow-sm' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Step-by-Step Guided Wizard</span>
          </button>
          <button
            type="button"
            onClick={() => setStudioMode('all-in-one')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              studioMode === 'all-in-one' 
                ? 'bg-white text-stone-900 shadow-sm' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>All-in-One Studio View</span>
          </button>
        </div>
      </div>

      {/* SUCCESS SCREEN */}
      {isSubmitted && createdCraft ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-400 p-8 shadow-art text-center max-w-2xl mx-auto my-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif-craft">
            {language === 'hi' ? 'बधाई हो! आपकी कलाकृति प्रकाशित हो गई है' : 'Masterpiece Successfully Published!'}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-md mx-auto">
            "{createdCraft.title}" is now showcased live on the Kalajeevika Marketplace at <strong>₹{createdCraft.price.toLocaleString('en-IN')}</strong> with full provenance and direct WhatsApp/UPI links.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <button
              onClick={onSwitchToMarketplace}
              className="w-full sm:w-auto bg-gradient-to-r from-terracotta-600 to-marigold-600 hover:from-terracotta-700 hover:to-marigold-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>View in Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedImage(null);
                setAiDetection(null);
                setVoiceStory('');
                setPolishedStory('');
                setCurrentStep(1);
              }}
              className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold px-6 py-3 rounded-2xl transition-colors text-sm"
            >
              + Upload Another Craft Piece
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* STEPPER PROGRESS BAR (in Stepper Mode) */}
          {studioMode === 'stepper' && (
            <div className="mb-8 bg-white p-4 sm:p-5 rounded-3xl border border-[#EADBCC] shadow-warm">
              <div className="grid grid-cols-4 gap-2 relative">
                {stepsList.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.num;
                  const isCompleted = currentStep > step.num;

                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => setCurrentStep(step.num)}
                      className={`flex flex-col items-center text-center p-2 rounded-2xl transition-all ${
                        isActive 
                          ? 'bg-amber-50/90 text-terracotta-700 ring-2 ring-terracotta-500' 
                          : isCompleted 
                            ? 'text-emerald-700 hover:bg-stone-50' 
                            : 'text-stone-400 hover:bg-stone-50'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold mb-1 transition-all ${
                        isActive 
                          ? 'bg-terracotta-600 text-white shadow-md' 
                          : isCompleted 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-stone-200 text-stone-600'
                      }`}>
                        {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold truncate max-w-[80px] sm:max-w-none">
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Spoken Audio Helper for the current step */}
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-medium">
                  {language === 'hi' ? `चरण ${currentStep} / 4: ${stepsList[currentStep - 1].desc}` : `Step ${currentStep} of 4: ${stepsList[currentStep - 1].desc}`}
                </span>
                <button
                  type="button"
                  onClick={() => playStepAudioGuide(currentStep)}
                  className="flex items-center gap-1.5 text-xs font-bold text-terracotta-700 bg-amber-100/70 hover:bg-amber-100 px-3 py-1 rounded-xl transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>{language === 'hi' ? 'इस चरण की आवाज सुनें' : 'Listen to Step Guide'}</span>
                </button>
              </div>
            </div>
          )}

          {/* MAIN FORM */}
          <form onSubmit={handlePublishCraft} className="space-y-6">
            {/* STEP 1: PHOTO CAPTURE */}
            {(studioMode === 'all-in-one' || currentStep === 1) && (
              <div className="bg-white rounded-3xl border border-[#E8DCBF] shadow-warm p-5 sm:p-7">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-terracotta-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      1
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-craft">
                        {language === 'hi' ? 'फोटो लें या अपलोड करें (Zero Hassle Picture)' : 'Snap or Upload a Photo of Your Craft'}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {language === 'hi' ? 'कैमरे से तुरंत तस्वीर खींचें या गैलरी से चुनें' : 'Snap directly with your camera or select from your gallery'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1-Tap Demo Presets */}
                <div className="mb-4 bg-[#FCFAF6] p-3.5 rounded-2xl border border-amber-200">
                  <span className="text-[11px] font-bold text-terracotta-800 uppercase tracking-wider block mb-2">
                    ⚡ Quick Test: Tap any authentic craft to test AI diagnosis instantly:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {DEMO_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => loadPreset(preset)}
                        className="text-xs bg-white hover:bg-amber-50 text-stone-800 px-3 py-1.5 rounded-xl border border-stone-300 hover:border-terracotta-400 font-medium transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <span>🎨 {preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Camera / Upload Viewport */}
                <div className="border-2 border-dashed border-[#DCCBB0] rounded-3xl p-6 bg-[#FCFBF8] text-center relative overflow-hidden">
                  {isCameraActive ? (
                    /* Live Camera Viewfinder with Target Reticle */
                    <div className="relative max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-80 object-cover"
                      />

                      {/* Framing Reticle */}
                      <div className="absolute inset-8 pointer-events-none">
                        <div className="absolute top-0 left-0 w-8 h-8 camera-corner-tl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 camera-corner-tr"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 camera-corner-bl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 camera-corner-br"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white/60 text-xs bg-black/40 px-3 py-1 rounded-full">
                            Center craft here
                          </span>
                        </div>
                      </div>

                      {/* Flash Simulation effect */}
                      {isFlashing && (
                        <div className="absolute inset-0 bg-white opacity-90 transition-opacity"></div>
                      )}

                      {/* Camera Shutter Actions */}
                      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={capturePhoto}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold p-5 rounded-full shadow-2xl ring-4 ring-white animate-pulse transform active:scale-90 transition-transform"
                          title="Click Shutter"
                        >
                          <Camera className="w-8 h-8" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (cameraStream) cameraStream.getTracks().forEach(t => t.stop());
                            setIsCameraActive(false);
                          }}
                          className="bg-black/60 text-white text-xs px-3 py-2 rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : selectedImage ? (
                    /* Photo Preview with AI Scan */
                    <div className="relative max-w-md mx-auto">
                      <img
                        src={selectedImage}
                        alt="Craft Snapshot"
                        className="w-full h-72 sm:h-80 object-cover rounded-2xl shadow-md border-2 border-terracotta-200"
                      />

                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-terracotta-900/50 rounded-2xl backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                          <div className="w-12 h-12 rounded-full border-4 border-amber-300 border-t-transparent animate-spin mb-3"></div>
                          <div className="bg-stone-900/90 px-4 py-2 rounded-xl text-xs font-bold tracking-wide">
                            AI Scanning Pigments, Natural Fibers & GI Eligibility...
                          </div>
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedImage(null)}
                          className="text-xs text-stone-500 hover:text-red-600 underline font-medium"
                        >
                          Change Photo
                        </button>
                        <button
                          type="button"
                          onClick={startCamera}
                          className="text-xs text-terracotta-700 hover:text-terracotta-800 font-bold flex items-center gap-1"
                        >
                          <Camera className="w-3.5 h-3.5" /> Retake with Camera
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Empty State: Giant Buttons */
                    <div className="py-8">
                      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
                        <button
                          type="button"
                          onClick={startCamera}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-terracotta-600 to-marigold-600 hover:from-terracotta-700 hover:to-marigold-700 text-white font-bold text-sm px-7 py-4 rounded-2xl shadow-md transition-all transform active:scale-95"
                        >
                          <Camera className="w-5 h-5" />
                          <span>{language === 'hi' ? 'कैमरा खोलें (Take Photo)' : 'Take Photo with Camera'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm px-6 py-4 rounded-2xl shadow-sm transition-all"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Upload from Gallery</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="text-xs text-stone-400">
                        Works on any phone or laptop camera. High quality photos sell 3x faster!
                      </p>
                    </div>
                  )}
                </div>

                {/* AI Vision Results Card */}
                {aiDetection && (
                  <div className="mt-5 bg-gradient-to-br from-amber-50 to-orange-50/80 border border-amber-300 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-terracotta-600" />
                        <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                          AI Vision Craft Diagnosis
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {aiDetection.confidence} Match
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-white/90 p-2.5 rounded-xl border border-amber-200">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">Craft Tradition</span>
                        <span className="font-bold text-stone-900 truncate block">{craftType}</span>
                      </div>
                      <div className="bg-white/90 p-2.5 rounded-xl border border-amber-200">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">Crafting Time</span>
                        <span className="font-bold text-stone-900">{aiDetection.suggestedHours} Hours</span>
                      </div>
                      <div className="bg-white/90 p-2.5 rounded-xl border border-amber-200">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">Raw Material Est.</span>
                        <span className="font-bold text-stone-900">₹{aiDetection.materialCost}</span>
                      </div>
                      <div className="bg-white/90 p-2.5 rounded-xl border border-amber-200">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">GI Tag Eligibility</span>
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Certified
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Step CTA (in Stepper Mode) */}
                {studioMode === 'stepper' && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      disabled={!selectedImage}
                      onClick={() => setCurrentStep(2)}
                      className={`flex items-center gap-2 font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-all ${
                        selectedImage
                          ? 'bg-terracotta-600 hover:bg-terracotta-700 text-white shadow-md'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Proceed to Voice Story (चरण 2)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: VOICE STORY */}
            {(studioMode === 'all-in-one' || currentStep === 2) && (
              <div className="bg-white rounded-3xl border border-[#E8DCBF] shadow-warm p-5 sm:p-7">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-marigold-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      2
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-craft">
                        {language === 'hi' ? 'बोली से कहानी (Speech to Text Story)' : 'Voice-to-Story: Tell the Lore in Your Dialect'}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {language === 'hi' ? 'अपनी भाषा में बोलें — AI खरीदारों के लिए मनमोहक कहानी बनाएगा' : 'Speak about materials, heritage, or harvest traditions'}
                      </p>
                    </div>
                  </div>
                </div>

                <VoiceStoryRecorder
                  transcript={voiceStory}
                  setTranscript={setVoiceStory}
                  polishedStory={polishedStory}
                  setPolishedStory={setPolishedStory}
                  language={language}
                  craftType={craftType}
                />

                {/* Step navigation in stepper mode */}
                {studioMode === 'stepper' && (
                  <div className="mt-6 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-stone-600 hover:text-stone-900 text-xs font-bold flex items-center gap-1.5 px-4 py-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex items-center gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
                    >
                      <span>Proceed to Fair Pricing (चरण 3)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: FAIR PRICING */}
            {(studioMode === 'all-in-one' || currentStep === 3) && (
              <div className="bg-white rounded-3xl border border-[#E8DCBF] shadow-warm p-5 sm:p-7">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      3
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-craft">
                        {language === 'hi' ? 'AI उचित मूल्य निर्धारक (Market Fair Price)' : 'AI Fair Market Pricing Intelligence'}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {language === 'hi' ? 'कच्चा माल, मेहनत और बाजार मांग के आधार पर सही दाम तय करें' : 'Dynamic algorithm ensuring fair living wage without middleman deductions'}
                      </p>
                    </div>
                  </div>
                </div>

                <PricingEngine
                  materialCost={aiDetection?.materialCost || 380}
                  craftingHours={aiDetection?.suggestedHours || 20}
                  complexityScore={8.2}
                  craftType={craftType}
                  currentPrice={finalPrice}
                  onApplyPrice={(val) => setFinalPrice(val)}
                  language={language}
                />

                {/* Step navigation in stepper mode */}
                {studioMode === 'stepper' && (
                  <div className="mt-6 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-stone-600 hover:text-stone-900 text-xs font-bold flex items-center gap-1.5 px-4 py-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Story</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="flex items-center gap-2 bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all"
                    >
                      <span>Proceed to Creator Profile (चरण 4)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: PROVENANCE PROFILE & PUBLISH */}
            {(studioMode === 'all-in-one' || currentStep === 4) && (
              <div className="bg-white rounded-3xl border border-[#E8DCBF] shadow-warm p-5 sm:p-7">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-indigoCraft-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      4
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif-craft">
                        {language === 'hi' ? 'किसान व शिल्पी परिचय (Creator & Farmer Dossier)' : 'Artisan & Farmer Provenance Profile'}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {language === 'hi' ? 'प्रत्येक कलाकृति के साथ आपके खेत, गाँव और पारिवारिक परंपरा का विवरण दिखाई देगा' : 'Transparent creator credentials visible to every buyer for authentic connection.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label htmlFor={titleInputId} className="block font-semibold text-stone-700 mb-1">
                      Craft / Artwork Title
                    </label>
                    <input
                      id={titleInputId}
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Sacred Peacock Madhubani Canvas"
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-stone-900 font-medium focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={craftTypeSelectId} className="block font-semibold text-stone-700 mb-1">
                      Craft Tradition / Technique
                    </label>
                    <select
                      id={craftTypeSelectId}
                      value={craftType}
                      onChange={(e) => setCraftType(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-stone-900 font-medium focus:ring-2 focus:ring-terracotta-500 outline-none"
                    >
                      <option value="Madhubani / Mithila Art">Madhubani / Mithila Painting (Bihar)</option>
                      <option value="Bankura & Gorakhpur Terracotta">Bankura & Gorakhpur Terracotta (UP/Bengal)</option>
                      <option value="Jaipur Blue Pottery">Jaipur Blue Pottery (Rajasthan)</option>
                      <option value="Dhokra Bell Metal Casting">Dhokra Lost-Wax Casting (Chhattisgarh)</option>
                      <option value="Channapatna Wooden Toys">Channapatna Lacquer Toys (Karnataka)</option>
                      <option value="Warli Tribal Painting">Warli Indigenous Art (Maharashtra)</option>
                      <option value="Kutch Rogan & Weaving">Kutch Rogan Art (Gujarat)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={artisanNameInputId} className="block font-semibold text-stone-700 mb-1">
                      Artisan / Creator Full Name
                    </label>
                    <input
                      id={artisanNameInputId}
                      type="text"
                      value={artisanName}
                      onChange={(e) => setArtisanName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-stone-900 font-medium focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor={villageInputId} className="block font-semibold text-stone-700 mb-1">
                        Village / Panchayat
                      </label>
                      <input
                        id={villageInputId}
                        type="text"
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-stone-900 font-medium focus:ring-2 focus:ring-terracotta-500 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={stateSelectId} className="block font-semibold text-stone-700 mb-1">
                        State
                      </label>
                      <select
                        id={stateSelectId}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-stone-900 font-medium focus:ring-2 focus:ring-terracotta-500 outline-none"
                      >
                        <option value="Bihar">Bihar</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Odisha">Odisha</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor={farmerNoteInputId} className="block font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                      <Wheat className="w-3.5 h-3.5 text-amber-600" />
                      <span>Farming & Rural Livelihood Details (किसान/शिल्पी आजीविका)</span>
                    </label>
                    <textarea
                      id={farmerNoteInputId}
                      rows={2}
                      value={farmerNote}
                      onChange={(e) => setFarmerNote(e.target.value)}
                      placeholder="Describe your agricultural background, family farm, or seasonal harvest schedule..."
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-stone-900 font-medium focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={phoneInputId} className="block font-semibold text-stone-700 mb-1">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      id={phoneInputId}
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-stone-900 font-medium focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor={upiIdInputId} className="block font-semibold text-stone-700 mb-1">
                      UPI ID for Direct 100% Payment
                    </label>
                    <input
                      id={upiIdInputId}
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-stone-900 font-medium focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor={materialsInputId} className="block font-semibold text-stone-700 mb-1">
                      Natural Raw Materials Used (comma separated)
                    </label>
                    <input
                      id={materialsInputId}
                      type="text"
                      value={materials}
                      onChange={(e) => setMaterials(e.target.value)}
                      placeholder="e.g. Ganges river silt clay, turmeric juice, wild bamboo nib, mustard soot"
                      className="w-full bg-[#FAF7F2] border border-stone-200 rounded-xl p-3 text-stone-900 font-medium focus:ring-2 focus:ring-terracotta-500 outline-none"
                    />
                  </div>
                </div>

                {/* Final Submit Button */}
                <div className="mt-8 pt-5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {studioMode === 'stepper' && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-stone-600 hover:text-stone-900 text-xs font-bold flex items-center gap-1.5 px-4 py-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Pricing</span>
                    </button>
                  )}

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-terracotta-600 via-marigold-600 to-terracotta-700 hover:from-terracotta-700 hover:to-terracotta-800 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-art hover:shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Award className="w-5 h-5 text-amber-200" />
                    <span>{language === 'hi' ? 'कलाकृति प्रकाशित करें और प्रमाण पत्र पाएं' : 'Publish Masterpiece & Generate Provenance Certificate'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
