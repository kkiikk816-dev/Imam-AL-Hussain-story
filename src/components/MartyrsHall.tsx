import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronDown, ChevronUp, Swords, Users, Shield, ShieldQuestion, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { martyrs } from "../data/martyrs";

interface MartyrsHallProps {
  onBack: () => void;
}

export default function MartyrsHall({ onBack }: MartyrsHallProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('karbala_martyr_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('karbala_martyr_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: "all", label: "الجميع", icon: <Users size={16} /> },
    { id: "أهل البيت (عليهم السلام)", label: "أهل البيت", icon: <Shield size={16} /> },
    { id: "الأصحاب الأنصار", label: "الأصحاب", icon: <Swords size={16} /> },
    { id: "favorites", label: "المفضلة", icon: <Star size={16} /> },
  ];

  const filteredMartyrs = martyrs.filter(martyr => {
    const matchesSearch = martyr.name.includes(searchQuery) || martyr.title.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || 
                           (selectedCategory === "favorites" ? favorites.includes(martyr.id) : martyr.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-[#140b0b] text-white flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-red-900/30 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300">
            <ChevronRight size={24} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-red-800"><Swords size={28} /></span>
            <h1 className="text-3xl font-amiri font-bold text-red-500">معجم الشهداء</h1>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Search & Filter Bar (Compact) */}
        <div className="flex-shrink-0 p-4 border-b border-red-900/20 bg-black/30 flex flex-col gap-4 z-10 shadow-md">
          <div className="relative max-w-2xl mx-auto w-full">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="ابحث عن اسم أو لقب..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-red-900/30 rounded-full py-2 pr-10 pl-4 text-sm text-slate-200 focus:outline-none focus:border-red-500/50 font-amiri placeholder:font-sans transition-colors"
            />
          </div>

          {/* Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 max-w-2xl mx-auto w-full">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-full transition-all border text-sm font-sans font-bold ${
                  selectedCategory === cat.id 
                    ? 'bg-red-900/40 border-red-500/50 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.2)]' 
                    : 'bg-black/40 border-red-900/30 text-slate-400 hover:bg-white/5'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Antique Cards */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent relative">
          <div className="absolute inset-0 bg-[#140b0b]/90 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto">
            {filteredMartyrs.map(martyr => {
              const isExpanded = expandedId === martyr.id;
              return (
                <div 
                  key={martyr.id}
                  className={`relative overflow-hidden rounded-md transition-all duration-500 cursor-pointer ${
                    isExpanded ? 'col-span-2 lg:col-span-3 xl:col-span-4 row-span-2' : 'col-span-1'
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : martyr.id)}
                >
                  {/* Antique Paper Background */}
                  <div className="absolute inset-0 bg-[#d4c5b0] dark:bg-[#2a241e] opacity-[0.03] mix-blend-overlay pointer-events-none" />
                  <div className={`absolute inset-0 border transition-colors duration-500 ${isExpanded ? 'border-red-900/60' : 'border-red-900/20'}`} />
                  
                  <div className={`relative p-3 md:p-6 h-full flex flex-col bg-gradient-to-br ${
                    isExpanded ? 'from-[#1f1614] to-[#120a09]' : 'from-[#1a1311] to-[#110908]'
                  }`}>
                    
                    <div className={`flex justify-between items-start ${isExpanded ? 'mb-4 border-b border-red-900/20 pb-4' : 'mb-2'}`}>
                      <div>
                        <h2 className={`${isExpanded ? 'text-xl md:text-2xl' : 'text-sm md:text-xl'} font-amiri font-bold text-red-400 mb-0.5`}>{martyr.name}</h2>
                        {isExpanded && <span className="text-sm font-amiri text-amber-600/80">{martyr.title}</span>}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button 
                          onClick={(e) => toggleFavorite(e, martyr.id)}
                          className={`p-1.5 rounded-full transition-colors ${favorites.includes(martyr.id) ? 'text-amber-400 bg-amber-400/10' : 'text-slate-600 hover:text-slate-400 hover:bg-slate-800'}`}
                        >
                          <Star size={isExpanded ? 20 : 14} fill={favorites.includes(martyr.id) ? "currentColor" : "none"} />
                        </button>
                        {isExpanded && (
                          <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-slate-500 px-1.5 py-0.5 border border-slate-700/50 rounded-sm">
                            {martyr.category === "أهل البيت (عليهم السلام)" ? "أهل البيت" : "الأنصار"}
                          </span>
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex-1 mt-2 md:mt-4 space-y-4 md:space-y-6"
                        >
                          <p className="text-sm md:text-lg font-amiri leading-loose text-slate-300 text-justify">
                            {martyr.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-red-900/20">
                            <div className="bg-black/30 p-3 md:p-4 rounded-sm border border-red-900/10">
                              <span className="block text-[10px] md:text-xs font-bold text-red-500/60 mb-1.5 md:mb-2">طريقة الاستشهاد</span>
                              <p className="text-sm md:text-base font-amiri text-slate-300 leading-relaxed">{martyr.deathMethod}</p>
                            </div>
                            <div className="space-y-3 md:space-y-4">
                              <div className="bg-black/30 p-3 md:p-4 rounded-sm border border-red-900/10">
                                <span className="block text-[10px] md:text-xs font-bold text-red-500/60 mb-1">القاتل</span>
                                <p className="text-sm md:text-base font-amiri text-slate-300">{martyr.killer}</p>
                              </div>
                              <div className="bg-black/30 p-3 md:p-4 rounded-sm border border-red-900/10">
                                <span className="block text-[10px] md:text-xs font-bold text-red-500/60 mb-1">الوقت والمكان</span>
                                <p className="text-sm md:text-base font-amiri text-slate-300">{martyr.timing} - {martyr.location}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="mt-auto pt-2 flex justify-end items-center text-slate-600 group-hover:text-red-400">
                        <ChevronDown size={14} />
                      </div>
                    )}

                    {isExpanded && (
                      <div className="mt-4 md:mt-6 pt-3 md:pt-4 flex justify-center items-center text-red-500 border-t border-red-900/20">
                        <ChevronUp size={20} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
// Note: using ChevronRight for back since Arabic is RTL
