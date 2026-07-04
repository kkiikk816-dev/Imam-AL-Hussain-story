import { useState } from "react";
import { ChevronRight, Book, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ZiyaratHallProps {
  onBack: () => void;
}

export default function ZiyaratHall({ onBack }: ZiyaratHallProps) {
  const [readingMode, setReadingMode] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#060806] text-slate-200 flex flex-col"
    >
      {/* Header - Hides in reading mode */}
      <motion.div 
        animate={{ y: readingMode ? -100 : 0, opacity: readingMode ? 0 : 1 }}
        className="flex-shrink-0 p-6 border-b border-emerald-900/20 flex items-center justify-between bg-black/40 backdrop-blur-md relative z-20"
      >
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300">
            <ChevronRight size={24} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-emerald-700"><Book size={28} /></span>
            <h1 className="text-3xl font-amiri font-bold text-emerald-500">الزيارات</h1>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative p-6 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-10 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-amiri font-bold text-emerald-400 drop-shadow-md mb-8 leading-relaxed">
              السَّلَامُ عَلَيْكَ يَا أَبَا عَبْدِ اللَّهِ
            </h2>
            
            <button 
              onClick={() => setReadingMode(!readingMode)}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-emerald-900/50 text-emerald-500 hover:bg-emerald-900/20 transition-all font-sans text-sm tracking-wide"
            >
              {readingMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              {readingMode ? "إنهاء وضع القراءة" : "وضع القراءة"}
            </button>
          </div>

          <div className={`font-amiri text-center transition-all duration-700 ${readingMode ? 'text-4xl leading-[2.5] text-slate-100' : 'text-3xl leading-[2.2] text-slate-300'}`}>
            <p className="mb-10">
              السَّلَامُ عَلَيْكَ يَا ابْنَ رَسُولِ اللَّهِ، السَّلَامُ عَلَيْكَ يَا ابْنَ أَمِيرِ الْمُؤْمِنِينَ وَابْنَ سَيِّدِ الْوَصِيِّينَ، السَّلَامُ عَلَيْكَ يَا ابْنَ فَاطِمَةَ سَيِّدَةِ نِسَاءِ الْعَالَمِينَ.
            </p>
            <p className="mb-10">
              السَّلَامُ عَلَيْكَ يَا ثَارَ اللَّهِ وَابْنَ ثَارِهِ وَالْوِتْرَ الْمَوْتُورَ، السَّلَامُ عَلَيْكَ وَعَلَى الْأَرْوَاحِ الَّتِي حَلَّتْ بِفِنَائِكَ، عَلَيْكُمْ مِنِّي جَمِيعاً سَلَامُ اللَّهِ أَبَداً مَا بَقِيتُ وَبَقِيَ اللَّيْلُ وَالنَّهَارُ.
            </p>
            <p className="mb-10">
              يَا أَبَا عَبْدِ اللَّهِ لَقَدْ عَظُمَتِ الرَّزِيَّةُ وَجَلَّتْ وَعَظُمَتِ الْمُصِيبَةُ بِكَ عَلَيْنَا وَعَلَى جَمِيعِ أَهْلِ الْإِسْلَامِ، وَجَلَّتْ وَعَظُمَتْ مُصِيبَتُكَ فِي السَّمَاوَاتِ عَلَى جَمِيعِ أَهْلِ السَّمَاوَاتِ.
            </p>
            <p className="mb-10">
              فَلَعَنَ اللَّهُ أُمَّةً أَسَّسَتْ أَسَاسَ الظُّلْمِ وَالْجَوْرِ عَلَيْكُمْ أَهْلَ الْبَيْتِ، وَلَعَنَ اللَّهُ أُمَّةً دَفَعَتْكُمْ عَنْ مَقَامِكُمْ وَأَزَالَتْكُمْ عَنْ مَرَاتِبِكُمُ الَّتِي رَتَّبَكُمُ اللَّهُ فِيهَا.
            </p>
            <div className="flex justify-center my-12">
              <div className="w-24 h-px bg-emerald-900/50" />
            </div>
            <p className="mb-10 text-emerald-400/80">
              السَّلَامُ عَلَى الْحُسَيْنِ، وَعَلَى عَلِيِّ بْنِ الْحُسَيْنِ، وَعَلَى أَوْلَادِ الْحُسَيْنِ، وَعَلَى أَصْحَابِ الْحُسَيْنِ.
            </p>
          </div>
          
        </div>
      </div>

      {/* Floating Exit Reading Mode Button */}
      <AnimatePresence>
        {readingMode && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <button 
              onClick={() => setReadingMode(false)}
              className="bg-emerald-900/80 hover:bg-emerald-800 text-white px-6 py-3 rounded-full border border-emerald-500/30 backdrop-blur-md shadow-lg flex items-center gap-3 transition-colors"
            >
              <Minimize2 size={18} />
              <span className="font-sans text-sm font-bold">إنهاء وضع القراءة</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
