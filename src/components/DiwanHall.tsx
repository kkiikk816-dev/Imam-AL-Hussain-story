import { useState, useEffect } from "react";
import { ChevronRight, Feather, Quote, ChevronDown, ChevronUp, Search, PenTool, BookOpen, ScrollText, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { poems } from "../data/poems";

interface DiwanHallProps {
  onBack: () => void;
}

export default function DiwanHall({ onBack }: DiwanHallProps) {
  const [activeCategory, setActiveCategory] = useState<string>("poetry");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('karbala_diwan_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('karbala_diwan_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: "poetry", label: "الأراجيز والأشعار", icon: <Feather size={16} />, count: poems.filter(p => p.type === 'poetry').length },
    { id: "quote", label: "الخطب والأدعية", icon: <Quote size={16} />, count: poems.filter(p => p.type === 'quote').length },
    { id: "story", label: "قصص ومواقف", icon: <BookOpen size={16} />, count: poems.filter(p => p.type === 'story').length },
    { id: "favorites", label: "المفضلة", icon: <Star size={16} />, count: favorites.length },
  ];

  const filteredPoems = activeCategory 
    ? (activeCategory === "favorites" ? poems.filter((_, idx) => favorites.includes(idx)) : poems.filter(p => p.type === activeCategory))
    : [];

  return (
    <motion.div 
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-[#090b14] text-white flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-blue-900/30 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300">
            <ChevronRight size={24} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-blue-500"><ScrollText size={28} /></span>
            <h1 className="text-3xl font-amiri font-bold text-blue-400">ديوان الطف</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Search & Filter Bar (Compact) */}
        <div className="flex-shrink-0 p-4 border-b border-blue-900/20 bg-black/30 flex flex-col gap-4 z-10 shadow-md">
          {/* Horizontal Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar pb-1 max-w-2xl mx-auto w-full">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-full transition-all border text-sm font-sans font-bold ${
                  activeCategory === cat.id 
                    ? 'bg-blue-900/40 border-blue-500/50 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
                    : 'bg-black/40 border-blue-900/30 text-slate-400 hover:bg-white/5'
                }`}
              >
                {cat.icon}
                <span>{cat.label} ({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Masonry/Grid Layout */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent relative">
          <div className="absolute inset-0 bg-[#090b14]/90 pointer-events-none" />
          
          <div className="relative z-10 columns-1 md:columns-2 gap-4 max-w-7xl mx-auto space-y-4">
            {filteredPoems.map((poem, idx) => {
              const isExpanded = expandedId === idx;
              const shouldTruncate = poem.verse.length > 150;
              const displayText = (shouldTruncate && !isExpanded) ? poem.verse.substring(0, 150) + '...' : poem.verse;

              return (
                <div 
                  key={idx}
                  className="break-inside-avoid bg-slate-900/40 border border-blue-900/20 p-6 rounded-md relative overflow-hidden transition-all duration-300 hover:border-blue-500/30"
                  onClick={() => shouldTruncate && setExpandedId(isExpanded ? null : idx)}
                >
                  <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-600/50 to-transparent" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-amiri font-bold text-blue-300 flex items-center gap-2">
                      <PenTool size={16} className="text-slate-500" />
                      {poem.title}
                    </h4>
                    
                    <button 
                      onClick={(e) => {
                        const globalIdx = poems.findIndex(p => p.title === poem.title && p.verse === poem.verse);
                        if (globalIdx !== -1) toggleFavorite(e, globalIdx);
                      }}
                      className={`p-1.5 rounded-full transition-colors ${favorites.includes(poems.findIndex(p => p.title === poem.title && p.verse === poem.verse)) ? 'text-amber-400 bg-amber-400/10' : 'text-slate-600 hover:text-slate-400 hover:bg-slate-800'}`}
                    >
                      <Star size={18} fill={favorites.includes(poems.findIndex(p => p.title === poem.title && p.verse === poem.verse)) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  
                  <p className={`text-lg md:text-xl leading-loose font-amiri transition-all duration-300 ${
                    poem.type === 'poetry' ? 'whitespace-pre-line text-amber-500/90' : 'text-slate-300 text-justify'
                  }`}>
                    {displayText}
                  </p>

                  {shouldTruncate && (
                    <div className="mt-4 pt-4 flex justify-center items-center text-blue-500 border-t border-blue-900/20 cursor-pointer">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      <span className="mr-2 text-xs font-sans">
                        {isExpanded ? 'طي النص' : 'إظهار النص كاملاً'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredPoems.length === 0 && (
            <div className="text-center py-20 opacity-50 relative z-10">
              <BookOpen size={64} className="mx-auto mb-6 text-slate-700" />
              <p className="text-xl font-amiri text-slate-400">لا توجد نصوص في هذا القسم</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
