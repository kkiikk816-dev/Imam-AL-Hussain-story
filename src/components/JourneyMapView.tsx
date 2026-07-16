import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JourneyMapViewProps {
  onBack: () => void;
  onNavigateToChapter: (chapterIdx: number, highlight?: string) => void;
}

const locations = [
  { id: 1, name: 'المدينة المنورة', desc: 'الخروج من المدينة المنورة', details: 'نقطة الانطلاق الأولى. خرج منها الإمام ليلاً نحو مكة في ٢٨ رجب.', x: 15, y: 35, chapterIdx: 0, searchKey: 'المدينة والرحيل' },
  { id: 2, name: 'مكة المكرمة', desc: 'الوصول إلى مكة', details: 'أقام فيها الإمام أشهراً، ثم خرج منها في يوم التروية (8 ذي الحجة) ليتجه نحو العراق.', x: 15, y: 70, chapterIdx: 1, searchKey: 'في رحاب مكة' },
  { id: 3, name: 'التنعيم', desc: 'مصادرة قافلة ليزيد', details: 'محطة قرب مكة. صادر الإمام هنا قافلة أرسلها والي اليمن إلى يزيد بن معاوية.', x: 22, y: 65, chapterIdx: 3, searchKey: 'مكة' },
  { id: 4, name: 'ذات عرق', desc: 'لقاء بشر بن غالب', details: 'ملتقى طرق الحجاج. التقى الإمام هنا ببشر بن غالب وسأله عن أحوال الكوفة.', x: 30, y: 58, chapterIdx: 3, searchKey: 'الفرزدق' },
  { id: 5, name: 'زُرود', desc: 'التقاء الإمام بزهير بن القين', details: 'منطقة رملية. انضم فيها زهير بن القين إلى الركب الحسيني بعد حوار عميق.', x: 40, y: 48, chapterIdx: 3, searchKey: 'زُرود' },
  { id: 6, name: 'زُبالة', desc: 'وصول خبر استشهاد مسلم', details: 'هنا وصل خبر استشهاد سفيره مسلم بن عقيل فخطب الإمام في أصحابه وأذن لمن أراد الانصراف.', x: 48, y: 40, chapterIdx: 3, searchKey: 'زُبالة' },
  { id: 7, name: 'شراف', desc: 'لقاء جيش الحر', details: 'أمر الإمام بالاستقاء وحمل الماء الوفير، وهناك واجه جيش الحر بن يزيد الرياحي العطاشى فسقاهم.', x: 55, y: 32, chapterIdx: 3, searchKey: 'الحر بن يزيد' },
  { id: 8, name: 'ذو حُسُم', desc: 'صلاة الظهر جماعة', details: 'صلى الإمام بالجيشين معاً الظهر والعصر، وألقى خطبة بين فيها أسباب مسيره.', x: 62, y: 25, chapterIdx: 3, searchKey: 'شراف' },
  { id: 9, name: 'البيضة', desc: 'خطبة الإمام الشهيرة', details: 'موضع ألقى فيه الإمام الحسين (ع) خطبته الشهيرة موضحاً شرعية ثورته وموقفه المبدئي ضد الظلم.', x: 68, y: 20, chapterIdx: 3, searchKey: 'نينوى' },
  { id: 10, name: 'عذيب الهجانات', desc: 'انضمام نافع بن هلال', details: 'هنا وصل نفر قليل من الكوفة والتحقوا بالحسين، منهم نافع بن هلال البجلي.', x: 74, y: 15, chapterIdx: 3, searchKey: 'عذيب الهجانات' },
  { id: 11, name: 'قصر بني مقاتل', desc: 'لقاء عبيد الله بن الحر الجعفي', details: 'نزل الإمام هنا ودعا عبيد الله بن الحر الجعفي لنصرته، فاعتذر الأخير.', x: 80, y: 12, chapterIdx: 3, searchKey: 'قصر بني مقاتل' },
  { id: 12, name: 'كربلاء', desc: 'الوصول إلى أرض الطف', details: 'أرض الكرب والبلاء. وصلها الإمام في الثاني من المحرم، وهناك حطت الرحال وأُريقت الدماء.', x: 88, y: 10, chapterIdx: 3, searchKey: 'مناخ ركابنا' },
];

