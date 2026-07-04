import { ChevronRight, Info } from "lucide-react";
import { motion } from "motion/react";

interface AboutHallProps {
  onBack: () => void;
}

export default function AboutHall({ onBack }: AboutHallProps) {
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-[#12141a] text-slate-200 flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-slate-800 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300">
            <ChevronRight size={24} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-slate-500"><Info size={28} /></span>
            <h1 className="text-3xl font-amiri font-bold text-slate-300">حول المنصة</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto relative p-6 md:p-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-10 pointer-events-none" />
        
        <div className="max-w-2xl mx-auto relative z-10 text-center space-y-8">
          
          <h2 className="text-6xl font-amiri font-bold text-slate-100 mb-8 tracking-tight">أثَر</h2>
          <div className="w-16 h-px bg-slate-700 mx-auto mb-8" />

          <p className="text-2xl font-amiri leading-loose text-slate-400 text-justify">
            متحف رقمي تفاعلي يوثق ملحمة كربلاء الخالدة، ويعرض سيرة سيد الشهداء الإمام الحسين بن علي (عليه السلام) وأصحابه البررة.
          </p>
          <p className="text-xl font-amiri leading-loose text-slate-500 text-justify">
            تم استقاء النصوص التاريخية بدقة من كتاب (بحار الأنوار) للعلامة المجلسي، مع تصميم يراعي الجمالية الروحانية وسهولة القراءة، ليكون مرجعاً ميسراً يخلد هذا الأثر العظيم.
          </p>

          <div className="mt-16 pt-8 border-t border-slate-800">
            <p className="text-sm font-sans tracking-widest text-slate-600 uppercase">
              نسألكم الدعاء
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
