import { useState } from "react";
import { ChevronRight, Compass, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TimelineHallProps {
  onBack: () => void;
  onSelectChapter: (index: number) => void;
}

const stations = [
  { id: "medina", name: "المدينة المنورة", date: "28 رجب 60 هـ", event: "الخروج من المدينة المنورة متوجهاً إلى مكة المكرمة.", quote: "شاء الله أن يراني قتيلاً، وشاء أن يراهن سبايا.", chapterIdx: 0 },
  { id: "mecca", name: "مكة المكرمة", date: "3 شعبان - 8 ذي الحجة 60 هـ", event: "البقاء في مكة، ثم الخروج منها يوم التروية.", quote: "خُطّ الموت على ولد آدم مخطّ القلادة على جيد الفتاة.", chapterIdx: 1 },
  { id: "taneem", name: "التنعيم", date: "ذو الحجة 60 هـ", event: "مصادرة القافلة التي أرسلها بحير بن ريسان إلى يزيد.", quote: "من لحق بي استشهد، ومن لم يلحق لم يدرك الفتح.", chapterIdx: 2 },
  { id: "zarud", name: "زرود", date: "محرم 61 هـ", event: "التقاء الإمام الحسين بزهير بن القين وانضمامه للركب.", quote: "والله ما زلت أضربهم بسيفي حامياً عن حرم رسول الله.", chapterIdx: 3 },
  { id: "thaalabiya", name: "الثعلبية", date: "محرم 61 هـ", event: "وصول خبر استشهاد مسلم بن عقيل وهانئ بن عروة.", quote: "رحم الله مسلماً، فلقد صار إلى روح الله وريحانه.", chapterIdx: 4 },
  { id: "zubala", name: "زبالة", date: "محرم 61 هـ", event: "إخبار الركب بشهادة عبد الله بن يقطر ومسلم، وتفرق الناس.", quote: "قد خذلتنا شيعتنا، فمن أحب منكم الانصراف فلينصرف.", chapterIdx: 4 },
  { id: "sharaf", name: "شراف", date: "محرم 61 هـ", event: "الاستقاء من الماء استعداداً لملاقاة جيش الحر بن يزيد الرياحي.", quote: "اسقوا القوم ورشفوا الخيل ترشيفاً.", chapterIdx: 5 },
  { id: "dhu-husam", name: "ذو حُسُم", date: "محرم 61 هـ", event: "الالتقاء بجيش الحر بن يزيد الرياحي وصلاة الظهر معاً.", quote: "أيها الناس، إنها معذرة إلى الله وإليكم.", chapterIdx: 5 },
  { id: "karbala", name: "كربلاء", date: "2 محرم 61 هـ", event: "الوصول إلى أرض كربلاء والنزول بها.", quote: "هاهنا محط رحالنا ومسفك دمائنا ومقتل رجالنا.", chapterIdx: 6 }
];

export default function TimelineHall({ onBack, onSelectChapter }: TimelineHallProps) {
  const [activeStation, setActiveStation] = useState(stations[stations.length - 1]);

  return (
    <motion.div 
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-[#14120b] text-slate-200 flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-amber-900/20 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300">
            <ChevronRight size={24} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-amber-700"><Compass size={28} /></span>
            <h1 className="text-3xl font-amiri font-bold text-amber-500">مسير القافلة</h1>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-10 pointer-events-none" />

        {/* Map / Path Area */}
        <div className="w-full lg:w-1/2 p-8 overflow-y-auto border-b lg:border-b-0 lg:border-l border-amber-900/20 flex flex-col items-center relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-amber-900/30 -translate-x-1/2 hidden md:block" />
          
          <div className="flex flex-col gap-6 relative z-10 w-full max-w-md">
            {stations.map((station, idx) => (
              <button
                key={station.id}
                onClick={() => setActiveStation(station)}
                className={`relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center text-center ${
                  activeStation.id === station.id 
                    ? 'bg-amber-900/40 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)] scale-105' 
                    : 'bg-black/40 border-amber-900/20 hover:border-amber-700/50 opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`absolute top-1/2 -right-3 w-6 h-6 rounded-full border-4 border-[#14120b] hidden md:block ${
                  activeStation.id === station.id ? 'bg-amber-500' : 'bg-amber-900/50'
                }`} style={{ transform: 'translateY(-50%)' }} />
                
                <h3 className={`text-2xl font-amiri font-bold ${activeStation.id === station.id ? 'text-amber-400' : 'text-slate-300'}`}>
                  {station.name}
                </h3>
                <p className="text-xs font-sans text-slate-500 mt-1">{station.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Details Area */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-l from-transparent to-black/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-lg space-y-8"
            >
              <div className="flex items-center gap-4 text-amber-500/50 mb-4">
                <MapPin size={48} />
                <h2 className="text-5xl font-amiri font-bold text-amber-400">{activeStation.name}</h2>
              </div>
              
              <div className="bg-black/30 p-6 rounded-lg border border-amber-900/20">
                <span className="block text-sm font-bold text-amber-600 mb-2">الحدث الأبرز</span>
                <p className="text-xl font-amiri leading-loose text-slate-200">
                  {activeStation.event}
                </p>
              </div>

              <div className="bg-black/30 p-6 rounded-lg border border-amber-900/20">
                <span className="block text-sm font-bold text-amber-600 mb-2">اقتباس</span>
                <p className="text-2xl font-amiri leading-loose text-amber-200/80 italic">
                  "{activeStation.quote}"
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectChapter(activeStation.chapterIdx);
                  onBack(); // close timeline and go to story
                }}
                className="w-full py-4 rounded-xl bg-amber-900/20 hover:bg-amber-900/40 border border-amber-500/30 text-amber-400 font-bold transition-all"
              >
                قراءة التفاصيل في الرواية
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
