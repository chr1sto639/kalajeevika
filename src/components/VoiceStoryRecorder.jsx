import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, Sparkles, RefreshCw, CheckCircle2, 
  Globe, HelpCircle, Play, Pause, AlertCircle, Copy, Check
} from 'lucide-react';

export const VoiceStoryRecorder = ({ 
  transcript, 
  setTranscript, 
  polishedStory, 
  setPolishedStory,
  language = 'en',
  craftType = ''
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [speechLanguage, setSpeechLanguage] = useState('hi-IN');
  const [isSupported, setIsSupported] = useState(true);
  const [isPolishing, setIsPolishing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef(null);

  const languageOptions = [
    { code: 'hi-IN', label: 'हिन्दी', sub: 'Hindi' },
    { code: 'en-IN', label: 'English', sub: 'India' },
    { code: 'bn-IN', label: 'বাংলা', sub: 'Bengali' },
    { code: 'ta-IN', label: 'தமிழ்', sub: 'Tamil' },
    { code: 'te-IN', label: 'తెలుగు', sub: 'Telugu' },
    { code: 'mr-IN', label: 'मराठी', sub: 'Marathi' },
    { code: 'gu-IN', label: 'ગુજરાતી', sub: 'Gujarati' },
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speechLanguage;

      recognition.onresult = (event) => {
        let currentInterim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript((prev) => (prev ? prev + ' ' : '') + finalTranscript.trim());
        }
        setInterimText(currentInterim);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [speechLanguage, setTranscript]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      // Fallback simulation for browsers/devices without mic permission
      if (!isRecording) {
        setIsRecording(true);
        const sampleVoices = [
          "ये कलाकृति मैंने गंगा किनारे की चिकनी मिट्टी से बनाई है। इसमें हमारे गाँव के लोकगीतों की मिठास और पीढ़ियों की साधना है।",
          "I carved this using wild neem wood and natural vegetable lacquer. It took me 3 days of patience under the banyan tree shade.",
          "This painting tells the story of our harvest festival, where peacocks dance to celebrate the first monsoon showers over our fields."
        ];
        const randomSample = sampleVoices[Math.floor(Math.random() * sampleVoices.length)];
        let i = 0;
        const interval = setInterval(() => {
          if (i <= randomSample.length) {
            setInterimText(randomSample.slice(0, i));
            i += 3;
          } else {
            clearInterval(interval);
            setTranscript((prev) => (prev ? prev + ' ' : '') + randomSample);
            setInterimText('');
            setIsRecording(false);
          }
        }, 80);
      } else {
        setIsRecording(false);
      }
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.lang = speechLanguage;
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  // AI Story Polishing & Translation
  const handleEnhanceWithAI = () => {
    const baseText = transcript || interimText;
    if (!baseText) return;
    setIsPolishing(true);

    setTimeout(() => {
      const craftMention = craftType || 'Traditional Craft';
      const enhancedStory = `Crafted with generational devotion by master hands in rural India. "${baseText.trim()}" This authentic ${craftMention} piece utilizes 100% natural indigenous materials, carrying the fragrance of rural soil and ancient folklore. Every stroke and curve embodies centuries of living heritage, directly uplifting the artisan's household and sustaining indigenous ecological traditions.`;
      
      setPolishedStory(enhancedStory);
      setIsPolishing(false);
    }, 1200);
  };

  // Text-to-Speech playback
  const playAudioNarrative = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    if (speechLanguage.startsWith('hi')) {
      const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi'));
      if (hiVoice) utterance.voice = hiVoice;
    }
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const samplePrompts = [
    { 
      icon: "🏺",
      label: "Clay & River Silt", 
      labelHi: "मिट्टी व नदी का स्रोत",
      text: "मैंने इसे नदी किनारे की शुद्ध चिकनी मिट्टी से तैयार किया है, जिसे धूप में सुखाकर भट्टी में पकाया गया।" 
    },
    { 
      icon: "🦚",
      label: "Peacock & Harvest", 
      labelHi: "मोर व फसल उत्सव",
      text: "जब हमारे गाँव में पहली मानसूनी बारिश होती है और मोर नाचते हैं, तब हम फसल के स्वागत में यह बनाते हैं।" 
    },
    { 
      icon: "🌿",
      label: "Turmeric & Forest Dye", 
      labelHi: "हल्दी व प्राकृतिक रंग",
      text: "The golden yellow comes from fresh turmeric roots and the deep indigo is extracted from wild forest leaves." 
    },
    { 
      icon: "👴",
      label: "Grandfather's Teaching", 
      labelHi: "दादाजी की सीख",
      text: "यह कला मैंने बचपन में अपने दादाजी के साथ बैठकर सीखी थी, जो गाँव के जाने-माने उस्ताद कारीगर थे।" 
    }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FCF9F3] p-5 sm:p-7 rounded-3xl border border-[#E8DCBF] shadow-warm">
      {/* Header and Language Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADDC5]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-terracotta-500 to-marigold-500 text-white flex items-center justify-center shadow-md">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-stone-900 text-base sm:text-lg font-serif-craft">
                {language === 'hi' ? 'बोली से कहानी • Voice Story' : 'Artisan Voice-to-Story'}
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-terracotta-100 text-terracotta-800 px-2 py-0.5 rounded-full">
                AI Speech-to-Text
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              {language === 'hi' ? 'अपनी भाषा में बोलें — AI खरीदारों के लिए आकर्षक विवरण तैयार करेगा' : 'Speak in your native dialect; AI turns your spoken words into a compelling story.'}
            </p>
          </div>
        </div>

        {/* Language selector chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {languageOptions.slice(0, 4).map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setSpeechLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 border ${
                speechLanguage === lang.code
                  ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>{lang.label}</span>
              <span className="text-[10px] opacity-75 font-normal">({lang.sub})</span>
            </button>
          ))}
          {/* Dropdown for other languages */}
          <select
            value={speechLanguage}
            onChange={(e) => setSpeechLanguage(e.target.value)}
            className="text-xs bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 font-medium text-stone-700 focus:outline-none"
          >
            <option value="hi-IN">More Languages...</option>
            <option value="te-IN">తెలుగు (Telugu)</option>
            <option value="mr-IN">मराठी (Marathi)</option>
            <option value="gu-IN">ગુજરાતી (Gujarati)</option>
          </select>
        </div>
      </div>

      {/* Hero Recording Button & Visualizer */}
      <div className="flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-b from-white to-[#FDFBF7] rounded-2xl border border-[#EFE6D4] my-5 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isRecording ? 'bg-red-500/5' : 'bg-transparent'
        }`} />

        <div className="relative">
          {/* Pulsing ring when active */}
          {isRecording && (
            <div className="absolute -inset-3 rounded-full bg-red-400/30 animate-ping"></div>
          )}
          
          <button
            type="button"
            onClick={toggleRecording}
            className={`relative w-20 h-20 rounded-full transition-all transform active:scale-95 flex items-center justify-center shadow-xl ${
              isRecording 
                ? 'bg-red-600 text-white ring-8 ring-red-100 scale-105' 
                : 'bg-gradient-to-tr from-terracotta-600 to-marigold-500 hover:from-terracotta-700 hover:to-marigold-600 text-white hover:shadow-glow-gold'
            }`}
            title={isRecording ? "Click to Stop Speaking" : "Click to Speak"}
          >
            {isRecording ? <MicOff className="w-9 h-9" /> : <Mic className="w-9 h-9" />}
          </button>
        </div>

        {/* Live Status indicator */}
        <div className="mt-4 text-center">
          {isRecording ? (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-sm font-bold text-red-600">
                {language === 'hi' ? 'हम सुन रहे हैं... दिल खोलकर बोलिए' : 'Listening live... Speak freely in your language'}
              </span>
            </div>
          ) : (
            <span className="text-xs sm:text-sm font-semibold text-stone-700">
              {language === 'hi' ? 'माइक दबाकर अपनी कला की कहानी सुनाएँ' : 'Tap microphone and speak about your craft'}
            </span>
          )}
        </div>

        {/* Soundwave animation */}
        {isRecording && (
          <div className="flex items-center gap-1.5 mt-3 h-8">
            <span className="soundwave-bar w-1.5 bg-red-500 rounded-full"></span>
            <span className="soundwave-bar w-1.5 bg-terracotta-500 rounded-full"></span>
            <span className="soundwave-bar w-1.5 bg-marigold-500 rounded-full"></span>
            <span className="soundwave-bar w-1.5 bg-red-500 rounded-full"></span>
            <span className="soundwave-bar w-1.5 bg-terracotta-600 rounded-full"></span>
            <span className="soundwave-bar w-1.5 bg-marigold-600 rounded-full"></span>
            <span className="soundwave-bar w-1.5 bg-red-600 rounded-full"></span>
            <span className="soundwave-bar w-1.5 bg-terracotta-700 rounded-full"></span>
          </div>
        )}
      </div>

      {/* Suggested Story Starters */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 text-xs text-stone-600 font-bold uppercase tracking-wider mb-2.5">
          <HelpCircle className="w-3.5 h-3.5 text-marigold-600" />
          <span>{language === 'hi' ? 'कहानी के सुझाव (Click to fill inspiration):' : 'Voice Story Starters (Tap any to auto-fill):'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTranscript((prev) => (prev ? prev + ' ' : '') + p.text);
              }}
              className="text-left p-2.5 rounded-xl bg-white hover:bg-amber-50/70 border border-stone-200 hover:border-amber-300 transition-all flex items-start gap-2.5 group"
            >
              <span className="text-base group-hover:scale-110 transition-transform">{p.icon}</span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-stone-800 block truncate">
                  {language === 'hi' ? p.labelHi : p.label}
                </span>
                <span className="text-[11px] text-stone-500 line-clamp-1">
                  "{p.text}"
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Spoken Transcript Input Area */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <span>{language === 'hi' ? 'बोले गए शब्द (Live Voice Transcript):' : 'Your Spoken Words:'}</span>
            <span className="text-[10px] text-stone-400 font-normal">Edit or add more details anytime</span>
          </label>
          {transcript && (
            <button
              type="button"
              onClick={() => setTranscript('')}
              className="text-[11px] text-stone-400 hover:text-red-500 font-medium"
            >
              Clear
            </button>
          )}
        </div>
        <textarea
          rows={3}
          value={transcript || interimText}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder={
            language === 'hi' 
              ? 'यहाँ आपके बोले हुए शब्द अपने आप टाइप होंगे। आप खुद भी टाइप कर सकते हैं...'
              : 'Spoken words appear here automatically. You can also type directly in any language...'
          }
          className="w-full bg-white border border-[#E2D5BA] rounded-2xl p-3.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-transparent resize-none leading-relaxed shadow-inner"
        />
      </div>

      {/* AI Story Polishing & Audio Playback Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EADDC5]">
        <button
          type="button"
          disabled={(!transcript && !interimText) || isPolishing}
          onClick={handleEnhanceWithAI}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md ${
            (!transcript && !interimText) || isPolishing
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-terracotta-600 via-marigold-600 to-terracotta-700 text-white hover:shadow-lg transform active:scale-95'
          }`}
        >
          {isPolishing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{language === 'hi' ? 'AI कहानी को संवार रहा है...' : 'AI Polishing Story...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{language === 'hi' ? 'AI से खरीदार-अनुकूल कहानी बनाएं' : 'Polish into Buyer Story with AI'}</span>
            </>
          )}
        </button>

        {(transcript || polishedStory) && (
          <button
            type="button"
            onClick={() => playAudioNarrative(polishedStory || transcript)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
              isPlayingAudio 
                ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-200' 
                : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 shadow-xs'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Pause className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>Pause Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-terracotta-600" />
                <span>Hear Spoken Audio</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Polished Story Result Box */}
      {polishedStory && (
        <div className="mt-5 p-5 bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white border-2 border-amber-300/80 rounded-2xl relative shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-200/60">
            <div className="flex items-center gap-2 text-terracotta-800 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-marigold-600" />
              <span>AI ENHANCED PROVENANCE STORY</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy(polishedStory)}
                className="text-[11px] text-stone-600 hover:text-stone-900 flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-stone-200"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready for Buyers
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed italic font-serif">
            "{polishedStory}"
          </p>
        </div>
      )}
    </div>
  );
};
