import { BookOpen, Map, Users, ScrollText, Book, Info, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { quotes } from "../data/quotes";

interface HomeViewProps {
  onNavigate: (view: string) => void;
  lastReadChapter: number;
}

export default function HomeView({ onNavigate, lastReadChapter }: HomeViewProps) {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col overflow-y-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-amber-900/20 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-12 flex flex-col items-center flex-1 min-h-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 pt-8"
        >
          <h1 className="text-6xl md:text-7xl font-amiri font-bold text-amber-500 mb-4 tracking-tight drop-shadow-lg">أثَر</h1>
          <h2 className="text-2xl md:text-3xl font-amiri text-slate-300 tracking-widest">مَلْحَمَةُ كَرْبَلَاء</h2>
          <div className="w-24 h-px bg-amber-500/50 mx-auto mt-6" />
        </motion.div>

        {/* Daily Quote Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full bg-slate-900/40 border border-amber-900/20 rounded-2xl p-6 md:p-8 mb-10 text-center shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[160px]"
        >
          <div className="absolute -top-4 -right-4 text-amber-900/10 text-9xl font-serif leading-none">"</div>
          <p className="font-amiri text-xl md:text-2xl text-amber-100 leading-relaxed mb-6 relative z-10 text-justify px-2">
            {quote.text}
          </p>
          <p className="font-amiri text-base text-amber-500/80 font-bold tracking-wide">
            — {quote.author}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full flex flex-col gap-3 pb-12"
        >
          <button 
            onClick={() => onNavigate('search')}
            className="group relative overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-500 text-slate-300 hover:text-white p-4 rounded-xl flex items-center gap-4 transition-all"
          >
            <span className="text-slate-400 group-hover:text-slate-300"><Search size={20} /></span>
            <span className="font-amiri text-lg">البحث الشامل</span>
          </button>

          <button 
            onClick={() => onNavigate('story')}
            className="group relative overflow-hidden bg-slate-900/80 border border-amber-900/30 hover:border-amber-500/50 text-white p-4 rounded-xl flex items-center justify-between transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/0 via-amber-900/10 to-amber-900/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex items-center gap-4">
              <span className="text-amber-500"><BookOpen size={20} /></span>
              <span className="font-amiri text-xl">{lastReadChapter > 0 ? 'متابعة القراءة' : 'ابدأ القراءة'}</span>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('journey_map')}
            className="group relative overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white p-4 rounded-xl flex items-center gap-4 transition-all"
          >
            <span className="text-amber-700/80 group-hover:text-amber-500"><Map size={20} /></span>
            <span className="font-amiri text-lg">خريطة الرحلة</span>
          </button>

          <button 
            onClick={() => onNavigate('timeline')}
            className="group relative overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white p-4 rounded-xl flex items-center gap-4 transition-all"
          >
            <span className="text-slate-500 group-hover:text-slate-400"><Map size={20} /></span>
            <span className="font-amiri text-lg">فهرس الفصول (المسير)</span>
          </button>

          <button 
            onClick={() => onNavigate('martyrs')}
            className="group relative overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-red-900/50 text-slate-300 hover:text-white p-4 rounded-xl flex items-center gap-4 transition-all"
          >
            <span className="text-red-900/80 group-hover:text-red-500"><Users size={20} /></span>
            <span className="font-amiri text-lg">معجم الشهداء</span>
          </button>

          <button 
            onClick={() => onNavigate('diwan')}
            className="group relative overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-blue-900/50 text-slate-300 hover:text-white p-4 rounded-xl flex items-center gap-4 transition-all"
          >
            <span className="text-blue-900/80 group-hover:text-blue-500"><ScrollText size={20} /></span>
            <span className="font-amiri text-lg">ديوان الطف</span>
          </button>

          <button 
            onClick={() => onNavigate('ziyarat')}
            className="group relative overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-emerald-900/50 text-slate-300 hover:text-white p-4 rounded-xl flex items-center gap-4 transition-all"
          >
            <span className="text-emerald-900/80 group-hover:text-emerald-500"><Book size={20} /></span>
            <span className="font-amiri text-lg">الزيارات</span>
          </button>

          <button 
            onClick={() => onNavigate('settings')}
            className="group relative overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white p-4 rounded-xl flex items-center gap-4 transition-all"
          >
            <span className="text-slate-500 group-hover:text-slate-400"><Info size={20} /></span>
            <span className="font-amiri text-lg">الإعدادات وحول التطبيق</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