export default function JourneyMapView({ onBack, onNavigateToChapter }: JourneyMapViewProps) {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  // A smooth path connecting the points
  const pathD = "M 15 35 Q 12 55 15 70 Q 18 68 22 65 Q 26 60 30 58 Q 35 52 40 48 Q 44 44 48 40 Q 52 35 55 32 Q 58 28 62 25 Q 65 22 68 20 Q 71 18 74 15 Q 77 13 80 12 Q 84 10 88 10";

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col font-sans" dir="rtl">
      <header className="flex-shrink-0 border-b border-amber-900/30 bg-black/50 p-4 pt-6 relative z-10 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300">
            <ArrowRight size={24} />
          </button>
          <h1 className="font-amiri font-bold text-2xl text-amber-500">خريطة المسير</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden bg-[#13110e]">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at center, #d97706 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full max-w-4xl aspect-[4/5] md:aspect-[2/1] border border-amber-900/20 rounded-3xl bg-slate-900/20 shadow-2xl overflow-hidden">
            
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Border line between KSA and Iraq */}
              <path 
                d="M 50 0 L 70 100" 
                stroke="#475569" 
                strokeWidth="0.5" 
                strokeDasharray="2 2"
                className="opacity-40"
              />
              <text x="52" y="10" fill="#64748b" fontSize="3" className="font-amiri opacity-50" transform="rotate(25, 52, 10)">جمهورية العراق</text>
              <text x="40" y="90" fill="#64748b" fontSize="3" className="font-amiri opacity-50" transform="rotate(25, 40, 90)">المملكة العربية السعودية</text>

              {/* Journey Path */}
              <path 
                d={pathD} 
                fill="none" 
                stroke="#78350f" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
                className="opacity-60"
              />
            </svg>

            {/* Nodes */}
            {locations.map((loc, i) => (
              <div 
                key={loc.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                onClick={() => setActiveLocation(loc.id)}
              >
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center z-10 relative transition-colors ${activeLocation === loc.id ? 'bg-amber-500' : 'bg-slate-800 border-2 border-amber-700 group-hover:bg-amber-900'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${activeLocation === loc.id ? 'bg-black' : 'bg-amber-500'}`} />
                  </motion.div>
                  {/* Pulse effect for last location */}
                  {loc.id === 10 && (
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20" />
                  )}
                </div>
                
                <span className={`mt-2 font-amiri font-bold text-sm whitespace-nowrap transition-colors ${activeLocation === loc.id ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'} drop-shadow-md`}>
                  {loc.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Card Overlay */}
        <AnimatePresence>
          {activeLocation !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4"
            >
              <div className="bg-slate-900/90 backdrop-blur-xl border border-amber-900/50 rounded-2xl p-6 shadow-2xl relative">
                <button 
                  onClick={() => setActiveLocation(null)}
                  className="absolute top-4 left-4 text-slate-500 hover:text-white"
                >
                  ✕
                </button>
                <div className="flex items-center gap-3 mb-3 text-amber-500">
                  <MapPin size={20} />
                  <h3 className="font-amiri font-bold text-2xl">
                    {locations.find(l => l.id === activeLocation)?.name}
                  </h3>
                </div>
                <div className="font-amiri text-slate-400 mb-2 font-bold">{locations.find(l => l.id === activeLocation)?.desc}</div>
                <p className="font-amiri text-slate-300 leading-relaxed mb-6">
                  {locations.find(l => l.id === activeLocation)?.details}
                </p>
                <button 
                  onClick={() => {
                    const loc = locations.find(l => l.id === activeLocation);
                    if (loc) onNavigateToChapter(loc.chapterIdx, loc.searchKey);
                  }}
                  className="w-full bg-amber-900/40 hover:bg-amber-800/60 border border-amber-800 text-amber-100 py-3 rounded-xl font-amiri font-bold transition-colors"
                >
                  قراءة الحدث في السيرة
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
