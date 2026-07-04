import { useState } from "react";
import { Search, ChevronRight, ChevronDown, ChevronUp, Swords, Users, Shield, ShieldQuestion } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { martyrs } from "../data/martyrs";

interface MartyrsHallProps {
  onBack: () => void;
}

export default function MartyrsHall({ onBack }: MartyrsHallProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "الجميع", icon: <Users size={16} /> },
    { id: "أهل البيت (عليهم السلام)", label: "أهل البيت", icon: <Shield size={16} /> },
    { id: "الأصحاب الأنصار", label: "الأصحاب", icon: <Swords size={16} /> },
  ];

  const filteredMartyrs = martyrs.filter(martyr => {
    const matchesSearch = martyr.name.includes(searchQuery) || martyr.title.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || martyr.category === selectedCategory;
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

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar / Filters */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-l border-red-900/20 p-6 bg-black/20 flex flex-col gap-8 overflow-y-auto">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن اسم أو لقب..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-red-900/30 rounded-lg py-3 pr-10 pl-4 text-slate-200 focus:outline-none focus:border-red-500/50 font-amiri placeholder:font-sans"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-slate-500 text-sm font-bold mb-2 tracking-widest">التصنيف</h3>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  selectedCategory === cat.id 
                    ? 'bg-red-900/40 border border-red-500/30 text-red-300' 
                    : 'bg-black/20 border border-transparent text-slate-400 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 font-amiri text-lg">
                  {cat.icon}
                  <span>{cat.label}</span>
                </div>
                {selectedCategory === cat.id && (
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Antique Cards */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent relative">
          <div className="absolute inset-0 bg-[#140b0b]/90 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredMartyrs.map(martyr => {
              const isExpanded = expandedId === martyr.id;
              return (
                <div 
                  key={martyr.id}
                  className={`relative overflow-hidden rounded-sm transition-all duration-500 cursor-pointer ${
                    isExpanded ? 'col-span-1 lg:col-span-2 xl:col-span-3 row-span-2' : ''
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : martyr.id)}
                >
                  {/* Antique Paper Background */}
                  <div className="absolute inset-0 bg-[#d4c5b0] dark:bg-[#2a241e] opacity-10 mix-blend-overlay" />
                  <div className={`absolute inset-0 border-2 transition-colors duration-500 ${isExpanded ? 'border-red-900/60' : 'border-red-900/20'}`} />
                  
                  <div className={`relative p-6 h-full flex flex-col bg-gradient-to-br ${
                    isExpanded ? 'from-[#1f1614] to-[#120a09]' : 'from-[#1a1311] to-[#110908]'
                  }`}>
                    <div className="flex justify-between items-start mb-4 border-b border-red-900/20 pb-4">
                      <div>
                        <h2 className="text-2xl font-amiri font-bold text-red-400 mb-1">{martyr.name}</h2>
                        <span className="text-sm font-amiri text-amber-600/80">{martyr.title}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 px-2 py-1 border border-slate-700 rounded-sm">
                        {martyr.category === "أهل البيت (عليهم السلام)" ? "أهل البيت" : "الأنصار"}
                      </span>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex-1 mt-4 space-y-6"
                        >
                          <p className="text-lg font-amiri leading-loose text-slate-300 text-justify">
                            {martyr.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-red-900/20">
                            <div className="bg-black/30 p-4 rounded-sm border border-red-900/10">
                              <span className="block text-xs font-bold text-red-500/60 mb-2">طريقة الاستشهاد</span>
                              <p className="font-amiri text-slate-300 leading-relaxed">{martyr.deathMethod}</p>
                            </div>
                            <div className="space-y-4">
                              <div className="bg-black/30 p-4 rounded-sm border border-red-900/10">
                                <span className="block text-xs font-bold text-red-500/60 mb-1">القاتل</span>
                                <p className="font-amiri text-slate-300">{martyr.killer}</p>
                              </div>
                              <div className="bg-black/30 p-4 rounded-sm border border-red-900/10">
                                <span className="block text-xs font-bold text-red-500/60 mb-1">الوقت والمكان</span>
                                <p className="font-amiri text-slate-300">{martyr.timing} - {martyr.location}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="mt-auto pt-4 flex justify-between items-center text-slate-500 group-hover:text-red-400">
                        <span className="text-sm font-amiri">عرض السيرة</span>
                        <ChevronDown size={16} />
                      </div>
                    )}
                    {isExpanded && (
                      <div className="mt-6 pt-4 flex justify-center items-center text-red-500 border-t border-red-900/20">
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
