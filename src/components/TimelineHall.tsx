import { useState, useRef, useEffect } from "react";
import { ChevronRight, Compass, MapPin, ChevronDown, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TimelineHallProps {
  onBack: () => void;
  onSelectChapter: (index: number, highlight?: string) => void;
}

const stations = [
  { id: "medina", name: "المدينة المنورة", date: "28 رجب 60 هـ", event: "الخروج من المدينة المنورة متوجهاً إلى مكة المكرمة.", quote: "شاء الله أن يراني قتيلاً، وشاء أن يراهن سبايا.", chapterIdx: 0, searchKey: "المدينة والرحيل" },
  { id: "mecca", name: "مكة المكرمة", date: "3 شعبان - 8 ذي الحجة 60 هـ", event: "البقاء في مكة، ثم الخروج منها يوم التروية.", quote: "خُطّ الموت على ولد آدم مخطّ القلادة على جيد الفتاة.", chapterIdx: 1, searchKey: "في رحاب مكة" },
  { id: "taneem", name: "التنعيم", date: "ذو الحجة 60 هـ", event: "مصادرة القافلة التي أرسلها بحير بن ريسان إلى يزيد.", quote: "من لحق بي استشهد، ومن لم يلحق لم يدرك الفتح.", chapterIdx: 3, searchKey: "مكة" },
  { id: "zarud", name: "زرود", date: "محرم 61 هـ", event: "التقاء الإمام الحسين بزهير بن القين وانضمامه للركب.", quote: "والله ما زلت أضربهم بسيفي حامياً عن حرم رسول الله.", chapterIdx: 3, searchKey: "زُرود" },
  { id: "thaalabiya", name: "الثعلبية", date: "محرم 61 هـ", event: "وصول خبر استشهاد مسلم بن عقيل وهانئ بن عروة.", quote: "رحم الله مسلماً، فلقد صار إلى روح الله وريحانه.", chapterIdx: 3, searchKey: "زُبالة" },
  { id: "zubala", name: "زبالة", date: "محرم 61 هـ", event: "إخبار الركب بشهادة عبد الله بن يقطر ومسلم، وتفرق الناس.", quote: "قد خذلتنا شيعتنا، فمن أحب منكم الانصراف فلينصرف.", chapterIdx: 3, searchKey: "زُبالة" },
  { id: "sharaf", name: "شراف", date: "محرم 61 هـ", event: "الاستقاء من الماء استعداداً لملاقاة جيش الحر بن يزيد الرياحي.", quote: "اسقوا القوم ورشفوا الخيل ترشيفاً.", chapterIdx: 3, searchKey: "الحر بن يزيد" },
  { id: "dhu-husam", name: "ذو حُسُم", date: "محرم 61 هـ", event: "الالتقاء بجيش الحر بن يزيد الرياحي وصلاة الظهر معاً.", quote: "أيها الناس، إنها معذرة إلى الله وإليكم.", chapterIdx: 3, searchKey: "الحر بن يزيد" },
  { id: "karbala", name: "كربلاء", date: "2 محرم 61 هـ", event: "الوصول إلى أرض كربلاء والنزول بها.", quote: "هاهنا محط رحالنا ومسفك دمائنا ومقتل رجالنا.", chapterIdx: 3, searchKey: "مناخ ركابنا" }
];

export default function TimelineHall({ onBack, onSelectChapter }: TimelineHallProps) {
  const [activeStationId, setActiveStationId] = useState<string>(stations[stations.length - 1].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToStation = (id: string) => {
    setActiveStationId(id);
    const element = stationRefs.current[id];
    if (element && containerRef.current) {
      const topPos = element.offsetTop - 120; // offset for the sticky header/minimap
      containerRef.current.scrollTo({
        top: topPos > 0 ? topPos : 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-[#14120b] text-slate-200 flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 p-4 md:p-6 border-b border-amber-900/20 flex items-center justify-between bg-black/40 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300">
            <ChevronRight size={24} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-amber-700"><Compass size={24} className="md:w-7 md:h-7" /></span>
            <h1 className="text-2xl md:text-3xl font-amiri font-bold text-amber-500">مسير القافلة</h1>
          </div>
        </div>
      </div>

      {/* Horizontal Mini-Map (Fixed below header) */}
      <div className="flex-shrink-0 bg-black/60 border-b border-amber-900/30 backdrop-blur-md z-10 overflow-x-auto overflow-y-hidden hide-scrollbar py-3 px-4">
        <div className="flex items-center gap-4 min-w-max mx-auto">
          {stations.map((station, idx) => (
            <div key={`mini-${station.id}`} className="flex items-center">
              <button
                onClick={() => scrollToStation(station.id)}
                className={`flex flex-col items-center gap-1 transition-all ${activeStationId === station.id ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-100'}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${activeStationId === station.id ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]' : 'bg-amber-900/60'}`} />
                <span className={`text-[10px] font-bold ${activeStationId === station.id ? 'text-amber-300' : 'text-slate-500'}`}>{station.name}</span>
              </button>
              {idx < stations.length - 1 && (
                <div className="w-8 h-px bg-amber-900/30 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={containerRef} className="flex-1 overflow-y-auto relative p-4 md:p-8 scroll-smooth">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-10 pointer-events-none fixed" />

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Vertical Line */}
          <div className="absolute top-8 bottom-8 right-5 md:right-8 w-px bg-gradient-to-b from-amber-900/0 via-amber-700/40 to-amber-900/0" />

          <div className="flex flex-col gap-6 md:gap-8 pb-20">
            {stations.map((station) => {
              const isExpanded = activeStationId === station.id;
              
              return (
                <div 
                  key={station.id} 
                  ref={el => { stationRefs.current[station.id] = el; }}
                  className="relative pr-12 md:pr-16"
                >
                  {/* Timeline Dot */}
                  <div 
                    className={`absolute right-3.5 md:right-6 top-5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 transform translate-x-1/2 ${
                      isExpanded ? 'bg-amber-400 border-[#14120b] shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-125' : 'bg-[#14120b] border-amber-900/50'
                    }`} 
                  />

                  {/* Accordion Card */}
                  <div 
                    className={`bg-black/40 border transition-all duration-500 rounded-xl overflow-hidden ${
                      isExpanded ? 'border-amber-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.5)]' : 'border-amber-900/20 hover:border-amber-900/50 cursor-pointer'
                    }`}
                  >
                    {/* Card Header (Always visible) */}
                    <div 
                      onClick={() => !isExpanded && scrollToStation(station.id)}
                      className={`p-4 md:p-5 flex items-center justify-between ${isExpanded ? 'bg-gradient-to-l from-amber-950/30 to-transparent' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${isExpanded ? 'bg-amber-900/40 text-amber-400' : 'bg-slate-900/50 text-slate-500'}`}>
                          <MapPin size={18} />
                        </div>
                        <div>
                          <h3 className={`text-xl md:text-2xl font-amiri font-bold ${isExpanded ? 'text-amber-400' : 'text-slate-300'}`}>
                            {station.name}
                          </h3>
                          <span className="text-xs md:text-sm font-sans text-slate-500 mt-1 block tracking-wide">{station.date}</span>
                        </div>
                      </div>
                      
                      <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-amber-500' : 'text-slate-600'}`}>
                        <ChevronDown size={20} />
                      </div>
                    </div>

                    {/* Card Body (Expanded) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 md:p-6 pt-0 space-y-6">
                            
                            <div className="border-t border-amber-900/20 pt-5">
                              <p className="text-lg md:text-xl font-amiri leading-relaxed text-slate-200">
                                {station.event}
                              </p>
                            </div>

                            <div className="relative p-5 rounded-lg border border-amber-900/20 bg-amber-950/10">
                              <div className="absolute top-0 right-4 -translate-y-1/2 bg-[#14120b] px-2 text-xs font-bold text-amber-600">
                                مقولة خالدة
                              </div>
                              <p className="text-xl md:text-2xl font-amiri leading-loose text-amber-200/80 italic text-center">
                                "{station.quote}"
                              </p>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectChapter(station.chapterIdx, station.searchKey);
                              }}
                              className="w-full py-3 rounded-lg flex items-center justify-center gap-2 bg-amber-900/20 hover:bg-amber-900/40 border border-amber-500/30 text-amber-400 font-bold transition-all text-sm md:text-base"
                            >
                              <BookOpen size={18} />
                              قراءة الحدث في الرواية
                            </button>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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

